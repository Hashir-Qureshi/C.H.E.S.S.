export const startSetCourses = () => ({
  type: "SET_COURSES_REQUEST"
});

export const setCourses = courses => ({
  type: "SET_COURSES_SUCCESS",
  courses
});

export const addCourse = course => ({
  type: "ADD_COURSE",
  course
});
