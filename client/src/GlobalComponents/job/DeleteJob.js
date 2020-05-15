import React, { useEffect, useState, Fragment } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteJob } from "../../actions/job";

const DeleteJob = ({ deleteJob,job: { job, loading }}) => {
  const [formData, setFormData] = useState({
    idj: "",
  });
  const {
  idj
  } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    deleteJob(formData);
    console.log(formData);
  };
  //   useEffect(() => {
  //     getCurrentProfile();
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [getCurrentProfile]);
  // return loading && job === null ? (
  //   <Redirect to="/jobs" />
  // ) : 
  return(
    <Fragment>
      <h1 className="large text-primary">Delete Your Job</h1>
      <p className="lead">
        <i className="fas fa-user" /> Let's Remove this job
      </p>
      <p>Lets first start by adding the job id into the input field</p>
      <small>* = required field</small>
      <form className="form" onSubmit={(e) => onSubmit(e)}>

        <div className="form-group">
          <input
            type="text"
            placeholder="* Job ID"
            name="idj"
            value={idj}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            What copany/ organization are you making this request from
          </small>
        </div>

        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/jobs">
          Go Back To Jobs
        </Link>
      </form>
    </Fragment>
  );
};

DeleteJob.propTypes = {
  deleteJob: PropTypes.func.isRequired,
  job: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  job: state.job,
});
export default connect(mapStateToProps,{ deleteJob })(
  withRouter(DeleteJob)
);