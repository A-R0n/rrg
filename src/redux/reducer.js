import axios from "axios";

const GET_ROUTES = "GET_ROUTES";

const initialState = {
  routes: []
};

export function getRoutesReducer() {
  return {
    type: GET_ROUTES,
    payload: axios.get("/api/routes").then(res => {
      return res.data;
    })
  };
}

export default function reducer(state = initialState, action) {
  // console.log("action: ", action);
  switch (action.type) {
    case GET_ROUTES + "_FULFILLED":
      return { ...state, routes: action.payload };
    default:
      return state;
  }
}