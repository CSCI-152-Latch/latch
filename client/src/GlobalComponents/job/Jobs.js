import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";

import JobActions from "../job/JobActions";
import JobItems from '../job/JobItems';
import {getJobs} from '../../actions/job';

const Jobs = ({ getJobs, job: { jobs, loading } }) => {

    useEffect(() => {
        getJobs();
      }, [getJobs]);

    return (
        <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment> 
          <h1 className="large text-primary">Jobs</h1>
          <JobActions />
          <p className="lead">
            <i className="fab fa-connectdevelop" /> Browse and see jobs
          </p>
          <div className="profiles">
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <JobItems key={job._id} job={job} />
              ))
            ) : (
              <h4>No Jobs found...</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
    )
}

Jobs.propTypes = {
    getJobs: PropTypes.func.isRequired,
    job: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    job: state.job,
  });

export default connect(mapStateToProps,{getJobs})(Jobs)
