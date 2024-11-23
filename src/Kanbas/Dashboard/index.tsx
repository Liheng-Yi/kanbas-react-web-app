import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { enrollInCourse, unenrollFromCourse, toggleShowAllCourses, setEnrollments, setUserId, setAllCourses } from "./reducer";
import * as enrollmentsClient from "./client";
import * as courseClient from "../Courses/client";
  
export default function Dashboard(
  { courses, course, setCourse, addNewCourse,
    deleteCourse, updateCourse }: {
    courses: any[]; course: any; setCourse: (course: any) => void;
    addNewCourse: () => void; deleteCourse: (courseId: string) => void;
    updateCourse: () => void; })
{
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments, showAllCourses, enrolled, allCourses } = useSelector(
    (state: any) => state.enrollmentsReducer || { 
      enrollments: [], 
      showAllCourses: false, 
      enrolled: [], 
      allCourses: [] 
    }
  );

  const navigate = useNavigate();
  const isFaculty = () => currentUser?.role === "FACULTY";
  const isStudent = () => currentUser?.role === "STUDENT";
  const dispatch = useDispatch();
  const userId = currentUser?._id;
  const isEnrolled = (courseId: string) => {
    return enrollments.some(
      (enrollment: any) =>
        enrollment.user === currentUser?._id &&
        enrollment.course === courseId
    );
  };
  const fetchAllCourses = async () => {
    const allCourses = await courseClient.fetchAllCourses();
    dispatch(setAllCourses(allCourses));
  };
  useEffect(() => {
    fetchAllCourses();
  }, []);

  const fetchEnrollments = async () => {
    const enrollments = await enrollmentsClient.findAllEnrollments();
    dispatch(setUserId(userId));
    dispatch(setEnrollments(enrollments));
  };
  useEffect(() => {
    fetchEnrollments();
  }, []);
  // Filter courses based on enrollment status
const displayedCourses = isStudent() && !showAllCourses
  ? courses.filter(course => 
      enrolled.some((enrollment: { course: string }) => enrollment.course === course._id)
    )
  : allCourses;
  
  const handleEnrollment = async (courseId: string, isCurrentlyEnrolled: boolean) => {
  try {
    if (isCurrentlyEnrolled) {
      await enrollmentsClient.unenrollFromCourse(currentUser._id, courseId);
      dispatch(unenrollFromCourse({
        userId: currentUser._id,
        courseId
      }));
    } else {
      await enrollmentsClient.enrollInCourse(currentUser._id, courseId);
      dispatch(enrollInCourse({
        userId: currentUser._id,
        courseId
      }));
    }
    // Fetch fresh enrollment data after state changes
    await fetchEnrollments();
  } catch (error) {
    console.error("Error handling enrollment:", error);
  }
};

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">
        Dashboard
        {isStudent() && (
          <button
            className="btn btn-primary float-end"
            onClick={() => dispatch(toggleShowAllCourses())}
          >
            {showAllCourses ? "Show My Enrollments" : "Show All Courses"}
          </button>
        )}
      </h1>
      <hr />

      {isFaculty() && (
        <div>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={addNewCourse}
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={updateCourse}
              id="wd-update-course-click"
            >
              Update
            </button>
          </h5>
          <hr />
          <input
            defaultValue={course.name}
            className="form-control mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <textarea
            defaultValue={course.description}
            className="form-control"
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
          <hr />
        </div>
      )}

      <h2 id="wd-dashboard-published">
        Published Courses ({courses.length})
      </h2>
      <hr />

      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {displayedCourses.map((course: any) => (
            <div
              key={course._id}
              className="wd-dashboard-course col"
              style={{ width: "300px" }}
            >
              <div className="card rounded-3 overflow-hidden">
                <div className="position-relative">
                  <Link
                    to={`/Kanbas/Courses/${course._id}/Home`}
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                    onClick={(e) => {
                      if (isStudent() && !isEnrolled(course._id)) {
                        e.preventDefault();
                        navigate("/Kanbas/Dashboard");
                      }
                    }}
                  >
                    <img src="/images/1.png" width="100%" height={160} alt="" />
                    <div className="card-body">
                      <h5 className="wd-dashboard-course-title card-title">
                        {course.name}
                      </h5>
                      <p
                        className="wd-dashboard-course-title card-text overflow-y-hidden"
                        style={{ maxHeight: 100 }}
                      >
                        {course.description}
                      </p>
                      <div className="d-flex justify-content-between align-items-center">
                        <button className="btn btn-primary">Go</button>
                        {isFaculty() && (
                          <div>
                            <button
                              id="wd-edit-course-click"
                              onClick={(event) => {
                                event.preventDefault();
                                setCourse(course);
                              }}
                              className="btn btn-warning me-2"
                            >
                              Edit
                            </button>
                            <button
                              onClick={(event) => {
                                event.preventDefault();
                                deleteCourse(course._id);
                              }}
                              className="btn btn-danger"
                              id="wd-delete-course-click"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>

                  {isStudent() && (
                    <button
                      onClick={() => handleEnrollment(course._id, isEnrolled(course._id))}
                      className={`btn ${
                        isEnrolled(course._id)
                          ? "btn-danger"
                          : "btn-success"
                      } float-end me-2 mt-2 position-absolute top-0 end-0`}
                    >
                      {isEnrolled(course._id) ? "Unenroll" : "Enroll"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}