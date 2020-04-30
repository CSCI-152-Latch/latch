import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment"; //allows for dates
import moment from "moment";
const JobMiddle = ({ job: { description, qualifications, endDate } }) => (
  <div className="profile-about bg-light p-2">
    <h2>
      Postion will be open until{" "}
      <Moment format="YYYY/MM/DD">{moment.utc(endDate)}</Moment>
    </h2>
    {/* {description && (
      <Fragment>
        <h2 className="text-primary">Description of Job</h2>
        <p>{description}</p>
        <div className="line" />
      </Fragment>
    )} */}
    {/* <h2 className="text-primary">Qualifications for position</h2>
    <div className="skills">
      {qualifications.map((qualification, index) => (
        <div key={index} className="p-1">
          <i className="fas fa-check" /> {qualification}
        </div>
      ))}
    </div> */}
  </div>
);

JobMiddle.propTypes = {
  job: PropTypes.object.isRequired,
};

export default JobMiddle;
