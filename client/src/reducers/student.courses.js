export default (state = [], action) => {
  switch (action.type) {
    case "SET_ENROLLED_COURSES":
      return action.enrolledCourses;
    case "ENROLL_FOR_COURSE":
      return [...state, action.enrolledCourse];
    default:
      return state;
  }
};
