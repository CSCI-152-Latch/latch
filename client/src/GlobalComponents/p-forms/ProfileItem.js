import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileItem = ({
  profile: {
    _id: { _id, firstName, lastName, avatar, email, nickName },
    status,
    fields,
    hobbies
  }
}) => {
  return (
    <div className='profile bg-light'>
      <img src={avatar} alt='' className='round-img' />
      <div>
  <h2>{firstName} {' '} {lastName} aka {' '} {nickName}</h2>
        <p>
          {status} {' '} {email}
        </p>
        
        <Link to={`/profile/${_id}`} className='btn btn-primary'>
          View My Profile
        </Link>
      </div>
      <ul>
        {fields.slice(0, 4).map((field, index) => (
          <li key={index} className='text-primary'>
            <i className='fas fa-check' /> {field}
          </li>
        ))}
      </ul>
      <ul>
        {hobbies.slice(0, 4).map((hobby, index) => (
          <li key={index} className='text-primary'>
            <i className='fas fa-check' /> {hobby}
          </li>
        ))}
      </ul>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
