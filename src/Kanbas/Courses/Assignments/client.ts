import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const axiosWithCredentials = axios.create({ withCredentials: true });
const ASSIGNMENTS_API = `${REMOTE_SERVER}/api/courses`;

export const createAssignment = async (courseId: string, assignment: any) => {
    console.log("assignment", assignment);
    const response = await axiosWithCredentials.post(`${ASSIGNMENTS_API}/${courseId}/assignments`, assignment);

    return response.data;
};

export const findAssignmentsForCourse = async (courseId: string) => {
    const response = await axiosWithCredentials.get(`${ASSIGNMENTS_API}/${courseId}/assignments`);
    return response.data;
};

export const updateAssignment = async (assignmentId: string, assignment: any) => {
    const response = await axiosWithCredentials.put(`${REMOTE_SERVER}/api/assignments/${assignmentId}`, assignment);
    return response.data;
};

export const deleteAssignment = async (assignmentId: string) => {
    const response = await axiosWithCredentials.delete(`${REMOTE_SERVER}/api/assignments/${assignmentId}`);
    return response.data;
}; 