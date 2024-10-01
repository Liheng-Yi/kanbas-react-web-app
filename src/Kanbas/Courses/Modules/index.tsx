import ModulesControls from "./ModulesControls";
import { BsGripVertical } from "react-icons/bs";
import LessonControlButtons from "./LessonControlButtons";
export default function Modules() {
  const handleCollapseAll = () => {
    console.log("Collapse All clicked");
  };

  const handleViewProgress = () => {
    console.log("View Progress clicked");
  };

  const handlePublishAll = () => {
    console.log("Publish All clicked");
  };

  const handleAddModule = () => {
    console.log("+ Module clicked");
  };

  return (
    <div>
      <div className="module-buttons">
        <button onClick={handleCollapseAll}>Collapse All</button>
        <button onClick={handleViewProgress}>View Progress</button>
        <button onClick={handlePublishAll}>Publish All</button>
        <button onClick={handleAddModule}>+ Module</button>
      </div>

      <div>
        <ModulesControls /><br /><br /><br /><br />
        <ul id="wd-modules" className="list-group rounded-0">
          <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" />
              Week 1
              <LessonControlButtons />
            </div>
            <ul className="wd-lessons list-group rounded-0">
              <li className="wd-lesson list-group-item p-3 ps-1">
                <BsGripVertical className="me-2 fs-3" />
                LEARNING OBJECTIVES
              </li>
              <LessonControlButtons />
              <li className="wd-lesson list-group-item p-3 ps-1">
                <BsGripVertical className="me-2 fs-3" />
                Introduction to the course
              </li>
              <LessonControlButtons />
              <li className="wd-lesson list-group-item p-3 ps-1">
                Learn what is Web Development
              </li>
              <li className="wd-lesson list-group-item p-3 ps-1"> LESSON 1 </li>
              <li className="wd-lesson list-group-item p-3 ps-1"> LESSON 2 </li>
            </ul>
          </li>
          <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary"> Week 2 </div>
            <ul className="wd-lessons list-group rounded-0">
              <li className="wd-lesson list-group-item p-3 ps-1">
                LEARNING OBJECTIVES
              </li>
              <li className="wd-lesson list-group-item p-3 ps-1"> LESSON 1 </li>
              <li className="wd-lesson list-group-item p-3 ps-1"> LESSON 2 </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}