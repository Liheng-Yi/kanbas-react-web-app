import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ASSIGNMENTS_URL = `${REMOTE_SERVER}/api/assignments`;

export const findAssignmentsForCourse = async (courseId: string) => {
  const response = await axios.get(`${ASSIGNMENTS_URL}/course/${courseId}`);
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

export const removeAssignment = async (aid: string) => {
  const response = await axios.delete(`${ASSIGNMENTS_URL}/${aid}`);
  return response.data;
}; 