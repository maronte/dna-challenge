const errorHandling = (err, req, res, next) => {
  console.log(err)
  res.status(500).json({
    msg: err.message,
    success: false
  })
}

module.exports = {
  errorHandling
}
