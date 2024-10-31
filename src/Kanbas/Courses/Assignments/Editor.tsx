import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addAssignment, updateAssignment } from "./reducer";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const assignment = useSelector((state: any) => state.assignmentsReducer.assignment);
  const [currentAssignment, setCurrentAssignment] = useState({
    title: "",
    description: "",
    points: 100,
    dueDate: "",
    availableFromDate: "",
    course: cid,
    module: "",
  });
    const assignments = useSelector((state: any) => 
    state.assignmentsReducer.assignments
  );

  const handleSave = () => {
    try {
      const newAssignment = {
        ...currentAssignment,
        _id: aid || new Date().getTime().toString(),
        module: currentAssignment.module || "Module 1",
        course: cid
      };

      if (aid) {
        dispatch(updateAssignment(newAssignment));
      } else {
        dispatch(addAssignment(newAssignment));
      }
      navigate(`/Kanbas/Courses/${cid}/Assignments`);
    } catch (error) {
      console.error("Error in handleSave:", error);
    }
  };

  useEffect(() => {
    if (aid) {
      const assignment = assignments.find(
        (assignment: any) => assignment._id === aid
      );
      if (assignment) {
        setCurrentAssignment(assignment);
      }
    }
  }, [aid, assignments]);

  return (
    <div className="container">
      <h2>Assignment Editor</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Assignment Name</label>
          <input
            id="title"
            className="form-control"
            value={currentAssignment.title}
            onChange={(e) => setCurrentAssignment({
              ...currentAssignment,
              title: e.target.value,
            })}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            id="description"
            className="form-control"
            value={currentAssignment.description}
            onChange={(e) => setCurrentAssignment({
              ...currentAssignment,
              description: e.target.value,
            })}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="points" className="form-label">Points</label>
          <input
            id="points"
            type="number"
            className="form-control"
            value={currentAssignment.points}
            onChange={(e) => setCurrentAssignment({
              ...currentAssignment,
              points: parseInt(e.target.value),
            })}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="dueDate" className="form-label">Due Date</label>
          <input
            id="dueDate"
            type="date"
            className="form-control"
            value={currentAssignment.dueDate}
            onChange={(e) => setCurrentAssignment({
              ...currentAssignment,
              dueDate: e.target.value,
            })}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="availableFromDate" className="form-label">
            Available From Date
          </label>
          <input
            id="availableFromDate"
            type="date"
            className="form-control"
            value={currentAssignment.availableFromDate}
            onChange={(e) => setCurrentAssignment({
              ...currentAssignment,
              availableFromDate: e.target.value,
            })}
          />
        </div>

        <div className="d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-secondary me-2"
            onClick={() => navigate(`/Kanbas/Courses/${cid}/Assignments`)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
