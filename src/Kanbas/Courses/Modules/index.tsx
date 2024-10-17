import ModulesControls from "./ModulesControls";
import { BsGripVertical } from "react-icons/bs";
import LessonControlButtons from "./LessonControlButtons";
import * as db from "../../Database";
import { useParams } from "react-router";



export default function Modules() {
  const { cid } = useParams();
  const modules = db.modules.filter((module: db.Module) => module.course === cid);

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
        {modules
          .filter((module: any) => module.course === cid)
          .map((module: any) => (
          <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" /> {module.name} <LessonControlButtons />
            </div>
            {module.lessons && (
              <ul className="wd-lessons list-group rounded-0">
                {module.lessons.map((lesson: any) => (
                  <li className="wd-lesson list-group-item p-3 ps-1">
                    <BsGripVertical className="me-2 fs-3" /> {lesson.name} <LessonControlButtons />
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}
