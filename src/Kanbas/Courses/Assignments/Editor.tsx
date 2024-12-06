import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addAssignment, updateAssignment, editAssignment } from "./reducer";
import * as assignmentsClient from "./client";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const assignments = useSelector((state: any) => state.assignmentsReducer.assignments);
  
  const defaultAssignment = {
    _id: "",
    title: "",
    course: cid,
    points: 100,
    description: "",
    startDate: "",
    endDate: "",
    available: "",
    due: "",
  };

  const assignment = !aid || aid === "new" 
    ? defaultAssignment 
    : assignments.find((a: any) => a._id === aid);

  const [formData, setFormData] = useState({
    ...defaultAssignment,
    ...assignment,
    startDate: assignment?.startDate || "",
    endDate: assignment?.endDate || "",
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formatDate = (date: string) => {
      if (!date) return "";
      const d = new Date(date);
      return `${d.toLocaleString('default', { month: 'short' })} ${d.getDate()} at ${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}${d.getHours() >= 12 ? 'pm' : 'am'}`;
    };

    const updatedAssignments = {
      ...formData,
      available: formatDate(formData.startDate),
      due: formatDate(formData.endDate),
    };

    if (aid === "new") {
      await assignmentsClient.createAssignment(cid as string, updatedAssignments);
      dispatch(addAssignment(updatedAssignments));
    } else {
      await assignmentsClient.updateAssignment(aid as string, updatedAssignments);
      dispatch(updateAssignment(updatedAssignments));
    }
    navigate(`/Kanbas/Courses/${cid}/Assignments`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  return (
    <div id="wd-assignments-editor" className="m-3">
      <div className="container">
        <form onSubmit={handleSave}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Assignment Name</label>
            <input 
              id="title" 
              type="text" 
              className="form-control"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea 
              id="description" 
              className="form-control"
              value={formData.description}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div className="row mb-3">
            <label htmlFor="points" className="col-sm-4 col-form-label text-end">Points</label>
            <div className="col-sm-8">
              <input 
                type="number" 
                className="form-control" 
                id="points"
                value={formData.points}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="group" className="col-sm-4 col-form-label text-end">Assignment Group</label>
            <div className="col-sm-8">
              <select id="group" className="form-select" defaultValue="ASSIGNMENTS">
                <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                <option value="Group1">Group1</option>
                <option value="Group2">Group2</option>
                <option value="Group3">Group3</option>
              </select>
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="display-grade-as" className="col-sm-4 col-form-label text-end">Display Grade as</label>
            <div className="col-sm-8">
              <select id="display-grade-as" className="form-select" defaultValue="Percentage">
                <option value="Percentage">Percentage</option>
                <option value="Points">Points</option>
              </select>
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="submission-type" className="col-sm-4 col-form-label text-end">Submission Type</label>
            <div className="col-sm-8 border p-3">
              <select id="submission-type" className="form-select" defaultValue="Online">
                <option value="Online">Online</option>
                <option value="In-person">In-person</option>
              </select>

              <div className="mt-3 border p-3">
                <label>Online Entry Options</label>
                <div className="form-check">
                  <input type="checkbox" id="textEntry" className="form-check-input" />
                  <label htmlFor="textEntry" className="form-check-label">Text Entry</label>
                </div>
                <div className="form-check">
                  <input id="websiteURL" type="checkbox" className="form-check-input" />
                  <label htmlFor="websiteURL" className="form-check-label">Website URL</label>
                </div>
                <div className="form-check">
                  <input id="mediaRecordings" type="checkbox" className="form-check-input" />
                  <label htmlFor="mediaRecordings" className="form-check-label">Media Recordings</label>
                </div>
                <div className="form-check">
                  <input id="studentAnnotation" type="checkbox" className="form-check-input" />
                  <label htmlFor="studentAnnotation" className="form-check-label">Student Annotation</label>
                </div>
                <div className="form-check">
                  <input id="fileUploads" type="checkbox" className="form-check-input" />
                  <label htmlFor="fileUploads" className="form-check-label">File Uploads</label>
                </div>
              </div>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-4 col-form-label text-end">Assign</div>
            <div className="col-6">
              <div className="border rounded-top p-4">
                <div className="row mb-3">
                  <label htmlFor="due" className="form-label"><h6>Due Date</h6></label>
                  <input 
                    type="date" 
                    className="form-control" 
                    id="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="row">
                  <div className="col">
                    <label htmlFor="startDate" className="form-label"><h6>Available From</h6></label>
                    <input 
                      type="date" 
                      className="form-control" 
                      id="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr />
          <div className="d-flex flex-row">
            <div className="ms-auto">
              <Link to={`/Kanbas/Courses/${cid}/Assignments`}>
                <button className="btn btn-secondary me-1" type="button">Cancel</button>
              </Link>
              <button className="btn btn-danger me-1" type="submit">Save</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
