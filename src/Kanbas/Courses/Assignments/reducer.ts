import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { assignments } from "../../Database";

// Define types
interface Assignment {
  _id: string;
  title: string;
  course: string;
  description: string;
  dueDate: string;
  points: number;
  availableFrom: string;
  untilDate: string;
}

interface AssignmentsState {
  assignments: Assignment[];
}

// Type the initial state
const initialState: AssignmentsState = {
  assignments: assignments,
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    setAssignments: (state, action: PayloadAction<Assignment[]>) => {
      state.assignments = action.payload;
    },
    addAssignment: (state, action: PayloadAction<Omit<Assignment, "_id">>) => {
      const newAssignment: Assignment = {
        _id: new Date().getTime().toString(),
        ...action.payload,
        points: Number(action.payload.points),
        course: action.payload.course,
      };
      state.assignments.push(newAssignment);
    },
    deleteAssignment: (state, action: PayloadAction<string>) => {
      state.assignments = state.assignments.filter(
        (assignment) => assignment._id !== action.payload
      );
    },
    updateAssignment: (state, action: PayloadAction<Assignment>) => {
      state.assignments = state.assignments.map((assignment) =>
        assignment._id === action.payload._id
          ? {
              ...assignment,
              title: action.payload.title,
              description: action.payload.description,
              points: parseInt(action.payload.points.toString()),
              dueDate: action.payload.dueDate,
              availableFrom: action.payload.availableFrom,
              untilDate: action.payload.untilDate,
            }
          : assignment
      );
    },
  },
});

export const {
  setAssignments,
  addAssignment,
  deleteAssignment,
  updateAssignment,
} = assignmentsSlice.actions;
export default assignmentsSlice.reducer;

// Export types for use in components
export type { Assignment, AssignmentsState };
