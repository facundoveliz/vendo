import express from 'express'
import dotenv from 'dotenv'
import S3 from 'aws-sdk/clients/s3'
import fs from 'fs'
import { Product, schema } from '../models/product'

// NOTE: for some weird reason i have to call dotenv
// here because env vars are not recognized without this
dotenv.config()

const router = express.Router()

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

export const getProducts = async (req, res) => {
  const product = await Product.find({})
  if (product) {
    res.json(product)
  } else {
    res.status(404).json({ error: 'Product not found' })
  }
}

export const postProduct = async (req, res) => {
  schema.validate(req.body).then(async () => {
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
}

export const putProduct = async (req, res) => {
  schema.validate(req.body).then(async () => {
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
  })
}

export const deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id)
  if (!product) {
    return res.status(404).json({ error: 'Product not found.' })
  }
  const image = await deleteFile(product.imageKey)
  if (!image) return res.status(404).json({ error: 'Image not found.' })

  return res.status(200).json({ message: 'Done!' })
}

export default router
