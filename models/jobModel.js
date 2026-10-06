let jobs = [
  {
    id: 1,
    posisi: "Backend Developer Intern",
    perusahaan: "PT Kode Maju",
    lokasi: "Jakarta",
    tipe: "magang",
    gajiMin: 2000000,
    gajiMax: 3000000
  },
  {
    id: 2,
    posisi: "Frontend Developer",
    perusahaan: "PT Digital Nusantara",
    lokasi: "Palembang",
    tipe: "full-time",
    gajiMin: 5000000,
    gajiMax: 8000000
  },
  {
    id: 3,
    posisi: "UI/UX Designer",
    perusahaan: "CV Kreatif Indonesia",
    lokasi: "Bandung",
    tipe: "part-time",
    gajiMin: 2500000,
    gajiMax: 4000000
  }
];

let nextId = 4;

// Mengambil semua data lowongan
function getAllJobs(tipe) {
  if (tipe) {
    return jobs.filter(job => job.tipe === tipe);
  }

  return jobs;
}

// Mengambil satu data berdasarkan ID
function getJobById(id) {
  return jobs.find(job => job.id === id);
}

// Menambahkan data lowongan
function createJob(data) {
  const newJob = {
    id: nextId++,
    posisi: data.posisi,
    perusahaan: data.perusahaan,
    lokasi: data.lokasi,
    tipe: data.tipe,
    gajiMin: data.gajiMin,
    gajiMax: data.gajiMax
  };

  jobs.push(newJob);

  return newJob;
}

// Mengubah data lowongan
function updateJob(id, data) {
  const index = jobs.findIndex(job => job.id === id);

  if (index === -1) {
    return null;
  }

  const updatedJob = {
    id: id,
    posisi: data.posisi,
    perusahaan: data.perusahaan,
    lokasi: data.lokasi,
    tipe: data.tipe,
    gajiMin: data.gajiMin,
    gajiMax: data.gajiMax
  };

  jobs[index] = updatedJob;

  return updatedJob;
}

// Menghapus data lowongan
function deleteJob(id) {
  const index = jobs.findIndex(job => job.id === id);

  if (index === -1) {
    return false;
  }

  jobs.splice(index, 1);

  return true;
}

module.exports = {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob
};