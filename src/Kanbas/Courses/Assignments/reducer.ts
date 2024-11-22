import { createSlice } from "@reduxjs/toolkit";
import { assignments } from "../../Database";

interface Assignment {
  _id: string;
  [key: string]: any;  // for other properties
}

interface AssignmentState {
  assignments: Assignment[];
  assignment: Assignment | {};
}

const initialState: AssignmentState = {
  assignments: [],
  assignment: {}
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    setAssignments: (state, action) => {
      state.assignments = action.payload;
    },
    addAssignment: (state, action) => {
      const newAssignment: Assignment = {
        ...action.payload,
        _id: new Date().getTime().toString(),
      };
      state.assignments = [...state.assignments, newAssignment];
    },

    deleteAssignment: (state, {payload: assignmentId}) => {
      state.assignments = state.assignments.filter(
        (assignment) => assignment._id !== assignmentId
      );
      
    },
    updateAssignment: (state, action) => {
      state.assignments = state.assignments.map((assignment) =>
        assignment._id === action.payload._id ? action.payload : assignment
      );
    },
    setAssignment: (state, action) => {
      state.assignment = action.payload;
    }
  },
});

export const { addAssignment, deleteAssignment, updateAssignment, setAssignments, setAssignment } =
  assignmentsSlice.actions;
export default assignmentsSlice.reducer;

