import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Hobbies = ({ hobbies }) => {
  const hobbiess = hobbies.map((hob,index) => (
    <tr key={index}>
        <i className='fas fa-check' /> {hob}
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="my-2">My current Hobbies</h2>
      <table className="table">
        <tbody>{hobbiess}</tbody>
      </table>
    </Fragment>
  );
};

Hobbies.propTypes = {
  hobbies: PropTypes.array.isRequired
};

export default connect(
  null,
  {}
)(Hobbies);
