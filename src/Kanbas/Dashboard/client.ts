import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:4000";
const ENROLLMENTS_API = `${API_BASE}/api/enrollments`;

export const findAllEnrollments = async () => {
  const response = await axios.get(ENROLLMENTS_API);
  return response.data;
};

export const createEnrollment = async (enrollment: any) => {
  const response = await axios.post(ENROLLMENTS_API, enrollment);
  return response.data;
};

export const deleteEnrollment = async (userId: string, courseId: string) => {
  const response = await axios.delete(
    `${ENROLLMENTS_API}/${userId}/${courseId}`
  );
  return response.data;
};

export const enrollInCourse = async (userId: string, courseId: string) => {
  const response = await axios.post(`${ENROLLMENTS_API}/enroll`, {
    userId,
    courseId,
  });
  return response.data;
};

export const unenrollFromCourse = async (userId: string, courseId: string) => {
  const response = await axios.post(`${ENROLLMENTS_API}/unenroll`, {
    userId,
    courseId,
  });
  return response.data;
}; 