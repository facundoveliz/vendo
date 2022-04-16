const express = require('express')

const router = express.Router()
const multer = require('multer')
const S3 = require('aws-sdk/clients/s3')
const fs = require('fs')
const { Product, validate } = require('../models/product')

const auth = require('../middleware/auth')
const admin = require('../middleware/admin')

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

const s3 = new S3({ region, accessKeyId, secretAccessKey })

// uploads a file to s3
function uploadFile(file) {
  const fileStream = fs.createReadStream(file.path)

  const params = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
  }

  return s3.upload(params).promise()
}

// deletes a file from s3
function deleteFile(key) {
  const params = {
    Bucket: bucketName,
    Key: key,
  }
  s3.deleteObject(params).promise()
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'client/public/uploads/products')
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`)
  },
})

const upload = multer({ storage })

router.get('/', async (req, res) => {
  try {
    const product = await Product.find({})
    if (product) {
      res.json(product)
    } else {
      res.status(404).json({ error: 'Product not found' })
    }
  } catch (err) {
    console.log(err)
  }
})

router.post('/add', upload.single('image'), auth, admin, async (req, res) => {
  // checks for validation errs with joi
  const { err } = validate(req.body)
  if (err) return res.status(400).json(err)

  const { file } = req
  // creates the new product
  if (!file) {
    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
    })

    await product
      .save()
      .catch(() => res.status(400).json({ error: 'The product could not be saved' }))
  } else {
    const result = await uploadFile(req.file)
    if (!result) return res.status(404).json({ error: 'Image not found.' })

    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      imageUrl: result.Location,
      imageKey: result.key,
      description: req.body.description,
    })

    await product
      .save()
      .then(() => res.status(200).json({ message: 'Done!' }))
      .catch(() => res.status(400).json({ error: 'The product could not be saved' }))
  }
})

router.put(
  '/edit/:id',
  upload.single('image'),
  auth,
  admin,
  async (req, res) => {
    // checks for validation errors with joi
    const { err } = validate(req.body)
    if (err) return res.status(400).json(err.details[0].message)

    const { file } = req
    if (!file) {
      // if a file is not uploaded, it only updates all except the image
      const product = await Product.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
      })

      if (!product) {
        return res.status(404).json({ error: 'Product not found' })
      }
      return res.status(200).json({ message: 'Done!' })
    }
    // gets the product to get the imageKey so it can delete it
    const image = await Product.findById(req.params.id)
    // deletes the image if it exists
    if (image.key) {
      await deleteFile(image.imageKey)
    }
    if (!image) return res.status(404).json({ error: 'Image not found.' })

    const result = await uploadFile(req.file)
    const product = await Product.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      price: req.body.price,
      imageUrl: result.Location,
      imageKey: result.key,
      description: req.body.description,
    })
    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }
    return res.status(200).json({ message: 'Done!' })
  },
)

router.delete('/delete/:id', auth, admin, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) {
      return res.status(404).json({ error: 'Product not found.' })
    }
    const image = await deleteFile(product.imageKey)
    if (!image) return res.status(404).json({ error: 'Image not found.' })

    return res.status(200).json({ message: 'Done!' })
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
