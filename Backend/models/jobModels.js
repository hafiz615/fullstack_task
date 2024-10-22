const { v4: uuidv4 } = require('uuid');

let jobs = {};

// Create a new job and return its ID
const createJob = (jobData) => {
    const jobId = uuidv4();
    jobs[jobId] = { 
        name: jobData.name, 
        salary: jobData.salary, 
        status: 'pending', 
        result: null 
    };
    return jobId;
};

// Update the status of a job
const updateJobStatus = (jobId, status, result) => {
    if (jobs[jobId]) {
        jobs[jobId].status = status;
        jobs[jobId].result = result;
    }
};

// Get all jobs
const getAllJobs = () => {
    return jobs;
};

// Get job by ID
const getJobById = (jobId) => {
    return jobs[jobId];
};

module.exports = { createJob, updateJobStatus, getAllJobs, getJobById };
