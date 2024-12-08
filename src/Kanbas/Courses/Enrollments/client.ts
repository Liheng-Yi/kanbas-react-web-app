import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;

export const enrollUser = async (userId: string, courseId: string) => {
    const response = await axiosWithCredentials.post(ENROLLMENTS_API, { userId, courseId });
    return response.data;
};

export const unenrollUser = async (userId: string, courseId: string) => {
    const response = await axiosWithCredentials.delete(ENROLLMENTS_API, { data: { userId, courseId } });
    return response.data;
};

export const fetchEnrollmentsForUser = async (userId: string) => {
    const response = await axiosWithCredentials.get(`${ENROLLMENTS_API}/${userId}`);
    return response.data;
};