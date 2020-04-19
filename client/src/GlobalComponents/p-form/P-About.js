import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({
  profile: {
    bio,
    fields,
    hobbies,
    _id: { firstName,lastName }
  }
}) => (
  <div className='profile-about bg-light p-2'>
    {bio && (
      <Fragment>
        <h2 className='text-primary'>{firstName} {' '} {lastName}'s Bio</h2>
        <p>{bio}</p>
        <div className='line' />
      </Fragment>
    )}
    <h2 className='text-primary'>Fields of Study</h2>
    <div className='skills'>
      {fields.map((field, index) => (
        <div key={index} className='p-1'>
          <i className='fas fa-check' /> {field}
        </div>
      ))}
    </div>
    <h2 className='text-primary'>My Hobbies</h2>
    <div className='skills'>
      {hobbies.map((hobby, index) => (
        <div key={index} className='p-1'>
          <i className='fas fa-check' /> {hobby}
        </div>
      ))}
    </div>
  </div>
);

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
