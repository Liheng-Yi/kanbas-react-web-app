import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ASSIGNMENTS_API = `${REMOTE_SERVER}/api/courses`;

export const createAssignment = async (courseId: string, assignment: any) => {
    const response = await axios.post(`${ASSIGNMENTS_API}/${courseId}/assignments`, assignment);
    return response.data;
};

export const findAssignmentsForCourse = async (courseId: string) => {
    const response = await axios.get(`${ASSIGNMENTS_API}/${courseId}/assignments`);
    return response.data;
};

export const updateAssignment = async (assignmentId: string, assignment: any) => {
    const response = await axios.put(`${REMOTE_SERVER}/api/assignments/${assignmentId}`, assignment);
    return response.data;
};

export const deleteAssignment = async (assignmentId: string) => {
    const response = await axios.delete(`${REMOTE_SERVER}/api/assignments/${assignmentId}`);
    return response.data;
}; 