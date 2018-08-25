// libraries
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

// files
import teacherCourseReducer from "../reducers/teacher.courses";
import studentCourseReducer from "../reducers/student.courses";
import authReducer from "../reducers/auth";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      teacherCourses: teacherCourseReducer,
      studentCourses: studentCourseReducer,
      auth: authReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
