import axios from "axios";

const initialState = {
  userName: '',
  biography: '',
  location: '',
  image_: '',
  route_picture: ''
};

const UPDATE_USERNAME = "UPDATE_USERNAME";
const UPDATE_PROFILE = "UPDATE_PROFILE";
const UPDATE_BIOGRAPHY = "UPDATE_BIOGRAPHY";
const UPDATE_LOCATION = "UPDATE_LOCATION";
const ADD_IMAGE = 'ADD_IMAGE';
const ROUTE_PIC = 'ROUTE_PIC';

function reducer(state = initialState, action) {
  
  switch(action.type){
    case UPDATE_PROFILE:
      return Object.assign( {}, state );
      case UPDATE_USERNAME:
      return Object.assign({}, state, {userName: action.payload})
      case UPDATE_BIOGRAPHY:
      return Object.assign({}, state, {biography: action.payload})
      case ADD_IMAGE:
      return Object.assign( {}, state, {image_: action.payload});
      case UPDATE_LOCATION:
      return Object.assign({}, state, {location: action.payload});
      case ROUTE_PIC:
      return Object.assign({}, state, {route_picture: action.payload});
    default:
      return state;
  }
}

export function updateUserName(username){
  return {
    type: UPDATE_USERNAME,
    payload: username
  };
}
export function updateBiography(bio){
  return {
    type: UPDATE_BIOGRAPHY,
    payload: bio
  };
}

export function updateLocation(location){
  return {
    type: UPDATE_LOCATION,
    payload: location
  };
}

export function updateProfile(val) {
  return {
    type: UPDATE_PROFILE,
    payload: axios.put("/api/username", {val})
  };
}

export const addImage = imageUrl => {
  console.log('imageUrl reducer', imageUrl)
  return {
    type: ADD_IMAGE,
    payload: axios.put("/api/image", { imageUrl })
  };
}

export const routePic = imageUrl => {
  console.log('route pic', imageUrl)
  return {
    type: ROUTE_PIC,
    payload: axios.put("/api/routePic", { imageUrl })
  };
}



export default reducer;