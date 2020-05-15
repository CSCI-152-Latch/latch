import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Moment from 'react-moment';//allows for dates
import moment from 'moment';
const JobItems = ({
  job: {
 
    _id,
    organization,
    titlej,
    description,
    typej,
    qualifications,
    endDate,
  },
}) => {
  return (
    <div className="profile bg-light">
      <div>
        <h2>
          By: {organization} 
        </h2>
        <p>
          {titlej}:{' '}{typej}<br/> apply by <Moment format="YYYY/MM/DD">{moment.utc(endDate)}</Moment>
        </p>

        <Link to={`/job/${_id}`} className="btn btn-primary">
          View Our Job
        </Link>
      </div>
      <ul>
        {qualifications.slice(0, 4).map((qualification, index) => (
          <li key={index} className="text-primary">
            <i className="fas fa-check" /> {qualification}
          </li>
        ))}
      </ul>
      <p>{description}</p>
    </div>
  );
};

JobItems.propTypes = {
  job: PropTypes.object.isRequired,
};

export default JobItems;
