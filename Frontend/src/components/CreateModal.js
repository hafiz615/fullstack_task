import React, { useState } from 'react';
import Modal from 'react-modal';
Modal.setAppElement('#root'); 

const CreateJobModal = ({ isOpen, setIsModalOpen, handleCreateJob, loading , errorMessage}) => {
    const [formData, setFormData] = useState({ name: '', salary: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleCreateJob(formData); 
    };

    return (
        <Modal 
            isOpen={isOpen} 
            onRequestClose={() => setIsModalOpen(false)} 
            contentLabel="Create Job Modal"
        >
            <h2>Create New Job</h2>

            {errorMessage && (
                <div className="alert alert-danger" role="alert">
                    {errorMessage}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Job Name</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        className="form-control"
                        value={formData.name} 
                        onChange={handleInputChange} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="salary" className="form-label">Salary</label>
                    <input 
                        type="number" 
                        id="salary" 
                        name="salary" 
                        className="form-control"
                        value={formData.salary} 
                        onChange={handleInputChange} 
                        required 
                    />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Creating Job...' : 'Create Job'}
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
                    Cancel
                </button>
            </form>
        </Modal>
    );
};

export default CreateJobModal;
