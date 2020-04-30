import React from "react";
import PropTypes from "prop-types";

const JobTop = ({
  job: {
    _id,
    organization,
    titlej,
    typej,
  },
}) => {
  return (
    <div className="profile-top bg-primary p-2">
      <h1 className="large">
        {organization}
      </h1>
      <h4>Looking For:</h4>
      <h2 className="large">{titlej}</h2>
      <p className="lead">Type of job: {typej}</p>
    </div>
  );
};

JobTop.propTypes = {
  job: PropTypes.object.isRequired,
};

export default JobTop;
