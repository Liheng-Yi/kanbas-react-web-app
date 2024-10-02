import { useState } from "react";
import { BsGripVertical } from "react-icons/bs";
import { FaRegCalendarAlt } from 'react-icons/fa';


export default function AssignmentEditor() {
  const [assignmentName, setAssignmentName] = useState<string>('A1 - ENV + HTML');
  const [description, setDescription] = useState<string>('Submit a link to the landing page of your Web application running on Netlify...');
  const [entryOptions, setEntryOptions] = useState({
    textEntry: false,
    websiteURL: true, 
    mediaRecordings: false,
    studentAnnotation: false,
    fileUploads: false,
  });
  const [submissionType, setSubmissionType] = useState('Online');
  return (
    <div id="wd-assignments-editor" className="m-3">
      <div className="container">
        <form>
          <div className="mb-3">
            <label htmlFor="wd-name" className="form-label">Assignment Name</label>
            <input
              type="text"
              id="wd-name"
              className="form-control"
              value={assignmentName}
            />
          </div>

          <div className="mb-3">
            <textarea
              id="wd-description"
              className="form-control"
              value={description}
              rows={3}
            ></textarea>
          </div>
        </form>

        <form>
          <div className="row mb-3">
            <label htmlFor="wd-points" className="col-sm-4 col-form-label text-end">Points</label>
            <div className="col-sm-8">
              <input type="text" className="form-control" id="wd-points" value="100" />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="wd-group" className="col-sm-4 col-form-label text-end">Assignment Group</label>
            <div className="col-sm-8">
              <select id="wd-group" className="form-select">
                <option value="ASSIGNMENTS">ASSIGNMENTS</option>
              </select>
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="wd-display-grade-as" className="col-sm-4 col-form-label text-end">Display Grade as</label>
            <div className="col-sm-8">
              <select id="wd-display-grade-as" className="form-select">
                <option value="Percentage">Percentage</option>
                <option value="Points">Points</option>
              </select>
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="wd-display-grade-as" className="col-sm-4 col-form-label text-end">Submission Type</label>
            <div className="col-sm-8 border p-3">
              <select id="wd-display-grade-as" className="form-select">
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
              </select>

              <div className="mt-3 border p-3">
                <label>Online Entry Options</label>
                <div className="form-check">
                  <input
                    type="checkbox"
                    id="textEntry"
                    className="form-check-input"
                    checked={entryOptions.textEntry}
                  />
                  <label htmlFor="textEntry" className="form-check-label">Text Entry</label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    id="websiteURL"
                    className="form-check-input"
                    checked={entryOptions.websiteURL}
                  />
                  <label htmlFor="websiteURL" className="form-check-label">Website URL</label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    id="mediaRecordings"
                    className="form-check-input"
                    checked={entryOptions.mediaRecordings}
                  />
                  <label htmlFor="mediaRecordings" className="form-check-label">Media Recordings</label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    id="studentAnnotation"
                    className="form-check-input"
                    checked={entryOptions.studentAnnotation}
                  />
                  <label htmlFor="studentAnnotation" className="form-check-label">Student Annotation</label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    id="fileUploads"
                    className="form-check-input"
                    checked={entryOptions.fileUploads}
                  />
                  <label htmlFor="fileUploads" className="form-check-label">File Uploads</label>
                </div>
              </div>

            </div>
          </div>

          <div className="row mb-3" id="assignment-assign-container">
            <div className="col-4 col-form-label text-end">
                Assign
            </div>
            <div className="col-6">
                <div className="border rounded-top p-4" id="assignment-assign-box">
                    <div className="row mb-3">
                        <div>
                            <label htmlFor="assign-to" className="form-label ellipsis">
                                <h6>Assign to</h6>
                            </label>
                            <input type="text" className="form-control" name="assign-to" id="assign-to" value="Everyone" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="due" className="form-label ellipsis">
                            <h6>Due</h6>
                        </label>
                        <div className="input-group">
                            <input type="date" className="form-control" name="due" id="due" value="2023-09-18" /> 
                        </div>
                    </div>
                    <div className="row" id="available-from-until-container">
                        <div className="col">
                            <label htmlFor="available-from" className="form-label ellipsis">
                                <h6>Available From</h6>
                            </label>
                            <div className="input-group">
                                <input type="date" className="form-control" name="available-from" id="available-from" value="2023-09-06" /> 

                            </div>
                        </div>
                        <div className="col">
                            <label htmlFor="available-until" className="form-label ellipsis">
                                <h6>Until</h6>
                            </label>
                            <div className="input-group">
                                <input type="date" className="form-control" id="available-until" name="available-until" value="" /> 

                            </div>
                        </div>
                    </div>
                </div>

            </div>
          </div>
          <hr />
          <div className="d-flex flex-row" id="assignment-form-buttons-container">
            <div className="ms-auto">
                <button className="btn btn-secondary me-1">
                    Cancel
                </button>
                <button className="btn btn-danger me-1">
                    Save
                </button>
            </div>
          </div>





        </form>
      </div>
    </div>
  );
}