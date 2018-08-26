export const setCourses = courses => ({
  type: "SET_COURSES_SUCCESS",
  courses
});

export const setCoursesFailed = error => ({
  type: "SET_COURSES_FAILURE",
  error
});

export const newCourse = course => ({
  type: "NEW_COURSE_SUCCESS",
  course
});

export const newCourseFailed = error => ({
  type: "NEW_COURSE_FAILED",
  error
});
