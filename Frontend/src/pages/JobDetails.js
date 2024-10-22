import React from 'react';
import { useParams } from 'react-router-dom';

const JobDetails = ({ jobs }) => {
  const { jobID } = useParams();
  const selectedJob = jobs.find((job) => job.jobId === jobID);

  if (!selectedJob) {
    return <div>Job not found!</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <img
              src={selectedJob.result}
              className="card-img-top d-block mx-auto mt-3"
              alt="Job Result"
              style={{ width: '300px', height: 'auto' }} 
            />
            <div className="card-body">
              <h2 className="card-title text-center">Job Details</h2>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <strong>Job Title:</strong> {selectedJob.name}
                </li>
                <li className="list-group-item">
                  <strong>Salary:</strong> {selectedJob.salary}
                </li>
                <li className="list-group-item">
                  <strong>Status:</strong> {selectedJob.status}
                </li>
              </ul>
            </div>
            <div className="card-footer text-center">
              <button
                className="btn btn-secondary"
                onClick={() => window.history.back()}
              >
                Back to Job List
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
