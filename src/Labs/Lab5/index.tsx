import EnvironmentVariables from "./EnvironmentVariables";
import PathParameters from "./PathParameters";
import QueryParameters from "./QueryParameters";
import WorkingWithObjects from "./workingWithObjects";
import WorkingWithArrays from "./workingWithArrays";
import HttpClient from "./HttpClient";
import WorkingWithObjectsAsynchronously from "./WorkingWithObjectsAsynchronously";
import WorkingWithArraysAsynchronously from "./WorkingWithArraysAsynchronously";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export default function Lab5() {
  return (
    <div id="wd-lab5">
      <h2>Lab 5</h2>
      <div className="list-group">
        <a href={`${REMOTE_SERVER}/lab5/welcome`} className="list-group-item">
          Welcome
        </a>
      </div>
      <EnvironmentVariables />
      <hr />
      <PathParameters />
      <hr />
      <QueryParameters />
      <hr />
      <WorkingWithObjects />
      <hr />
      <WorkingWithArrays />
      <hr />
      <HttpClient />
      <hr />
      <br />
      <br />
      <br />
      <WorkingWithObjectsAsynchronously />
      <hr />
      <WorkingWithArraysAsynchronously />
      <hr />
      <hr />
    </div>
  );
}
