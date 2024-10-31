import Modules from "../Modules";
import CourseStatus from "./Status";
import { useSelector } from "react-redux";

export default function Home() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = () => {
    return currentUser?.role === "FACULTY";
  };
  return (

<div className="d-flex" id="wd-home">
  <div className="flex-fill me-4">
    <Modules />
  </div>
  {isFaculty() && (
  <div className="d-none d-md-block ms-4">
      <CourseStatus />
    </div>
  )}
</div>


  );
}
