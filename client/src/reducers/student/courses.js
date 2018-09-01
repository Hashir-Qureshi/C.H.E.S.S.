const initialState = {
  enrolledCourses: [],
  isFetching: false,
  error: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_ENROLLED_COURSES_REQUEST":
      return { ...state, isFetching: true };
    case "SET_ENROLLED_COURSES_SUCCESS":
      return {
        enrolledCourses: action.enrolledCourses,
        isFetching: false
      };
    case "SET_ENROLLED_COURSES_FAILURE":
      return { ...state, isFetching: false, error: action.error };
    case "ENROLL_FOR_COURSE_REQUEST":
      return { ...state, isFetching: true };
    case "ENROLL_FOR_COURSE_SUCCESS":
      return {
        enrolledCourses: [...state.enrolledCourses, action.enrolledCourse],
        isFetching: false
      };
    case "ENROLL_FOR_COURSE_FAILURE":
      return { ...state, isFetching: false, error: action.error };
    default:
      return state;
  }
};
