/*
 this reducer will have different use cases both for teachers and students.
 during any given moment, a user won't be accesing the site as both a student and a teacher
 an object in the courseList array for teachers will look like this:
  {
    id: ,
    name: ,
    section: ,
    semester: ,
    year: 
  }

  for students:
  {
    id: ,
    name: ,
    section: ,
    semester: ,
    year: ,
    teacherFirstName: ,
    teacherLastName: ,
    activeAssignments: 
  }
*/

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
      return { ...state, courseList: action.courses, isFetching: false };
    case "SET_COURSES_FAILURE":
      return { ...state, isFetching: false, error: action.error };
    case "NEW_COURSE_REQUEST":
      return { ...state, isFetching: true };
    case "NEW_COURSE_SUCCESS":
      return {
        ...state,
        courseList: [...state.courseList, action.course],
        isFetching: false
      };
    case "NEW_COURSE_FAILURE":
      return { ...state, isFetching: false, error: action.error };
    default:
      return state;
  }
};
