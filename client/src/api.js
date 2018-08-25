// libraries
import axios from "axios";

// files
import {
  startSetCourses,
  setCourses,
  setCoursesFailed,
  addCourse
} from "./actions/courses";

// Will move to different file or have seperate configuration later
const AUTH_TOKEN = "";
axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

export const fetchCourses = () => {
  return dispatch => {
    dispatch(startSetCourses());
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

export const addCourse = (courseName, section, semester, year) => {
  return dispatch => {
    axios
      .post("/api/course/create", {
        course_name: courseName,
        section_num: section,
        semester,
        year
      })
      .then(response => {
        if (response.status === 200) {
          dipatch(addCourse(response.data));
        }
      })
      .catch(error => console.log(error));
  };
};
