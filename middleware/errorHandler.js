// Menangani route yang tidak ditemukan
function notFound(req, res, next) {
  const error = new Error("Endpoint tidak ditemukan");
  error.status = 404;

  next(error);
}

// Menangani semua error secara terpusat
function errorHandler(error, req, res, next) {
  // JSON rusak
  if (
    error instanceof SyntaxError &&
    error.status === 400 &&
    error.type === "entity.parse.failed"
  ) {
    return res.status(400).json({
      status: "error",
      message: "Format JSON tidak valid",
      data: null
    });
  }

  const statusCode = error.status || 500;

  res.status(statusCode).json({
    status: "error",
    message: error.message || "Terjadi kesalahan pada server",
    data: null
  });
}

module.exports = {
  notFound,
  errorHandler
};