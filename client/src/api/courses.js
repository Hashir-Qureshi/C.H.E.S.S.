// libraries
import axios from "axios";

// files
import {
  setCourses,
  setCoursesFailed,
  newCourse,
  newCourseFailed
} from "../actions/courses";

// used for teachers
export const fetchCourses = () => {
  return dispatch => {
    dispatch({ type: "SET_COURSES_REQUEST" });
    return axios
      .get("/api/courses/all")
      .then(response => {
        if (response.status === 200) {
          dispatch(setCourses(response.data));
        }
      })
      .catch(error => dispatch(setCoursesFailed(error)));
  };
};

export const createCourse = (courseName, section, semester, year) => {
  return dispatch => {
    dispatch({ type: "NEW_COURSE_REQUEST" });
    axios
      .post("/api/course/create", {
        course_name: courseName,
        section_num: section,
        semester,
        year
      })
      .then(response => {
        if (response.status === 200) {
          dipatch(newCourse(response.data));
        }
      })
      .catch(error => newCourseFailed(error));
  };
};

// used for students
export const fetchEnrolledCourses = () => {
  return dispatch => {
    dispatch({ type: "SET_COURSES_REQUEST" });
    return axios
      .get("/api/courses/enrolled")
      .then(response => {
        if (response.status === 200) {
          dispatch(setCourses(response.data));
        }
      })
      .catch(error => dispatch(setCoursesFailed(error)));
  };
};

export const enrollForCourse = (courseName, section, semester, year) => {
  return dispatch => {
    dispatch({ type: "NEW_COURSE_REQUEST" });
    axios
      .post("/api/course/create", {
        course_name: courseName,
        section_num: section,
        semester,
        year
      })
      .then(response => {
        if (response.status === 200) {
          dipatch(newCourse(response.data));
        }
      })
      .catch(error => newCourseFailed(error));
  };
};
