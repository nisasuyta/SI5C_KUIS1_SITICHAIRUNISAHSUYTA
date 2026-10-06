const express = require("express");

const router = express.Router();

const jobController = require("../controllers/jobController");
const cekApiKey = require("../middleware/cekApiKey");

// GET semua jobs + filter
router.get("/", jobController.getAllJobs);

// GET satu job
router.get("/:id", jobController.getJobById);

// POST dilindungi API Key
router.post("/", cekApiKey, jobController.createJob);

// PUT dilindungi API Key
router.put("/:id", cekApiKey, jobController.updateJob);

// DELETE dilindungi API Key
router.delete("/:id", cekApiKey, jobController.deleteJob);

module.exports = router;