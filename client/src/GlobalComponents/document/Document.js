import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
//import DocumentItem from "./DocumentItem";
import DocumentActions from "./DocumentActions";
import { getDocuments } from "../../actions/document";

const Document = (props) => {
  return (
    <Fragment>
      <h1 className="large text-primary">Documents</h1>
      <DocumentActions />
    </Fragment>
  );
};

Document.propTypes = {};

export default Document;
