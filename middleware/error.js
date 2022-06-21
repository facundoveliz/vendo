// next parameter needed
// eslint-disable-next-line no-unused-vars
export const notFound = (req, res, next) => {
  res.status(404).json({
    ok: false,
    msg: 'Not found',
  })
}

// next parameter needed
// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500).json({
    ok: false,
    msg: err.message,
  })
}

export const catchErrors = (func) => (req, res, next) => {
  Promise.resolve(func(req, res)).catch(next)
}
