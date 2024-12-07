import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  toggleShowAllCourses,
  enrollInCourse,
  unenrollFromCourse,
  setEnrollments,
} from "./Courses/Enrollments/reducer";
import * as enrollmentsClient from "./Courses/Enrollments/clients";

export default function Dashboard({
  courses,
  course,
  setCourse,
  setCourses,
  addNewCourse,
  deleteCourse,
  updateCourse,
}: {
  courses: any[];
  course: any;
  setCourse: (course: any) => void;
  setCourses: (courses: any[]) => void;
  addNewCourse: () => void;
  deleteCourse: (courseId: string) => void;
  updateCourse: () => void;
}) {
  const dispatch = useDispatch();
  const currentUser = useSelector(
    (state: any) => state.accountReducer.currentUser
  ) || { role: "STUDENT", _id: "1" };
  const { enrollments, showAllCourses } = useSelector(
    (state: any) => state.enrollmentsReducer
  );

  // Replace your current displayedCourses with this:
  const displayedCourses = React.useMemo(() => {
    console.log("Dashboard - Computing displayed courses:", {
      userRole: currentUser?.role,
      userId: currentUser?._id, // Add this to debug
      showAllCourses,
      totalCourses: courses.length,
      totalEnrollments: enrollments.length,
      enrollments: enrollments, // Add this to see actual enrollment data
    });

    // Always show all courses for faculty
    if (currentUser?.role === "FACULTY") {
      console.log("Dashboard - Faculty view: returning all courses");
      return courses;
    }

    // For students, check showAllCourses flag
    if (showAllCourses) {
      console.log("Dashboard - Student view: showing all available courses");
      return courses;
    } else {
      // Only show enrolled courses
      console.log(
        "Dashboard - Student view: filtering for enrolled courses only"
      );
      const enrolledCourseIds = enrollments
        .filter(
          (e: { user: string; course: string }) => e.user === currentUser._id
        )
        .map((e: { course: string }) => e.course);
      console.log(
        "Dashboard - Student's enrolled course IDs:",
        enrolledCourseIds
      );

      return courses.filter((course) => enrolledCourseIds.includes(course._id));
    }
  }, [courses, showAllCourses, enrollments, currentUser]);

  // Check if user is enrolled in a specific course
  const isEnrolled = (courseId: string) => {
    return enrollments.some(
      (enrollment: any) =>
        enrollment.user === currentUser._id && enrollment.course === courseId
    );
  };

  // Add useEffect to fetch enrollments
  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        console.log("Dashboard - Fetching enrollments");
        const allEnrollments = await enrollmentsClient.findAllEnrollments();
        console.log("Dashboard - Enrollments fetched:", allEnrollments);
        dispatch(setEnrollments(allEnrollments));
      } catch (error) {
        console.error("Error fetching enrollments:", error);
      }
    };
    fetchEnrollments();
  }, [dispatch]);

  // Update handleEnrollmentToggle
  const handleEnrollmentToggle = async (
    courseId: string,
    event: React.MouseEvent
  ) => {
    event.preventDefault();
    try {
      if (isEnrolled(courseId)) {
        console.log("Dashboard - Starting unenroll for course:", courseId);
        await enrollmentsClient.unenrollFromCourse(currentUser._id, courseId);
        console.log("Dashboard - Successfully unenrolled from server");
        dispatch(unenrollFromCourse({ userId: currentUser._id, courseId }));
        console.log("Dashboard - Unenrollment dispatched");
      } else {
        console.log("Dashboard - Starting enroll for course:", courseId);
        const enrollment = await enrollmentsClient.enrollInCourse(
          currentUser._id,
          courseId
        );
        console.log("Dashboard - Enrollment received from server:", enrollment);
        dispatch(enrollInCourse(enrollment));
        console.log("Dashboard - Enrollment dispatched");
      }
    } catch (error) {
      console.error("Error toggling enrollment:", error);
    }
  };

  return (
    <div id="wd-dashboard">
      <div className="d-flex justify-content-between align-items-center">
        <h1 id="wd-dashboard-title">Dashboard</h1>
        {currentUser?.role === "STUDENT" && (
          <button
            className="btn btn-primary"
            onClick={() => dispatch(toggleShowAllCourses())}
          >
            {showAllCourses ? "Show My Courses" : "Enrollments"}
          </button>
        )}
      </div>
      <hr />
      {currentUser?.role === "FACULTY" && (
        <>
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
            >
              Update
            </button>
          </h5>
          <br />
          <input
            value={course.name}
            className="form-control mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <textarea
            value={course.description}
            className="form-control"
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
          <hr />
        </>
      )}
      <h2 id="wd-dashboard-published">
        Published Courses ({displayedCourses.length})
      </h2>{" "}
      <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {displayedCourses.map((course) => (
            <div
              className="wd-dashboard-course col"
              style={{ width: "300px" }}
              key={course._id}
            >
              <div className="card rounded-3 overflow-hidden">
                <Link
                  to={
                    currentUser?.role === "FACULTY" || isEnrolled(course._id)
                      ? `/Kanbas/Courses/${course._id}/Home`
                      : "#"
                  }
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                  onClick={(e) => {
                    if (
                      !(
                        currentUser?.role === "FACULTY" ||
                        isEnrolled(course._id)
                      )
                    ) {
                      e.preventDefault();
                    }
                  }}
                >
                  <img
                    src="/images/reactjs.jpg"
                    width="100%"
                    height={160}
                    alt={course.name}
                  />
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

                    {currentUser?.role === "FACULTY" ? (
                      <>
                        <button className="btn btn-primary">Go</button>
                        <button
                          onClick={async (event) => {
                            event.preventDefault();
                            try {
                              await deleteCourse(course._id);
                              const updatedCourses = courses.filter(
                                (c) => c._id !== course._id
                              );
                              setCourses(updatedCourses);
                            } catch (error) {
                              console.error("Error deleting course:", error);
                            }
                          }}
                          className="btn btn-danger float-end"
                          id="wd-delete-course-click"
                        >
                          Delete
                        </button>
                        <button
                          id="wd-edit-course-click"
                          onClick={(event) => {
                            event.preventDefault();
                            setCourse(course);
                          }}
                          className="btn btn-warning me-2 float-end"
                        >
                          Edit
                        </button>
                      </>
                    ) : (
                      <>
                        {isEnrolled(course._id) && (
                          <button className="btn btn-primary">Go</button>
                        )}
                        <button
                          className={`btn ${
                            isEnrolled(course._id)
                              ? "btn-danger"
                              : "btn-success"
                          } float-end`}
                          onClick={(e) => handleEnrollmentToggle(course._id, e)}
                        >
                          {isEnrolled(course._id) ? "Unenroll" : "Enroll"}
                        </button>
                      </>
                    )}
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
