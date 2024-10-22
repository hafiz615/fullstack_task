import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../components/Card';
import CreateJobModal from '../components/CreateModal';
import Loader from '../components/Loader'; 
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

const JobList = ({ jobs, loading, getJobs }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');  
    const [creatingJob, setCreatingJob] = useState(false); 
    const navigate = useNavigate();

    const handleViewJob = async (jobId) => {
        try {
            const response = await axios.get(`http://localhost:5000/jobs/${jobId}`);
            navigate(`/jobs/${response.data}`);
        } catch (error) {
            console.error('Error fetching job details:', error);
        }
    };

    const handleCreateJob = async (formData) => {
        const jobExists = jobs.some(job => job.name.toLowerCase() === formData.name.toLowerCase());
        if (jobExists) {
            setErrorMessage('Job name already exists. Please choose a different name.');
            return;
        }

        setCreatingJob(true);
        setErrorMessage(''); 

        try {
            const jobData = {
                name: formData.name,
                salary: formData.salary,
                status: 'pending',
                result: null,
            };
            const response = await axios.post('http://localhost:5000/jobs', jobData);
            toast.success(response.data, {
                position: "top-right", 
                autoClose: 3000, 
            });

            getJobs(); 
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error creating job:', error);
            setErrorMessage('Error creating job. Please try again.');
            
            toast.error('Error creating job. Please try again.', {
                position: "top-right", 
                autoClose: 3000,
            });
        } finally {
            setCreatingJob(false);
        }
    };

    return (
        <div>
            <h1>Job List</h1>

            {errorMessage && (
                <div className="alert alert-danger">
                    {errorMessage}
                </div>
            )}

            <button className="btn btn-primary" onClick={() => setIsModalOpen(true)} disabled={loading}>
                {loading ? <Loader /> : 'Create New Job'}
            </button>

            <div style={{ margin: '20px 0' }}></div>

            <div 
                style={{ 
                    display: 'flex', 
                    flexWrap: 'wrap',  
                    gap: '20px'
                }}
            >
                {loading ? (
                    <Loader /> 
                ) : (
                    jobs.map((item) => (
                        <div 
                            key={item.jobId} 
                            style={{ 
                                flex: '1 1 calc(33.33% - 20px)',  
                                boxSizing: 'border-box' 
                            }}
                        >
                            <CardComponent 
                                imageUrl={item.result} 
                                title={item.name} 
                                salary={item.salary} 
                                handleViewJob={() => handleViewJob(item.jobId)} 
                            />
                        </div>
                    ))
                )}
            </div>

            <CreateJobModal 
                isOpen={isModalOpen} 
                setIsModalOpen={setIsModalOpen} 
                handleCreateJob={handleCreateJob} 
                loading={creatingJob}
                errorMessage={errorMessage}
            />

            <ToastContainer />
        </div>
    );
};

export default JobList;
