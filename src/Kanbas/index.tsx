import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import Courses from "./Courses";
import { Link } from "react-router-dom";
import TOC from "../Labs/TOC";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import * as db from "./Database";
import * as courseClient from "./Courses/client";
import * as userClient from "./Account/client";
import { useEffect, useState } from "react";
import store from "./store";
import { Provider, useSelector } from "react-redux";
import ProtectedRoute from "./Account/ProtectedRoute";

export default function Kanbas() {
    const { currentUser } = useSelector((state: any) => state.accountReducer);


    const isFaculty = () => {
    return currentUser?.role === "FACULTY";
  };
  const navigate = useNavigate();  
  const goToLab1 = () => {
    navigate('/Labs/Lab1');  
  };
  //courses
  const [courses, setCourses] = useState<any[]>([]);
  const fetchCourses = async () => {
    let courses = [];
    try {
      courses = await userClient.findMyCourses();
    } catch (error) {
      console.error(error);
    }
    setCourses(courses);
  };
  useEffect(() => {
    fetchCourses();
  }, [currentUser]);

  const [course, setCourse] = useState<any>({
    _id: "1234", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15", description: "New Description",
  });
  const addNewCourse = async () => {
    const newCourse = await userClient.createCourse(course);
    setCourses([...courses, newCourse]);
  };
  const deleteCourse = async (courseId: any) => {
    const status = await courseClient.deleteCourse(courseId);
    setCourses(courses.filter((course) => course._id !== courseId));
  };
  const updateCourse = async () => {
    await courseClient.updateCourse(course);
    setCourses(
      courses.map((c) => {
        if (c._id === course._id) {
          return course;
        } else {
          return c;
        }
      })
    );
  };

  const findAllCourses = async () => {
    const courses = await courseClient.fetchAllCourses();
    setCourses(courses);
  };

  useEffect(() => {
    findAllCourses();
  }, []);

  return (
    <Provider store={store}>
      <div id="wd-kanbas">
        <button onClick={() => goToLab1()} className="wd-main-content-offset ms-5 btn btn-secondary">
          Go back to Landing page
        </button>
        <KanbasNavigation />
        <div className="wd-main-content-offset p-3">
          <Routes>
            <Route path="/" element={<Navigate to="/Kanbas/Dashboard" />} />
            <Route path="/Account/*" element={<Account />} />
            <Route path="Dashboard" element={ <ProtectedRoute>
            console.log(courses)
              <Dashboard
                courses={courses}
                course={course}
                setCourse={setCourse}
                addNewCourse={addNewCourse}
                deleteCourse={deleteCourse}
                updateCourse={updateCourse}/>
            </ProtectedRoute>} />
            <Route path="/Courses/:cid/*" element={<ProtectedRoute><Courses courses={courses} /></ProtectedRoute>} />
            <Route path="/Calendar" element={<h1>Calendar</h1>} />
            <Route path="/Inbox" element={<h1>Inbox</h1>} />
          </Routes>
        </div>
      </div>
    </Provider>
  );
}
