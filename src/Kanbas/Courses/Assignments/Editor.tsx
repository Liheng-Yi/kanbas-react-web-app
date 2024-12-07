import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addAssignment, updateAssignment } from "./reducer";
import FacultyOnly from "../../Account/FacultyRounte";
import * as assignmentsClient from "./client";

// Define the types
interface Assignment {
  _id: string;
  title: string;
  course: string;
  description: string;
  dueDate: string;
  points: number;
  availableFrom: string;
  untilDate: string;
}

interface RootState {
  assignmentsReducer: {
    assignments: Assignment[];
  };
}

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Add loading state
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialFormData = {
    title: "",
    description: "",
    points: "100",
    dueDate: new Date().toISOString().split("T")[0],
    availableFrom: new Date().toISOString().split("T")[0],
    untilDate: new Date().toISOString().split("T")[0],
    course: cid || "",
  };

  const [formData, setFormData] = useState(initialFormData);

  // Use proper typing for the selector
  const assignment = useSelector((state: RootState) =>
    state.assignmentsReducer.assignments.find(
      (assignment) => assignment._id === aid
    )
  );

  useEffect(() => {
    if (assignment) {
      setFormData({
        title: assignment.title,
        description: assignment.description,
        points: assignment.points.toString(),
        dueDate: assignment.dueDate,
        availableFrom: assignment.availableFrom,
        untilDate: assignment.untilDate,
        course: assignment.course,
      });
    }
  }, [assignment]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // UPDATED: handleSubmit to use API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!formData.title || !formData.dueDate) {
        alert("Please fill in all required fields");
        return;
      }

      const assignmentData = {
        ...formData,
        points: parseInt(formData.points),
        course: cid || "",
      };

      if (aid) {
        // Update existing assignment using API
        const updatedAssignment = await assignmentsClient.updateAssignment({
          ...assignmentData,
          _id: aid,
        });
        dispatch(updateAssignment(updatedAssignment));
        console.log("Updated assignment:", updatedAssignment);
      } else {
        // Create new assignment using API
        const newAssignment = await assignmentsClient.createAssignment(
          cid!,
          assignmentData
        );
        dispatch(addAssignment(newAssignment));
        console.log("Added new assignment:", newAssignment);
      }

      navigate(`/Kanbas/Courses/${cid}/Assignments`);
    } catch (error) {
      console.error("Error saving assignment:", error);
      alert("Error saving assignment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="wd-assignments-editor" className="p-4">
      <h3 className="mb-3">
        {assignment ? assignment.title : "New Assignment"}
      </h3>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="wd-name" className="form-label">
            Assignment Name
          </label>
          <input
            id="wd-name"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="wd-description" className="form-label">
            Assignment Description
          </label>
          <textarea
            id="wd-description"
            name="description"
            cols={45}
            rows={5}
            className="form-control"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="row mb-3">
          <div className="col-md-3">
            <label htmlFor="wd-points" className="form-label">
              Points
            </label>
          </div>
          <div className="col-md-9">
            <input
              id="wd-points"
              name="points"
              type="number"
              value={formData.points}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
        </div>

        {/* Assignment Group */}
        <div className="row mb-3">
          <div className="col-md-3">
            <label htmlFor="wd-group" className="form-label">
              Assignment Group
            </label>
          </div>
          <div className="col-md-9">
            <select id="wd-select-group" className="form-select">
              <option selected value="ASSIGNMENTS">
                ASSIGNMENTS
              </option>
              <option value="TESTS">TESTS</option>
              <option value="PROJECTS">PROJECTS</option>
              <option value="LABS">LABS</option>
            </select>
          </div>
        </div>

        {/* Display Grade */}
        <div className="row mb-3">
          <div className="col-md-3">
            <label htmlFor="wd-grade-display" className="form-label">
              Display Grade as
            </label>
          </div>
          <div className="col-md-9">
            <select id="wd-select-grade" className="form-select">
              <option selected value="PERCENTAGE">
                Percentage
              </option>
              <option value="LETTER">Letter</option>
            </select>
          </div>
        </div>

        {/* Submission Type and Entry Options inside a grid box */}
        <div className="row mb-3">
          <div className="col-md-3">
            <label htmlFor="wd-submission-type" className="form-label">
              Submission Type
            </label>
          </div>
          <div className="col-md-9 border p-3">
            <select id="wd-select-submission" className="form-select">
              <option selected value="Online">
                ONLINE
              </option>
              <option value="INPERSON">IN-PERSON</option>
            </select>

            <div className="mt-3">
              <label className="form-label fw-bold">Online Entry Options</label>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="wd-text-entry"
                />
                <label htmlFor="wd-text-entry" className="form-check-label">
                  Text Entry
                </label>
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="wd-website-url"
                  defaultChecked={true}
                />
                <label htmlFor="wd-website-url" className="form-check-label">
                  Website URL
                </label>
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="wd-media-recording"
                />
                <label
                  htmlFor="wd-media-recording"
                  className="form-check-label"
                >
                  Media Recordings
                </label>
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="wd-student-annotation"
                />
                <label
                  htmlFor="wd-student-annotation"
                  className="form-check-label"
                >
                  Student Annotation
                </label>
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="wd-file-uploads"
                />
                <label htmlFor="wd-file-uploads" className="form-check-label">
                  File Uploads
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-3">
            <label htmlFor="wd-submission-type" className="form-label">
              Assign
            </label>
          </div>
          <div className="border p-3 col-md-9">
            <div className="row mb-3">
              <div className="col-md-3">
                <label htmlFor="wd-assign" className="form-label fw-bold">
                  Assign to
                </label>
              </div>
              <div className="col-md-9">
                <input
                  id="wd-assign"
                  value="Everyone"
                  className="form-control"
                  readOnly
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-3">
                <label htmlFor="wd-due" className="form-label fw-bold">
                  Due
                </label>
              </div>
              <div className="col-md-9">
                <input
                  type="date"
                  id="wd-due"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-3">
                <label htmlFor="wd-available" className="form-label fw-bold">
                  Available from
                </label>
              </div>
              <div className="col-md-4">
                <input
                  type="date"
                  id="wd-available"
                  name="availableFrom"
                  value={formData.availableFrom}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-1 text-center fw-bold">Until</div>
              <div className="col-md-4">
                <input
                  type="date"
                  id="wd-until"
                  name="untilDate"
                  value={formData.untilDate}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <hr />
        <FacultyOnly>
          <div className="d-flex justify-content-end">
            <button
              type="button"
              onClick={() => navigate(`/Kanbas/Courses/${cid}/Assignments`)}
              className="btn btn-secondary me-2"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-danger">
              Save
            </button>
          </div>
        </FacultyOnly>
      </form>
    </div>
  );
}
