export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label>
      <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
      <textarea id="wd-description">
        The assignment is available online Submit a link to the landing page of
      </textarea>
      <br />
      <table>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Points</label>
          </td>
          <td>
            <input id="wd-points" value={100} />
          </td>
          <td>
          
          </td>
        </tr>
        <label htmlFor="wd-group">Assignment Group</label>
        <td>
          <select id="wd-group" defaultValue="ASSIGNMENTS">
            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
          </select>
        </td>
        <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-display-grade-as">Display Grade as</label>
            </td>
            <td>
              <select id="wd-display-grade-as" defaultValue="Percentage">
                <option value="Percentage">Percentage</option>
                <option value="Points">Points</option>
              </select>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-submission-type">Submission Type</label>
            </td>
            <td>
              <select id="wd-submission-type" defaultValue="Online">
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
              </select>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <fieldset>
                <legend>Online Entry Options</legend>
                <label><input type="checkbox" id="wd-text-entry" name="entry-options" value="Text Entry" /> Text Entry</label><br />
                <label><input type="checkbox" id="wd-website-url" name="entry-options" value="Website URL" /> Website URL</label><br />
                <label><input type="checkbox" id="wd-media-recordings" name="entry-options" value="Media Recordings" /> Media Recordings</label><br />
                <label><input type="checkbox" id="wd-student-annotation" name="entry-options" value="Student Annotation" /> Student Annotation</label><br />
                <label><input type="checkbox" id="wd-file-upload" name="entry-options" value="File Uploads" /> File Uploads</label>
              </fieldset>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-assign-to">Assign to</label>
            </td>
            <td>
              <select id="wd-assign-to" defaultValue="Everyone">
                <option value="Everyone">Everyone</option>
                <option value="Everyone">Everyone</option>
                <option value="Everyone">Everyone</option>
                <option value="Everyone">Everyone</option>
                <option value="Everyone">Everyone</option>
              </select>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-due-date">Due</label>
            </td>
            <td>
              <input type="date" id="wd-due-date" defaultValue="2024-05-13" />
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-available-from">Available from</label>
            </td>
            <td>
              <input type="date" id="wd-available-from" defaultValue="2024-05-06" />
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-available-until">Until</label>
            </td>
            <td>
              <input type="date" id="wd-available-until" defaultValue="2024-05-20" />
            </td>
          </tr>
      </table>
      <button onClick={() => console.log("Save Clicked")}>Save</button>
      <button onClick={() => console.log("Cancel Clicked")}>Cancel</button>
    </div>
);}
