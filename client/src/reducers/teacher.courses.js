export default (state = [], action) => {
  switch (action.type) {
    case "SET_COURSES":
      return action.courses;
    case "ADD_COURSE":
      return [...state, action.course];
    default:
      return state;
  }
};
