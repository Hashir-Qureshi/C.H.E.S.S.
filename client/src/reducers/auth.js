const user = JSON.parse(localStorage.getItem("user"));
const initialState = user
  ? {
      username: user.username,
      email: user.email,
      isFetching: false,
      error: undefined
    }
  : {
      isFetching: false,
      error: undefined
    };

export default (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return { isFetching: true };
    case "LOGIN_SUCCESS":
      return {
        username: action.username,
        email: action.email,
        isFetching: false
      };
    case "LOGIN_FAILURE":
      return { isFetching: false, error: action.error };
    case "LOGOUT":
      return {};
    default:
      return state;
  }
};
