import axios from "axios";
import { setAlert } from "./alert";

import {
  GET_JOB,
  GET_JOBS,
  JOB_ERROR,
  UPDATE_JOB,
  CLEAR_JOB,
  JOB_DELETED,
} from "./types";

// Get all Jobs
export const getJobs = () => async (dispatch) => {
  dispatch({ type: CLEAR_JOB });

  try {
    const res = await axios.get("/api/job");
    console.log(res.data);
    dispatch({
      type: GET_JOBS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err.response.statusText);
    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get job by ID
export const getJobById = (jobId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/job/job/${jobId}`);

    dispatch({
      type: GET_JOB,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create or update profile
export const createJob = (
  formData,
  history, //this saves pages like previous page and stuff
  edit = false
) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("/api/job", formData, config);

    dispatch({
      type: GET_JOB,
      payload: res.data,
    });

    dispatch(setAlert(edit ? "Job Updated" : "Job Created", "success"));

    if (!edit) {
      history.push("/jobs"); //push updated to job screen like a redirect
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete Job by id
// export const deleteJob = id => async dispatch => {
//   try {
//     const res = await axios.delete("/api/job/delete");

//     dispatch({
//       type: JOB_DELETED,
//       payload: res.data
//     });

//     dispatch(setAlert("JOB Removed", "success"));
//   } catch (err) {
//     dispatch({
//       type: JOB_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status }
//     });
//   }
// };

export const deleteJob = (
  formData
  // history, //this saves pages like previous page and stuff
  //edit = false
) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    // xios.delete(URL, {
    //   params: { foo: 'bar' }
    //   })
    console.log(formData, "line 124 form data");
    //const res = await axios.delete("/api/job/delete", {params:{idj:formData.idj}}, config);
    const res = await axios.delete("/api/job/delete", {
      data: { idj: formData.idj },
    });
    dispatch({
      type: JOB_DELETED,
      payload: res.data,
    });

    dispatch(setAlert("Job Deleted", "success"));

    //history.push("/jobs"); //push updated to job screen like a redirect
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//apply to a job
export const applyJobById = (jobId, userID) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/job/job/apply/${jobId}/${userID}`);

    dispatch({
      type: UPDATE_JOB,
      payload: res.data,
    });
    dispatch(setAlert("Job Applied to", "success"));
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
