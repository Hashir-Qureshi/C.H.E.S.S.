const initialState = {
  courseList: [],
  isFetching: false,
  error: undefined
};
export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_COURSES_REQUEST":
      return { ...state, isFetching: true };
    case "SET_COURSES_SUCCESS":
      return { courseList: action.courses, isFetching: false };
    case "SET_COURSES_FAILURE":
      return { ...state, isFetching: false, error: action.error };
    case "ADD_COURSE_REQUEST":
      return { ...state, isFetching: true };
    case "ADD_COURSE_SUCCESS":
      return {
        courseList: [...state.courseList, action.course],
        isFetching: false
      };
    case "ADD_COURSE_FAILURE":
      return { ...state, isFetching: false, error: action.error };
    default:
      return state;
  }
};
