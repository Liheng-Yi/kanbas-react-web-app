import { createSlice } from "@reduxjs/toolkit";



const initialState = {
  enrollments: [],
  showAllCourses: false,
  enrolled: [],
  userId: "",
  allCourses: []
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setAllCourses: (state, action) => {
      state.allCourses = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setEnrollments: (state, action) => {
      state.enrollments = action.payload;
      state.enrolled = state.enrollments.filter(
        (enrollment: any) => enrollment.user === state.userId
      );
      console.log("[reducer]Enrolled in reducer:", state.enrolled);
    },
    toggleShowAllCourses: (state) => {
      state.showAllCourses = !state.showAllCourses;
    },
    enrollInCourse: (state, action) => {
      const { userId, courseId } = action.payload;
      state.enrollments = state.enrollments.filter(
        (enrollment: any) => !(enrollment.user === userId && enrollment.course === courseId)
      );
      state.enrolled = state.enrolled.filter(
        (enrollment: any) => enrollment.user === state.userId
      );
      console.log("[reducer]Enrolled in reducer:", state.enrolled);
    },
    unenrollFromCourse: (state, action) => {
      const { userId, courseId } = action.payload;
      state.enrollments = state.enrollments.filter(
        (enrollment: any) => !(enrollment.user === userId && enrollment.course === courseId)
      );
      state.enrolled = state.enrolled.filter(
        (enrollment: any) => enrollment.user === state.userId
      );
    }
  }
});

export const { setUserId, setEnrollments, toggleShowAllCourses, enrollInCourse, unenrollFromCourse, setAllCourses } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;