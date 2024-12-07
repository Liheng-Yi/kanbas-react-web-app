import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "../../Database";

const initialState = {
  enrollments: enrollments,
  showAllCourses: false,
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    // NEW: Add setEnrollments action to handle initial loading from server

    setEnrollments: (state, action) => {
      console.log("Reducer - Setting enrollments:", action.payload);
      state.enrollments = action.payload;
      console.log("Reducer - New enrollments state:", state.enrollments);
    },

    toggleShowAllCourses: (state) => {
      console.log("Reducer - Toggling show all courses");
      state.showAllCourses = !state.showAllCourses;
      console.log(
        "Reducer - New show all courses state:",
        state.showAllCourses
      );
    },
    // UPDATED: enrollInCourse now takes the complete enrollment object
    enrollInCourse: (state, action) => {
      console.log("Reducer - Enrolling in course. Payload:", action.payload);
      // Now expects the full enrollment object from the server
      state.enrollments.push(action.payload);
      // No longer need to create _id here as it comes from server
      console.log("Reducer - New enrollments state:", state.enrollments);
    },

    unenrollFromCourse: (state, action) => {
      console.log(
        "Reducer - Unenrolling from course. Payload:",
        action.payload
      );
      const { userId, courseId } = action.payload;
      state.enrollments = state.enrollments.filter(
        (enrollment) =>
          !(enrollment.user === userId && enrollment.course === courseId)
      );
      console.log("Reducer - New enrollments state:", state.enrollments);
    },
  },
});

export const {
  setEnrollments,
  toggleShowAllCourses,
  enrollInCourse,
  unenrollFromCourse,
} = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
