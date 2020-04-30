import React, { useEffect, useState, Fragment } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createJob } from "../../actions/job";

const AddJob = ({ createJob, job: { job, loading }, history }) => {
  const [formData, setFormData] = useState({
    organization: "",
    titlej: "",
    description: "",
    typej: "",
    qualifications: "",
    endDate: "",
  });
  const {
    organization,
    titlej,
    description,
    typej,
    qualifications,
    endDate,
  } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    createJob(formData, history);
  };
  //   useEffect(() => {
  //     getCurrentProfile();
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [getCurrentProfile]);
  return loading && job === null ? (
    <Redirect to="/jobs" />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Create Your Job</h1>
      <p className="lead">
        <i className="fas fa-user" /> Let's get some information about your job
        posting
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <select name="typej" value={typej} onChange={(e) => onChange(e)}>
            <option value="0">* Select Type of Job</option>
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Internship">Internship</option>
            <option value="Seasonal">Seasonal</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">
            What type of job is this
          </small>
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="* Organization"
            name="organization"
            value={organization}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            What copany/ organization are you making this request from
          </small>
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="* Qualifications"
            name="qualifications"
            value={qualifications}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Title of position"
            name="titlej"
            value={titlej}
            onChange={(e) => onChange(e)}
          />
        </div>

        <div className="form-group">
          <textarea
            placeholder="A detailed description of the postion"
            name="description"
            value={description}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            A detailed description of the postion
          </small>
        </div>
        <div className="form-group">
          <h4>End Date To Apply</h4>
          <input
            type="date"
            name="endDate"
            value={endDate}
            onChange={(e) => onChange(e)}
          />
        </div>

        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/jobs">
          Go Back To Jobs
        </Link>
      </form>
    </Fragment>
  );
};

AddJob.propTypes = {
  createProfile: PropTypes.func.isRequired,
  job: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  job: state.job,
});
export default connect(mapStateToProps, { createJob })(
  withRouter(AddJob)
);
