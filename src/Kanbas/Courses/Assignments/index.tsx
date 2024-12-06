import { FaPlus } from "react-icons/fa6";
import LessonControlButtons from "../Modules/LessonControlButtons";
import AssignmentButtons from "./assignmentButton";
import { AiOutlineCaretDown } from "react-icons/ai";
import { BsGripVertical, BsTrash } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Assignment, addAssignment, 
  deleteAssignment, updateAssignment, editAssignment, setAssignment } from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import * as assignmentsClient from "./client";

export default function Assignments() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const [showDialog, setShowDialog] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<string | null>(null);
  const assignments = useSelector((state: any) => 
    state.assignmentsReducer.assignments);

  const handleDeleteClick = (e: React.MouseEvent, assignmentId: string) => {
    e.preventDefault();
    setSelectedAssignment(assignmentId);
    setShowDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedAssignment) {
        await assignmentsClient.deleteAssignment(selectedAssignment);
        dispatch(deleteAssignment(selectedAssignment));
        setShowDialog(false);
        setSelectedAssignment(null);
    }
  };
  const fetchAssignments = async () => {
    const assignments = await assignmentsClient.findAssignmentsForCourse(cid as string);
    dispatch(setAssignment(assignments));
  };
  useEffect(() => {
    fetchAssignments();
  }, []);


  return (
    <div id="wd-assignments" className="text-nowrap">
      <div className="d-flex flex-row mb-3 gap-3">
        <input id="wd-search-assignment" placeholder="text"
          className="form-control float-start" value="🔍 Search....">
        </input>
        <button id="wd-view-progress-btn" className="btn btn-sm btn-white me-1 rounded-0">
          <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
          Group</button>
        <div id="wd-new-assignment-btn">
        <Link to={`/Kanbas/Courses/${cid}/Assignments/new`} className="wd-assignment-link">
          <button id="wd-collapse-all-btn" className="btn btn-sm btn-danger me-1 rounded-0">
            <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
            Assignment
          </button>
        </Link>
        </div>
      </div>

      <ul id="wd-assignments-title" className="mt-2 list-group rounded-0 w-100">
        <li className="list-group-item p-3 d-flex align-items-center justify-content-between bg-light" style={{ backgroundColor: '#f0f0f0' }}>
          <div className="d-flex align-items-center">
            <BsGripVertical className="me-2 fs-3" />
            <AiOutlineCaretDown className="me-2" />
            <h3 className="mb-0">ASSIGNMENT</h3>
          </div>
          <div className="ms-auto">
            <AssignmentButtons />
          </div>
        </li>

        {assignments
          //.filter((assign: Assignment) => assign.course === cid)
          .map((assign: Assignment) => (
            <li key={assign._id} className="list-group-item d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <FaRegEdit size={30} className="me-3 text-success" />
              <div className="flex-grow-1">
                <Link 
                  to={`/Kanbas/Courses/${cid}/Assignments/${assign._id}`} 
                  className="wd-assignment-link">
                  {assign.title}
                </Link>
                <p className="mb-0">
                    <span className="text-danger">Multiple Modules</span> |
                    <span className="fw-bold">Not available Until</span> |
                    <span>{assign.available}</span> |<br />
                    <span>Due {assign.due} | {assign.points} pts</span>
                </p>
              </div>
              <button 
                className="btn btn-danger me-2"
                onClick={(e) => handleDeleteClick(e, assign._id)}
              >
                <BsTrash />
              </button>
              <LessonControlButtons />
            </li>
          ))}
      </ul>

      {showDialog && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button type="button" className="btn-close" onClick={() => setShowDialog(false)}></button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete this assignment?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowDialog(false)}>
                  Cancel
                </button>
                <button type="button" className="btn btn-danger" onClick={handleConfirmDelete}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div >
  );
}