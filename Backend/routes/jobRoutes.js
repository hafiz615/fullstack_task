const express = require('express');
const jobController = require('../controllers/jobController'); // Import job controller
const router = express.Router();

// Define job routes and link them to controller methods
router.post('/', jobController.createJob);
router.get('/', jobController.getAllJobs);
router.get('/:jobId', jobController.getJobById);

module.exports = router;
