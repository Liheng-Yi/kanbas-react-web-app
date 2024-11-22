import model from "./model.js";

export const findAllEnrollments = () => model.find();

export const createEnrollment = (enrollment) => model.create(enrollment);

export const deleteEnrollment = (userId, courseId) =>
  model.deleteOne({ user: userId, course: courseId }); 