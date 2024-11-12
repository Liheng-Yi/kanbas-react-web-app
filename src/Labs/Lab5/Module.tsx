import React, { useState } from "react";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;

export default function Module() {
    const module = {
      id: "CS4550",
      name: "Web Development", 
      description: "Learn full-stack web development with React and Node.js",
      course: "Software Engineering"
    };
  
  const ASSIGNMENT_API_URL = `${REMOTE_SERVER}/lab5/assignment`

  const [moduleName, setModuleName] = useState("");
  const [moduleDescription, setModuleDescription] = useState("");

  return (
    <div id="wd-working-with-objects">
      <h3>Module</h3>
      <h4>Get Module</h4>
      <a id="wd-retrieve-module" className="btn btn-primary"
         href={`${REMOTE_SERVER}/lab5/module`}>
        Get Module
      </a><hr/>
      <h4>Get Name</h4>
      <a id="wd-retrieve-module-name" className="btn btn-primary"
         href={`${REMOTE_SERVER}/lab5/module/name`}>
        Get Name
      </a><hr/>
      <h4>Edit Module Name</h4>
      <input
        value={moduleName}
        onChange={(e) => setModuleName(e.target.value)}
        className="form-control"
      />
      <a
        id="wd-update-module-name"
        className="btn btn-primary mt-2"
        href={`${REMOTE_SERVER}/lab5/module/name/${moduleName}`}
      >
        Update Name
      </a>
      <hr/>
    </div>
);}
