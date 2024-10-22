import React from 'react';

const CardComponent = ({ imageUrl, title, salary, handleViewJob }) => {
  const imageContainerStyle = {
    width: '100%',
    height: '200px', 
    backgroundColor: '#f0f0f0', 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  };

  return (
    <div className="card" style={{ width: '350px' }}>
      <div style={imageContainerStyle}>
        {imageUrl ? (
          <img
            src={imageUrl}
            className="card-img-top"
            alt={title}
            style={{ objectFit: 'cover', height: '100%' }}
          />
        ) : (
          <span>No Image Available</span>
        )}
      </div>

      <div className="card-body">
        <h5 className="card-title">Title of Job: {title}</h5>
        <p className="card-text">Salary: ${salary}</p>
        <button className="btn btn-primary" onClick={handleViewJob}>
          Job Details
        </button>
      </div>
    </div>
  );
};

export default CardComponent;


