import { createSlice } from "@reduxjs/toolkit";



const initialState = {
  enrollments: [],
  showAllCourses: false,
  enrolled: [],
  userId: ""
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setEnrollments: (state, action) => {
      state.enrollments = action.payload;
      console.log("Enrollments in reducer:", state.enrollments);
      console.log("User ID in reducer:", state.userId);
      state.enrolled = state.enrollments.filter(
        (enrollment: any) => enrollment.user === state.userId
      );
      console.log("Enrolled in reducer:", state.enrolled);
    },
    toggleShowAllCourses: (state) => {
      state.showAllCourses = !state.showAllCourses;
    },
    enrollInCourse: (state, action) => {
      const { userId, courseId } = action.payload;
      state.enrollments = state.enrollments.filter(
        (enrollment: any) => !(enrollment.user === userId && enrollment.course === courseId)
      );
    },
    unenrollFromCourse: (state, action) => {
      const { userId, courseId } = action.payload;
      state.enrollments = state.enrollments.filter(
        (enrollment: any) => !(enrollment.user === userId && enrollment.course === courseId)
      );
    }
  }
});

export const { setUserId, setEnrollments, toggleShowAllCourses, enrollInCourse, unenrollFromCourse } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;