import axios from "axios";


const initialState = {
  userName: '',
  biography: '',
  location: '',
  image_: '',
  route_picture: '',
  user: {}
};


const ADD_IMAGE = 'ADD_IMAGE';
const ROUTE_PIC = 'ROUTE_PIC';

const SET_USER = 'SET_USER';

function reducer(state = initialState, action) {
  
  switch(action.type){
    case `${SET_USER}_FULFILLED`:
			// return Object.assign({}, state, { user: action.payload });
			return { ...state, user: action.payload };
      case ADD_IMAGE:
      return Object.assign( {}, state, {image_: action.payload});
      case ROUTE_PIC:
      return Object.assign({}, state, {route_picture: action.payload});
    default:
      return state;
  }
}
export function setUser() {
	return {
		type: SET_USER,
		payload: axios.get('/api/user').then((response) => {
			return response.data;
		})
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
  console.log('propertiiiiiies for route pic', this)
  return {
    type: ROUTE_PIC,
    payload: axios.put(`/api/routePic/${this.props.elem.id_of_route}`, { imageUrl })
  };
}



export default reducer;