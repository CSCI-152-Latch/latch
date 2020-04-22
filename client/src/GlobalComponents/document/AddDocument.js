import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { Link, withRouter } from "react-router-dom";
import { createDocument } from "../../actions/document";
//need to finish input fields...

const AddDocument = ({ createDocument, history }) => {
  const [formData, setFormData] = useState({
    title: "",
    publishDate: "",
    pageCount: "",
    cover: "",
    description: "",
  });
 const [coVer,setCover] = useState('');
  const { title, publishDate, pageCount, cover, description } = formData;
  //const { title, publishDate, pageCount, description } = formData;
  //const { cover } = coVer;
  const onChange = (e) => {

    setFormData({ ...formData, [e.target.name]: e.target.value });
    //setCover(e.target.files[0].name);
  };
  const onSetFile = (e) => {
    setCover( e.target.files[0]);
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Add Document</h1>
      <p className="lead">
        <i className="fas fa-code-branch" /> Add any document, mainly images :P
      </p>
      <small>* = required field</small>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          createDocument(formData, coVer, history);
          console.log(formData, coVer, "add doc");
        }}
      >
        <div className="form-group">
          <select
            name="description"
            value={description}
            onChange={(e) => onChange(e)}
            required
          >
            <option value="0">* What Kind of file is this?</option>
            <option value="Resume">Resume</option>
            <option value="Random File">Random File</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">
            Kind does not mean type 'jpg,pdf...'
          </small>
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Title"
            name="title"
            value={title}
            onChange={(e) => onChange(e)}
            required
          />
          <small className="form-text">Title for this document</small>
        </div>

        <div className="form-group">
          <input
            type="number"
            placeholder="pageCount"
            name="pageCount"
            value={pageCount}
            onChange={(e) => onChange(e)}
            required
          />
          <small className="form-text">pageCount of files</small>
        </div>

        <div className="form-group">
          <h4>From Date</h4>
          <input
            type="date"
            name="publishDate"
            value={publishDate}
            onChange={(e) => onChange(e)}
          />
        </div>

        <div>
          <label>Cover</label>
          <input
            type="file"
            name="cover"
            //className="filepond"
            value={cover}
            onChange={(e) => onSetFile(e)}
            height="150"
            width="100"
          />
        </div>

        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/documents">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

AddDocument.propTypes = {
  createDocument: PropTypes.func.isRequired,
};

export default connect(null, { createDocument })(withRouter(AddDocument));
