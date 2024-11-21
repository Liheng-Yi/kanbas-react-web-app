import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { BsGripVertical, BsPlus, BsChevronExpand } from 'react-icons/bs';
import { IoEllipsisVertical } from 'react-icons/io5';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { setAssignment, deleteAssignment } from './reducer';
import * as assignmentsClient from "./client";

interface Assignment {
    _id: string;
    title: string;
    description: string;
    points: number;
    dueDate: string;
    availableFromDate: string;
    course: string;
    module: string;
}

const Assignments = () => {
    const { cid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const { assignments } = useSelector((state: any) => state.assignmentsReducer);
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [assignmentToDelete, setAssignmentToDelete] = useState<Assignment | null>(null);
    
    const courseAssignments = assignments.filter(
        (assignment: Assignment) => assignment.course === cid
    );

    const isFaculty = () => currentUser?.role === "FACULTY";
    const fetchAssignments = async () => {
        const assignments = await assignmentsClient.findAssignmentsForCourse(cid as string);
        dispatch(setAssignment(assignments));
        console.log("Assignments fetched:", assignments);
    };

    useEffect(() => {
        fetchAssignments();
    }, [cid]);

    const removeAssignment = async (assignmentId: string) => {
        await assignmentsClient.removeAssignment(assignmentId);
        dispatch(deleteAssignment(assignmentId));

    };

    useEffect(() => {
        // Add modal-open class to body when modal is shown
        if (showDeleteModal) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }

        // Cleanup on unmount
        return () => {
            document.body.classList.remove('modal-open');
        };
    }, [showDeleteModal]);

    const handleDeleteClick = (e: React.MouseEvent, assignment: Assignment) => {
        e.stopPropagation();
        console.log("Delete clicked for assignment:", assignment);
        setAssignmentToDelete(assignment);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        try {
            if (assignmentToDelete) {
                await removeAssignment(assignmentToDelete._id);
                setShowDeleteModal(false);
                setAssignmentToDelete(null);
            }
        } catch (error) {
            console.error('Error deleting assignment:', error);
        }
    };

    const handleCancelDelete = () => {
        setShowDeleteModal(false);
        setAssignmentToDelete(null);
    };

    const handleAddAssignment = () => {
        navigate(`/Kanbas/Courses/${cid}/Assignments/new`);
    };

    const handleEditAssignment = (e: React.MouseEvent, assignmentId: string) => {
        e.stopPropagation();
        navigate(`/Kanbas/Courses/${cid}/Assignments/${assignmentId}`);
    };

    return (
        <>
            <div className="container mt-3">
                <div className="d-flex mb-3">
                    <input 
                        type="text" 
                        className="form-control me-5" 
                        placeholder="🔍 Search..." 
                        style={{ maxWidth: "230px" }} 
                    />
                    {isFaculty() && (   
                        <>
                            <button className="btn btn-light me-2">+ Group</button>
                            <button 
                                className="btn btn-danger" 
                                onClick={handleAddAssignment}
                            >
                                + Assignment
                            </button>
                        </>
                    )}
                </div>
                
                <ul className="list-group rounded-0">
                    <div className="p-3 ps-2" style={{ backgroundColor: '#f0f0f0' }}>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                                <BsGripVertical className="fs-3 me-2" />
                                <BsChevronExpand className="me-2" />
                                <h3 className="mb-0">ASSIGNMENTS</h3>
                            </div>
                            <div>
                                <span className="me-1" style={{ fontSize: "1.2rem" }}>
                                    40% of Total
                                </span>
                                <BsPlus className="fs-4 me-2" />
                                <IoEllipsisVertical className="fs-4" />
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        {courseAssignments.map((assignment: Assignment) => (
                            <li 
                                key={assignment._id} 
                                className="list-group-item d-flex align-items-center"
                            >
                                <BsGripVertical className="me-2 fs-3" />
                                {isFaculty() && (
                                    <FaEdit 
                                        size={30} 
                                        color="green" 
                                        className="me-3 cursor-pointer"
                                        onClick={(e) => handleEditAssignment(e, assignment._id)}
                                    />
                                )}
                                <div 
                                    className="flex-grow-1"
                                    onClick={() => navigate(`/Kanbas/Courses/${cid}/Assignments/${assignment._id}`)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span>{assignment.title}</span>
                                    </div>
                                    <p className="mb-0">
                                        <span className="text-danger">{assignment.module}</span>
                                        {' | '}
                                        <strong>Not available Until</strong>
                                        {' | '}
                                        <span>{assignment.availableFromDate || 'Not set'}</span>
                                        <br/>
                                        <span>
                                            Due {assignment.dueDate || 'Not set'} | {assignment.points} pts
                                        </span>
                                    </p>
                                </div>
                                {isFaculty() && (
                                    <button 
                                        className="btn text-danger border-0"
                                        onClick={(e) => removeAssignment(assignment._id)}
                                    >
                                        <FaTrash size={20} />
                                    </button>
                                )}
                            </li>
                        ))}
                    </div>
                </ul>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <>
                    <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <div className="modal-dialog" style={{ zIndex: 1056 }}>
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Delete Assignment</h5>
                                    <button 
                                        type="button" 
                                        className="btn-close" 
                                        onClick={handleCancelDelete}
                                    />
                                </div>
                                <div className="modal-body">
                                    Are you sure you want to delete "{assignmentToDelete?.title}"? 
                                    This action cannot be undone.
                                </div>
                                <div className="modal-footer">
                                    <button 
                                        type="button" 
                                        className="btn btn-secondary" 
                                        
                                        onClick={handleCancelDelete}
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="button" 
                                        className="btn btn-danger" 
                                        onClick={handleConfirmDelete}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Assignments;