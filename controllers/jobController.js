const jobModel = require("../models/jobModel");

// GET /jobs
function getAllJobs(req, res, next) {
  try {
    const jobs = jobModel.getAllJobs(req.query.tipe);

    res.status(200).json(jobs);
  } catch (error) {
    next(error);
  }
}

// GET /jobs/:id
function getJobById(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const job = jobModel.getJobById(id);

    if (!job) {
      const error = new Error(`Lowongan kerja dengan id ${id} tidak ditemukan`);
      error.status = 404;
      return next(error);
    }

    res.status(200).json(job);
  } catch (error) {
    next(error);
  }
}

// POST /jobs
function createJob(req, res, next) {
  try {
    const {
      posisi,
      perusahaan,
      lokasi,
      tipe,
      gajiMin,
      gajiMax
    } = req.body;

    if (!posisi || !perusahaan || !lokasi || !tipe) {
      const error = new Error(
        "Field posisi, perusahaan, lokasi, dan tipe wajib diisi"
      );
      error.status = 400;
      return next(error);
    }

    if (!["full-time", "part-time", "magang"].includes(tipe)) {
      const error = new Error(
        "Tipe harus berupa full-time, part-time, atau magang"
      );
      error.status = 400;
      return next(error);
    }

    const newJob = jobModel.createJob({
      posisi,
      perusahaan,
      lokasi,
      tipe,
      gajiMin,
      gajiMax
    });

    res.status(201).json({
      status: "success",
      message: "Data lowongan kerja berhasil ditambahkan",
      data: newJob
    });
  } catch (error) {
    next(error);
  }
}

// PUT /jobs/:id
function updateJob(req, res, next) {
  try {
    const id = parseInt(req.params.id);

    const existingJob = jobModel.getJobById(id);

    if (!existingJob) {
      const error = new Error(`Lowongan kerja dengan id ${id} tidak ditemukan`);
      error.status = 404;
      return next(error);
    }

    const {
      posisi,
      perusahaan,
      lokasi,
      tipe,
      gajiMin,
      gajiMax
    } = req.body;

    if (!posisi || !perusahaan || !lokasi || !tipe) {
      const error = new Error(
        "Field posisi, perusahaan, lokasi, dan tipe wajib diisi"
      );
      error.status = 400;
      return next(error);
    }

    if (!["full-time", "part-time", "magang"].includes(tipe)) {
      const error = new Error(
        "Tipe harus berupa full-time, part-time, atau magang"
      );
      error.status = 400;
      return next(error);
    }

    const updatedJob = jobModel.updateJob(id, {
      posisi,
      perusahaan,
      lokasi,
      tipe,
      gajiMin,
      gajiMax
    });

    res.status(200).json({
      status: "success",
      message: `Data lowongan kerja dengan id ${id} berhasil diperbarui`,
      data: updatedJob
    });
  } catch (error) {
    next(error);
  }
}

// DELETE /jobs/:id
function deleteJob(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const deleted = jobModel.deleteJob(id);

    if (!deleted) {
      const error = new Error(`Lowongan kerja dengan id ${id} tidak ditemukan`);
      error.status = 404;
      return next(error);
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob
};