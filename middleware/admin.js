export default async function (req, res, next) {
  if (!req.user.isAdmin) {
    return res.status(403).json({
      ok: false,
      msg: 'Access denied',
    })
  }

  next()
}
