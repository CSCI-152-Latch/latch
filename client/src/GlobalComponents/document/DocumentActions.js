import React from 'react'
import { Link } from 'react-router-dom';

const DocumentActions = () => {
    return (
        <div className='dash-buttons'>
      <Link to='/add-documents' className='btn btn-light'>
        <i className='fas fa-user-circle text-primary' /> Add Document
      </Link>
      <Link to='#!' className='btn btn-light'>
        <i className='fab fa-black-tie text-primary' /> EMPTY
      </Link>
    </div>
    )
}

export default DocumentActions;
