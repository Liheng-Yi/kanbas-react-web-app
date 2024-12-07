import { Routes, Route, Navigate } from "react-router";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Courses from "./Courses";
import Account from "./Account";
import * as userClient from "./Account/client";
import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
// import * as db from "./Database"; // Import the database
import "./style.css";
import ProtectedRoute from "./Account/ProtectedRoute";
import Session from "./Account/Session";
import * as courseClient from "./Courses/client";

export default function Kanbas() {
  // Initialize courses as empty array
  const [courses, setCourses] = useState<any[]>([]);
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const fetchCourses = async () => {
    try {
      const courses = await userClient.findMyCourses();
      setCourses(courses);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [currentUser]);

  // State variables and handlers moved here
  const [course, setCourse] = useState<any>({
    _id: "1234",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    description: "New Description",
  });
  const addNewCourse = async () => {
    try {
      const newCourse = await userClient.createCourse(course);
      setCourses([...courses, newCourse]);
    } catch (error) {
      console.error("Failed to create course:", error);
    }
  };
  const deleteCourse = async (courseId: string) => {
    try {
      const status = await courseClient.deleteCourse(courseId);
      if (status === 200) {
        setCourses(courses.filter((course) => course._id !== courseId));
      }
    } catch (error) {
      console.error("Failed to delete course:", error);
    }
  };
  const updateCourse = async () => {
    try {
      const status = await courseClient.updateCourse(course);
      if (status === 200) {
        setCourses(
          courses.map((c) => {
            if (c._id === course._id) {
              return course;
            }
            return c;
          })
        );
      }
    } catch (error) {
      console.error("Failed to update course:", error);
    }
  };

  return (
    <Session>
      <div id="wd-kanbas">
        <KanbasNavigation />
        <div className="wd-main-content-offset p-3">
          <Routes>
            <Route path="/" element={<Navigate to="Account" />} />
            <Route path="/Account/*" element={<Account />} />
            <Route
              path="/Dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard
                    courses={courses}
                    course={course}
                    setCourse={setCourse}
                    setCourses={setCourses}
                    addNewCourse={addNewCourse}
                    deleteCourse={deleteCourse}
                    updateCourse={updateCourse}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Courses/:cid/*"
              element={
                <ProtectedRoute>
                  <Courses courses={courses} />
                </ProtectedRoute>
              }
            />
            <Route path="/Calendar" element={<h1>Calendar</h1>} />
            <Route path="/Inbox" element={<h1>Inbox</h1>} />
          </Routes>
        </div>
      </div>
    </Session>
  );
}
