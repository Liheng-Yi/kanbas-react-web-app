import ModulesControls from "./ModulesControls";
import { BsGripVertical } from "react-icons/bs";
import LessonControlButtons from "./LessonControlButtons";
import * as db from "../../Database";
import { useParams } from "react-router";
import React, { useState } from "react";
import { addModule, editModule, updateModule, deleteModule }
  from "./reducer";
import { useSelector, useDispatch } from "react-redux";



export default function Modules() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = () => {
    return currentUser?.role === "FACULTY";
  };
  const { cid } = useParams();

const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: any) => state.modulesReducer);

  const dispatch = useDispatch();
  const addModuleHandler = () => {
    if (isFaculty()) {
      dispatch(addModule({ name: moduleName, course: cid }));
      setModuleName("");
    }
  };
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
        {isFaculty() && (
          <ModulesControls 
            moduleName={moduleName} 
            setModuleName={setModuleName} 
            addModule={addModuleHandler} 
          />
        )}
        <br /><br /><br /><br />
        <ul id="wd-modules" className="list-group rounded-0">
        {modules
          .filter((module: any) => module.course === cid)
          .map((module: any) => (
          <li key={module._id} className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" />
              {!module.editing && module.name}
              {module.editing && isFaculty() && (
                <input
                  className="form-control w-50 d-inline-block"
                  onChange={(e) => updateModule({ ...module, name: e.target.value })}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      updateModule({ ...module, editing: false });
                    }
                  }}
                  defaultValue={module.name}
                />
              )}
              {isFaculty() && (
                <LessonControlButtons 
                  moduleId={module._id}
                  deleteModule={(moduleId) => dispatch(deleteModule(moduleId))}
                  editModule={(moduleId) => dispatch(editModule(moduleId))}
                />
              )}
            </div>
            {isFaculty() && module.lessons && (
              <ul className="wd-lessons list-group rounded-0">
                {module.lessons.map((lesson: any) => (
                  <li key={lesson._id} className="wd-lesson list-group-item p-3 ps-1">
                    <BsGripVertical className="me-2 fs-3" /> {lesson.name} <LessonControlButtons 
                      moduleId={lesson._id}
                      deleteModule={(moduleId) => dispatch(deleteModule(moduleId))}
                      editModule={(moduleId) => dispatch(editModule(moduleId))}
                    />
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
