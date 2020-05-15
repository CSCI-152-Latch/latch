import React from 'react';
import PropTypes from 'prop-types';

const ProfileTop = ({
  profile: {
    status,
    social,
    _id: { firstName,lastName, avatar, nickName }
  }
}) => {
  return (
    <div className='profile-top bg-primary p-2'>
      <img className='round-img my-1' src={avatar} alt='' />
  <h1 className='large'>{firstName}{' '}{lastName}</h1>
  <h4>aka</h4>
  <h1 className = 'large'>{nickName}</h1>
      <p className='lead'>
        {status}
      </p>
      <p></p>
      <div className='icons my-1'>
        {social && social.twitter && (
          <a href={social.twitter} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-twitter fa-2x' />
          </a>
        )}
        {social && social.facebook && (
          <a href={social.facebook} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-facebook fa-2x' />
          </a>
        )}
        {social && social.linkedin && (
          <a href={social.linkedin} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-linkedin fa-2x' />
          </a>
        )}
        
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileTop;
