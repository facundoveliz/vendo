import express from 'express'
import dotenv from 'dotenv'
import S3 from 'aws-sdk/clients/s3'
import fs from 'fs'
import { Product, schema } from '../models/product'

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
  const product = await Product.find()
  if (product) {
    return res.status(200).json({
      ok: true,
      msg: 'Product founded',
      result: product,
    })
  }
  return res.status(404).json({
    ok: false,
    msg: 'No product founded',
  })
}

export const postProduct = async (req, res) => {
  // checks for validation errors
  schema
    .validate(req.body)
    .then(async () => {
      let product

      // decides how the product should be
      // if it has an image or not
      if (!req.file) {
        product = new Product({
          name: req.body.name,
          price: req.body.price,
          description: req.body.description,
        })
      } else {
        const result = await uploadFile(req.file)
        product = new Product({
          name: req.body.name,
          price: req.body.price,
          imageUrl: result.Location,
          imageKey: result.Key,
          description: req.body.description,
        })
      }

      await product
        .save()
        .then(() => res
          .status(200)
          .json({ ok: true, msg: 'Product created', result: product }))
    })
    .catch((err) => res.status(400).json({
      ok: false,
      msg: 'Validation error',
      result: err,
    }))
}

export const putProduct = async (req, res) => {
  // checks for validation errors
  schema
    .validate(req.body)
    .then(async () => {
      let product

      // decides how the product should be
      // if it has an image or not
      if (!req.file) {
        // if a file is not uploaded, it only updates all except the image
        product = await Product.findByIdAndUpdate(req.params.id, {
          name: req.body.name,
          price: req.body.price,
          description: req.body.description,
        })
      } else {
        // gets the product to get the imageKey so it can delete it
        const image = await Product.findById(req.params.id)
        // deletes the image if it exists
        if (image.imageKey) {
          deleteFile(image.imageKey)
        }

        const result = await uploadFile(req.file)
        product = await Product.findByIdAndUpdate(req.params.id, {
          name: req.body.name,
          price: req.body.price,
          imageUrl: result.Location,
          imageKey: result.Key,
          description: req.body.description,
        })
      }
      return res
        .status(200)
        .json({ ok: true, msg: 'Product updated', result: product })
    })
    .catch((err) => res.status(400).json({
      ok: false,
      msg: 'Validation error',
      result: err,
    }))
}

export const deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndDelete({
    _id: req.params.id,
  })
  if (!product) {
    res.status(404).json({
      ok: false,
      msg: 'Product not found',
    })
  }
  if (product.imageKey) {
    deleteFile(product.imageKey)
  }
  return res.status(200).json({
    ok: true,
    msg: 'Product deleted',
  })
}

export default router
