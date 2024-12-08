import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import { Navigate, Route, Routes, useParams, useLocation, useNavigate } from "react-router";
import { FaAlignJustify } from "react-icons/fa";
import CoursesNavigation from "./Navigation";
import People from "./People";
// import Enrollments from "./Enrollments";

export default function Courses({ courses }: { courses: any[]; }) {
  const navigate = useNavigate();
  const { cid } = useParams();
  const { pathname } = useLocation();
  const course = courses.find((course) => course._id === cid);

  const goToLab1 = () => {
    navigate('/Labs/Lab1');  
  };
  return (
    <div id="wd-courses">


      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course && course.name} &gt; {pathname.split("/")[4]}</h2> <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CoursesNavigation />
        </div>
        <div className="flex-fill">
          <Routes>
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Assignments/:aid" element={<AssignmentEditor />} />
            <Route path="People" element={<People />} />
            {/* <Route path="Enrollments" element={<Enrollments />} /> */}
          </Routes>
        </div></div>
    </div>

  );
}
