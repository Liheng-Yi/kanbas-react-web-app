import { createSlice } from "@reduxjs/toolkit";

export interface Assignment {
  _id: string;
  title: string;
  course: string;
  available?: string;
  due?: string;
  points?: number;
  startDate?: string;
  endDate?: string;
  description?: string;
  editing?: boolean;
}

export interface AssignmentState {
  assignments: Assignment[];
}

const initialState: AssignmentState = {
  assignments: [],
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    setAssignment: (state, action) => {
      state.assignments = action.payload;
    },

    addAssignment: (state, { payload: assignment }) => {
      const newAssignment: Assignment = {
        _id: new Date().getTime().toString(),
        ...assignment
      };
      state.assignments.push(newAssignment);
    },
    
    deleteAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.filter(
        (a: any) => a._id !== assignmentId);
    },
    updateAssignment: (state, { payload: assignment }) => {
      state.assignments = state.assignments.map((a: any) =>
        a._id === assignment._id ? assignment : a
      ) as any;
    },
    editAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.map((a: any) =>
        a._id === assignmentId ? { ...a, editing: true } : a
      ) as any;
    },
  },
});
export const { addAssignment, deleteAssignment, updateAssignment, editAssignment, setAssignment } =
  assignmentsSlice.actions;
export default assignmentsSlice.reducer;
