//actions file.js
import axios from "axios";
import { setAlert } from "./alert";

import { DOCUMENT_CREATED, DOCUMENT_ERROR, GET_DOCUMENTS } from "./types";

//Get all Documents
export const getDocuments = () => async (dispatch) => {
  //dispatch({ type: CLEAR_PROFILE });

  try {
    const res = await axios.get("/api/documents");

    dispatch({
      type: GET_DOCUMENTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: DOCUMENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create Document
export const createDocument = (
  formData,
  //coVer,
  //history, //this saves pages like previous page and stuff
  edit = false
) => async (dispatch) => {
  try {
    const config = {
      headers: {
       
        'Content-Type': 'multipart/form-data'
      },
    };
 console.log("formData",formData);
    const res = await axios.post("/api/documents", formData, config);
 console.log('res',res.data);
    dispatch({
      type: DOCUMENT_CREATED,
      payload: res.data,
    });

    dispatch(
      setAlert(edit ? "Document Updated" : "Document Created", "success")
    );

    // if (!edit) {
    //   history.push("/documents"); //push updated to dashboard screen like a redirect
    // }
  } catch (err) {
    const errors = err.response.data.errors;
 console.log('errors',errors);
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: DOCUMENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
