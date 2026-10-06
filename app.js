require("dotenv").config();

const express = require("express");
const cors = require("cors");

const jobRoutes = require("./routes/jobRoutes");
const logger = require("./middleware/logger");
const {
  notFound,
  errorHandler
} = require("./middleware/errorHandler");

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(logger);
app.use(express.json());

// Informasi API
app.get("/", (req, res) => {
  res.status(200).json({
    nama: "Siti Chairunisah Suyta",
    nim: "2428240150",
    topik: 28,
    namaTopik: "Portal Karier: Lowongan Kerja",
    endpoints: [
      "GET /jobs",
      "GET /jobs/:id",
      "GET /jobs?tipe=magang",
      "POST /jobs",
      "PUT /jobs/:id",
      "DELETE /jobs/:id"
    ]
  });
});

// Routes
app.use("/jobs", jobRoutes);

// Error 404
app.use(notFound);

// Error handler terpusat
app.use(errorHandler);

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});

module.exports = app;