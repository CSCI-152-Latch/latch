import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import JobTop from "./J-Top";
import JobMiddle from "./J-Middle";

import { getJobById,applyJobById } from "../../actions/job";

const Job = ({
  getJobById,
  applyJobById,
  job: { job, loading },
   auth,
  match, //this is used to access variables in the url
}) => {
  useEffect(() => {
    getJobById(match.params.id);
  }, [getJobById, match.params.id]);

  return (
    <Fragment>
      {job === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/jobs" className="btn btn-light">
            Back To Jobs
          </Link>
          
            <button
          onClick={() => applyJobById(job._id,auth.user._id)}
          className="btn btn-success"
        >
          Apply Now
    
        </button>
        
        
          <div className="profile-grid my-1">
            <JobTop job={job} />
            <JobMiddle job={job} />
            <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">Descriptions/Qualifications:</h2>
              <div className="skills">
      {job.qualifications.map((qualification, index) => (
        <div key={index} className="p-1">
          <i className="fas fa-check" /> {qualification}
        </div>
      ))}
    </div> 
            </div>

            <div className="profile-edu bg-white p-2">
              <h2 className="text-primary">Description:</h2>
              <p>{job.description}</p>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Job.propTypes = {
  getJobById: PropTypes.func.isRequired,
  applyJobById:PropTypes.func.isRequired,
  job: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  job: state.job,
  auth: state.auth,
});

export default connect(mapStateToProps, { getJobById,applyJobById })(Job);
