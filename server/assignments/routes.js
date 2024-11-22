import * as dao from "./dao.js";

function AssignmentRoutes(app) {
  const findAssignmentsForCourse = async (req, res) => {
    const { courseId } = req.params;
    const assignments = await dao.findAssignmentsForCourse(courseId);
    res.json(assignments);
  };

  const createAssignment = async (req, res) => {
    const assignment = await dao.createAssignment(req.body);
    res.json(assignment);
  };

  const updateAssignment = async (req, res) => {
    const { aid } = req.params;
    const status = await dao.updateAssignment(aid, req.body);
    res.json(status);
  };

  const deleteAssignment = async (req, res) => {
    const { aid } = req.params;
    const status = await dao.deleteAssignment(aid);
    res.json(status);
  };

  app.get("/api/assignments/course/:courseId", findAssignmentsForCourse);
  app.post("/api/assignments", createAssignment);
  app.put("/api/assignments/:aid", updateAssignment);
  app.delete("/api/assignments/:aid", deleteAssignment);
}

export default AssignmentRoutes; 