import * as dao from "../database/enrollments/dao.js";

function EnrollmentRoutes(app) {
  const findAllEnrollments = async (req, res) => {
    const enrollments = await dao.findAllEnrollments();
    res.json(enrollments);
  };

  const createEnrollment = async (req, res) => {
    const enrollment = await dao.createEnrollment(req.body);
    res.json(enrollment);
  };

  const deleteEnrollment = async (req, res) => {
    const { userId, courseId } = req.params;
    const status = await dao.deleteEnrollment(userId, courseId);
    res.json(status);
  };

  app.get("/api/enrollments", findAllEnrollments);
  app.post("/api/enrollments", createEnrollment);
  app.delete("/api/enrollments/:userId/:courseId", deleteEnrollment);
}

export default EnrollmentRoutes; 