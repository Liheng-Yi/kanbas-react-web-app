// src/Kanbas/Courses/Enrollments/client.ts
import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const USERS_API = `${REMOTE_SERVER}/api/users`;
const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;

export const findAllEnrollments = async () => {
  console.log("Calling findAllEnrollments API");
  const response = await axios.get(ENROLLMENTS_API);
  console.log("findAllEnrollments response:", response.data);
  return response.data;
};

export const enrollInCourse = async (userId: string, courseId: string) => {
  console.log("Enrolling user in course:", { userId, courseId });
  const response = await axios.post(
    `${USERS_API}/${userId}/enrollments/${courseId}`
  );
  console.log("Enroll response:", response.data);
  return response.data;
};

export const unenrollFromCourse = async (userId: string, courseId: string) => {
  console.log("Unenrolling user from course:", { userId, courseId });
  const response = await axios.delete(
    `${USERS_API}/${userId}/enrollments/${courseId}`
  );
  console.log("Unenroll response:", response.data);
  return response.data;
};

export const findUserEnrollments = async (userId: string) => {
  console.log("Finding enrollments for user:", userId);
  const response = await axios.get(`${USERS_API}/${userId}/enrollments`);
  console.log("User enrollments response:", response.data);
  return response.data;
};
