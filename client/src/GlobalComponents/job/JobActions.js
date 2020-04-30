import React from 'react';
import { Link } from 'react-router-dom';

const JobActions = () => {
  return (
    <div className='dash-buttons'>
      <Link to='/add-job' className='btn btn-light'>
        <i className='fab fa-black-tie text-primary' /> Add Job
      </Link>
      <Link to='/delete-job' className='btn btn-light'>
        <i className='fab fa-black-tie text-primary' /> Delete Job
      </Link>
    </div>
  );
};

export default JobActions;