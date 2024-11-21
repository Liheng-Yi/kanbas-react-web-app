import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:4000/api";
const ASSIGNMENTS_URL = `${API_BASE}/assignments`;

export const findAssignmentById = async (assignmentId: string) => {
  const response = await axios.get(`${ASSIGNMENTS_URL}/${assignmentId}`);
  return response.data;
};

export const findAssignmentsForCourse = async (courseId: string) => {
  const response = await axios.get(`${ASSIGNMENTS_URL}/course/${courseId}`);
  console.log("Response:", response.data);
  return response.data;
};

export const createAssignment = async (assignment: any) => {
  const response = await axios.post(ASSIGNMENTS_URL, assignment);
  return response.data;
};

export const updateAssignment = async (aid: string, assignment: any) => {
  const response = await axios.put(`${ASSIGNMENTS_URL}/${aid}`, assignment);
  return response.data;
};

export const removeAssignment = async (assignmentId: string) => {
  const response = await axios.delete(
    `${ASSIGNMENTS_URL}/${assignmentId}`
  );
  console.log("Assignment deleted:", response.data);
  return response.data;
}; 