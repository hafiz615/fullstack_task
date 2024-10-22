import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h1>Welcome to the Job Management App</h1>
            <Link to="/jobs">
                <button>Go to Job List</button>
            </Link>
        </div>
    );
};

export default Home;
