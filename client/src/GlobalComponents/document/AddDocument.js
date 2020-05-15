import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { Link, withRouter } from "react-router-dom";
import { createDocument } from "../../actions/document";
//need to finish input fields...

const AddDocument = ({ createDocument, history }) => {
  const [formData, setFormData] = useState({
    title: "james",
    publishDate: "02/00/00",
    pageCount: 4,
    cover: null,
    description: "sdfgadfasdfasf",
  });
  //const [coVer, setCover] = useState("");
  //const [coVer, setCover] = useState({cover:[]},[]);
  //const { title, publishDate, pageCount, cover, description } = formData;
  const { title, publishDate, pageCount, description, cover } = formData;
  //const { cover } = coVer;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    //setCover(e.target.files[0].name);
  };
  const onSetFile = (e) => {
    console.log(e.target.files[0]);
    setFormData({ ...formData, cover: e.target.files[0] });
  };
  console.log(formData);
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
          const data = new FormData();

          Object.entries(formData).forEach((item) => {
            console.log("item", item);
            data.append(item[0], item[1]);
          });
          createDocument(data);
          //console.log(formData, coVer, "add doc");
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
            value={null}
            //onChange={(e) => onSetFile(e)}
            onChange={onSetFile}
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
