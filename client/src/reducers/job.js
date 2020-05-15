import {
  GET_JOB,
  JOB_ERROR,
  CLEAR_JOB,
  UPDATE_JOB,
  GET_JOBS,
  JOB_DELETED,
} from "../actions/types";

const initialState = {
  job: null,
  jobs: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_JOB:
    case UPDATE_JOB:
      return {
        ...state,
        job: payload,
        loading: false,
      };
    case GET_JOBS:
      return {
        ...state,
        jobs: payload,
        loading: false,
      };
    case JOB_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        job: null,
      };
    case CLEAR_JOB:
    case JOB_DELETED:
      return {
        ...state,
        job: null,
        loading: false,
      };
    default:
      return state;
  }
}
