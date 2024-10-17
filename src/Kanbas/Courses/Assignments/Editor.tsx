import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { assignments, Assignment } from "../../Database";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const [assignment, setAssignment] = useState({
    title: "",
    description: "",
    points: 0,
    dueDate: "",
    availableFromDate: "",
  });

  useEffect(() => {
    const selectedAssignment = assignments.find((a: Assignment) => a._id === aid);
    if (selectedAssignment) {
      setAssignment(selectedAssignment);
    }
  }, [aid]);

  return (
    <div id="wd-assignments-editor" className="m-3">
      <div className="container">
        <h2>Assignment Editor: {assignment.title}</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="wd-name" className="form-label">Assignment Name</label>
            <input
              type="text"
              id="wd-name"
              className="form-control"
              value={assignment.title}
              readOnly
            />
          </div>

          <div className="mb-3">
            <label htmlFor="wd-description" className="form-label">Description</label>
            <textarea
              id="wd-description"
              className="form-control"
              value={assignment.description}
              rows={3}
              readOnly
            ></textarea>
          </div>

          <div className="mb-3">
            <label htmlFor="wd-points" className="form-label">Points</label>
            <input
              type="number"
              id="wd-points"
              className="form-control"
              value={assignment.points}
              readOnly
            />
          </div>

          <div className="mb-3">
            <label htmlFor="wd-due-date" className="form-label">Due Date</label>
            <input
              type="text"
              id="wd-due-date"
              className="form-control"
              value={assignment.dueDate}
              readOnly
            />
          </div>

          <div className="mb-3">
            <label htmlFor="wd-available-from" className="form-label">Available From</label>
            <input
              type="text"
              id="wd-available-from"
              className="form-control"
              value={assignment.availableFromDate}
              readOnly
            />
          </div>

          {/* Other fields (Submission Type, Assignment Group, etc.) should be here */}

          <div className="d-flex justify-content-end mt-3">
            <Link to={`/Kanbas/Courses/${cid}/Assignments`} className="btn btn-secondary me-2">
              Cancel
            </Link>
            <Link to={`/Kanbas/Courses/${cid}/Assignments`} className="btn btn-success">
              Save
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
