import { createSlice } from "@reduxjs/toolkit";
// import { enrollments } from "../../Database";

interface Enrollment {
  _id: string;
  user: string;
  course: string;
}

const initialState = {
  enrollments: [] as Enrollment[],
  showAllCourses: false
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, action) => {
      state.enrollments = action.payload;
    },

    toggleShowAllCourses: (state) => {
      state.showAllCourses = !state.showAllCourses;
    },
    
    enrollStudent: (state, action) => {
      const newEnrollment = {
        _id: new Date().getTime().toString(),
        user: action.payload.userId,
        course: action.payload.courseId
      };
      state.enrollments.push(newEnrollment);
    },
    unenrollStudent: (state, action) => {
      state.enrollments = state.enrollments.filter(
        (enrollment) => 
          !(enrollment.user === action.payload.userId && 
            enrollment.course === action.payload.courseId)
      );
    },
  }
});

export const { toggleShowAllCourses, enrollStudent, unenrollStudent, setEnrollments } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;