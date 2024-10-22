const jobModel = require('../models/jobModels');
const { getRandomPhoto } = require('../services/imageService');


const createJob = async (req, res, next) => {
    const jobId = jobModel.createJob(req.body);

    try {
        const photo = await getRandomPhoto();
        jobModel.updateJobStatus(jobId, 'resolved', photo.urls.full);
        res.json('Job Created Successfully'); 
    } catch (error) {
        jobModel.updateJobStatus(jobId, 'failed', 'Error fetching image');
        next(error); 
    }
};


const getAllJobs = (req, res) => {
    res.json(jobModel.getAllJobs());
};


const getJobById = (req, res) => {
    const jobId = req.params.jobId;
    

    if (!jobModel.getJobById(jobId)) {
        return res.status(404).json({ error: 'Job not found' });
    }
    res.json(jobId);
};

module.exports = { createJob, getAllJobs, getJobById };
