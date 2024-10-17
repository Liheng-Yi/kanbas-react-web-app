import { BsGripVertical, BsPlus } from "react-icons/bs";
import LessonControlButtons from "../Modules/LessonControlButtons";
import "./style.css"
import { IoEllipsisVertical } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { BsChevronExpand } from "react-icons/bs";
import { Assignment, assignments } from "../../Database";
import { useParams } from "react-router";

export default function Assignments() {
    const { cid } = useParams();
    const courseAssignments = assignments.filter((assignment: Assignment) => assignment.course === cid);

    return (
        <div id="wd-assignments" className="container mt-3">
            <div className="d-flex mb-3">
                <input type="text" id="wd-search-assignment" className="form-control me-5" placeholder="🔍 Search..." aria-label="Search for Assignments" aria-describedby="button-addon2" style={{ maxWidth: "230px" }} />
                <button className="btn btn-light me-2">+ Group</button>
                <button className="btn btn-danger">+ Assignment</button>
            </div>
            <ul className="list-group rounded-0">
                <div className="wd-title p-3 ps-2" style={{ backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div className="d-flex align-items-center mb-3">
                        <BsGripVertical className="fs-3 me-2" />
                        <BsChevronExpand className="me-2" />
                        <h3 id="wd-assignments-title">ASSIGNMENTS</h3>
                    </div>
                    <div>
                        <span className="circle-percent me-1" style={{ fontSize: "1.2rem", backgroundColor: "#f0f0f0" }}>40% of Total</span>
                        <BsPlus className="fs-4 me-2" />
                        <IoEllipsisVertical className="fs-4" />
                    </div>
                </div>
                <div className="list-item-border">
                    {courseAssignments.map((assignment: Assignment) => (
                        <li key={assignment._id} className="list-group-item d-flex align-items-center">
                            <BsGripVertical className="me-2 fs-3" />
                            <FaEdit size={30} color="green" className="me-3"/>
                            <div className="flex-grow-1">
                                <a className="wd-assignment-link stretched-link" href={`#/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}>
                                    {assignment.title}
                                </a>
                                <p>
                                    <span style={{ color: 'red' }}>{assignment.module}</span> |
                                    <span style={{ fontWeight: 'bold' }}>Not available Until</span> |
                                    <span>{assignment.availableFromDate}</span> |
                                    <br/>
                                    <span>Due {assignment.dueDate} | {assignment.points} pts</span>
                                </p>
                            </div>
                            <LessonControlButtons />
                        </li>
                    ))}
                </div>
            </ul>
        </div>
    );
}
