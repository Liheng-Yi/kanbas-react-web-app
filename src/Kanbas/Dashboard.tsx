import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard(
  { courses, course, setCourse, addNewCourse,
    deleteCourse, updateCourse, enrolling, setEnrolling, updateEnrollment }: {
      courses: any[], 
      course: any, 
      setCourse: (course: any) => void, 
      addNewCourse: () => void,
      deleteCourse: (course: any) => void, 
      updateCourse: () => void, 
      enrolling: boolean, 
      setEnrolling: (enrolling: boolean) => void, 
      updateEnrollment: (courseId: string, enrolled: boolean) => Promise<void>
    }) {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const handleCourseClick = (courseId: string) => {
    navigate(`/Kanbas/Courses/${courseId}/Home`);
  };

  return (
    <div id="wd-dashboard">
      <div className="d-flex justify-content-between align-items-center">
        <h1 id="wd-dashboard-title">
          Dashboard
        </h1>
        <button onClick={() => setEnrolling(!enrolling)} className="float-end btn btn-primary" >
          {enrolling ? "My Courses" : "All Courses"}
        </button>
      </div>
      <hr />

      {(currentUser?.role === "FACULTY") && (
        <>
          <h5>New Course
            <button className="btn btn-primary float-end"
              onClick={addNewCourse}>Add</button>
            <button className="btn btn-warning float-end me-2"
              onClick={updateCourse}>Update</button>
          </h5>
          <input value={course.name} className="form-control mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })} />
          <textarea value={course.description} className="form-control"
            onChange={(e) => setCourse({ ...course, description: e.target.value })} />
          <hr />
        </>
      )}

      <h2>Published Courses ({courses.length})</h2>
      <hr />
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {courses.map((course) => (
          <div key={course._id} className="col">
            <div className="card h-100">
              <img src={`/images/1.png`} className="card-img-top"
                alt={course.name} style={{ height: "160px", objectFit: "cover" }} />
              <div className="card-body">
                <h5 className="card-title">{course.name}</h5>
                <p className="card-text" style={{
                  height: "160px",
                  overflow: "hidden",
                  textOverflow: "ellipsis"
                }}>{course.description}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <button
                    className="btn btn-primary"
                    onClick={() => handleCourseClick(course._id)}
                  >
                    View
                  </button>

                  {enrolling && (
                    <button onClick={(event) => {
                      event.preventDefault();
                      updateEnrollment(course._id, !course.enrolled);
                    }}
                      className={`btn ${course.enrolled ? "btn-danger" : "btn-success"} float-end`}
                       >
                      {course.enrolled ? "Unenroll" : "Enroll"}
                    </button>
                  )}

                  {(currentUser?.role === "FACULTY") && (
                    <div>
                      <button
                        className="btn btn-warning me-2"
                        onClick={() => setCourse(course)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteCourse(course._id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}