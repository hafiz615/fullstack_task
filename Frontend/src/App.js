import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import JobList from './pages/jobs';
import axios from 'axios';
import Home from './pages/home';
import JobDetails from './pages/JobDetails';

const App = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);

    const getJobs = async () => {
      setLoading(true);
      try {
          const response = await axios.get('http://localhost:5000/jobs');
          console.log(response)
          if (response.data) {
            const jobsData = Object.keys(response.data).map(jobId => ({
                jobId,      
                ...response.data[jobId]        
            }));
            setJobs(jobsData);
        } else {
            setJobs([]);
        }
      } catch (error) {
          console.error('Error creating job:', error);
      } finally {
          setLoading(false);
      }
    };

    useEffect(() => {
     getJobs()
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/jobs" element={<JobList jobs={jobs} loading={loading} getJobs={getJobs} />} />
                <Route path="/jobs/:jobID" element={<JobDetails jobs={jobs} />} />
            </Routes>
        </Router>
    );
};

export default App;


