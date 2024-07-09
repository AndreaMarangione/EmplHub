import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { login } from '../redux/sessionSlice';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useSession from '../Hooks/useSession';
import MainLayout from '../Layout/MainLayout';
import AxiosApi from '../class/axiosApi';
import CloseIcon from '../components/icons/CloseIcon/CloseIcon';
import SingleSelect from '../components/SingleSelect/SingleSelect';
import MultiSelect from '../components/MultiSelect/MultiSelect';
import CommentCard from '../components/CommentCard/CommentCard';
import MyToast from '../components/Toast/Toast';
import './css/commentTask.css';

const CommentTask = () => {
    const [params] = useSearchParams();
    const id = params.get("id");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { session } = useSession();
    const api = new AxiosApi();
    const [form, setForm] = useState({});
    const [taskComments, setTaskComments] = useState([]);
    const [taskSingleComment, setTaskSingleComment] = useState({});
    const [modifyComment, setModifyComment] = useState('');
    const [defaultTitle, setDefaultTitle] = useState('');
    const [defaultDescription, setDefaultDescription] = useState('');
    const [defaultCustomer, setDefaultCustomer] = useState(undefined);
    const [defaultEmployees, setDefaultEmployees] = useState([]);
    const [defaultPriority, setDefaultPriority] = useState(undefined);
    const [defaultAmount, setDefaultAmount] = useState({});
    const [commentLoader, setCommentLoader] = useState(false);
    const [singleCommentLoader, setSingleCommentLoader] = useState(false);
    const [deleteCommentLoader, setDeleteCommentLoader] = useState(false);
    const [sendLoader, setSendLoader] = useState(false);
    const [startDateValue, setStartDateValue] = useState(null);
    const [endDateValue, setEndDateValue] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const handleCommentLoader = command => setCommentLoader(command);
    const handleSingleCommentLoader = command => setSingleCommentLoader(command);
    const handleSendLoader = command => setSendLoader(command);
    const handleDeleteLoader = command => setDeleteCommentLoader(command);
    const handleModifyComment = e => setModifyComment(e.target.value);
    const navigateToTasks = () => navigate('/tasks');
    const handleHideToast = () => setShowToast(false);
    const handleShowToast = (id) => {
        handleSingleCommentLoader(true);
        setShowToast(!showToast);
        getSingleComment(id);
    };
    const handleFormInput = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const getTask = async () => {
        handleCommentLoader(true);
        try {
            const response = await api.get(`/task/${id}`);
            if (response.statusText) {
                const startYear = response.data.start.slice(6, 10);
                const startMonth = response.data.start.slice(3, 5);
                const startDay = response.data.start.slice(0, 2);
                setStartDateValue(`${startMonth}/${startDay}/${startYear}`);
                const endYear = response.data.end.slice(6, 10);
                const endMonth = response.data.end.slice(3, 5);
                const endDay = response.data.end.slice(0, 2);
                setEndDateValue(`${endMonth}/${endDay}/${endYear}`);
                setDefaultCustomer({
                    value: response.data.customerId._id,
                    label: response.data.customerId.name
                })
                setDefaultEmployees(
                    response.data.employeeId.map(employee => {
                        return {
                            value: employee._id,
                            label: `${employee.name} ${employee.surname}`
                        }
                    }))
                setDefaultPriority({
                    value: response.data.priority,
                    label: response.data.priority
                })
                setDefaultAmount({
                    total: response.data.amount.total,
                    invoiced: response.data.amount.invoice,
                    residual: response.data.amount.total - response.data.amount.invoice
                });
                setDefaultTitle(response.data.title);
                setDefaultDescription(response.data.description);
                setTaskComments(response.data.comments.reverse());
            }
        } catch (error) {
            console.error(error.response);
        } finally {
            handleCommentLoader(false);
        }
    }
    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        handleSendLoader(true);
        const body = {
            ...form,
            taskId: id
        }
        try {
            await api.post('task/comment/create', body);
        } catch (error) {
            console.error(error.response);
        } finally {
            handleSendLoader(false);
            setRefresh(!refresh);
        }
    }
    const patchModifyComment = async (e, id) => {
        e.preventDefault();
        const body = { comment: modifyComment }
        try {
            await api.patch(`/task/comment/modify/${id}`, body);
        } catch (error) {
            console.error(error.response);
        } finally {
            setRefresh(!refresh);
        }
    }
    const getSingleComment = async (id) => {
        try {
            const response = await api.get(`/task/comment/${id}`);
            if (response.statusText) {
                setTaskSingleComment(response.data);
            }
        } catch (error) {
            console.error(error.response);
        } finally {
            handleSingleCommentLoader(false);
        }
    }
    const deleteSingleComment = async (id) => {
        handleDeleteLoader(true);
        try {
            await api.delete(`/task/comment/delete/${id}`);
        } catch (error) {
            console.error(error.response);
        } finally {
            handleDeleteLoader(false);
            handleHideToast();
            setRefresh(!refresh);
        }
    }
    useEffect(() => {
        if (session) {
            dispatch(login(session));
        }
        getTask();
        // eslint-disable-next-line
    }, [refresh]);
    return (
        <MainLayout childrens={
            <div className='pt-1 px-md-5'>
                <div className="row position-relative">
                    <div className="col-12 d-flex justify-content-end">
                        <CloseIcon
                            onClick={navigateToTasks}
                            classStyle='comment-task-close'
                        />
                    </div>
                    {commentLoader ?
                        <div>
                            <span className="comment-task-loader"></span>
                        </div>
                        :
                        <>
                            <div className="col-12 col-md-6">
                                <div className='comment-task-details-container'>
                                    <h3 className='comment-task-title mb-2'>Task Details</h3>
                                    <div className='d-flex flex-column gap-2'>
                                        <div className='d-flex flex-column justify-content-center gap-1'>
                                            <label className='text-muted'>Title</label>
                                            <input
                                                defaultValue={defaultTitle}
                                                className='comment-task-input'
                                                type="text"
                                                name='title'
                                                disabled />
                                        </div>
                                        <div className='w-100 d-flex flex-column justify-content-center align-self-start gap-1'>
                                            <label className='text-muted'>Customer</label>
                                            <SingleSelect
                                                classStyle='comment-task-input'
                                                isClearable={false}
                                                isDisabled={true}
                                                isSearchable={false}
                                                value={defaultCustomer}
                                            />
                                        </div>
                                        <div className='w-100 d-flex flex-column justify-content-center gap-1'>
                                            <label className='text-muted'>Employee</label>
                                            <MultiSelect
                                                classStyle='comment-task-multi'
                                                isClearable={false}
                                                isDisabled={true}
                                                isSearchable={false}
                                                value={defaultEmployees}
                                            />
                                        </div>
                                        <div className='w-100 d-flex flex-column justify-content-center gap-1'>
                                            <label className='text-muted'>Priority</label>
                                            <SingleSelect
                                                classStyle='comment-task-input'
                                                isClearable={false}
                                                isDisabled={true}
                                                value={defaultPriority}
                                            />
                                        </div>
                                        <div className='w-100 d-flex flex-column flex-lg-row justify-content-between gap-3'>
                                            <div className='w-100 d-flex flex-column justify-content-center gap-1'>
                                                <label className='text-muted'>Start</label>
                                                <input
                                                    className='comment-task-input'
                                                    defaultValue={startDateValue}
                                                    type="text"
                                                    disabled
                                                />
                                            </div>
                                            <div className='w-100 d-flex flex-column justify-content-center gap-1'>
                                                <label className='text-muted'>End</label>
                                                <input
                                                    className='comment-task-input'
                                                    defaultValue={endDateValue}
                                                    type="text"
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                        <div className='w-100 d-flex flex-column justify-content-center gap-1'>
                                            <label className='text-muted'>Total contract</label>
                                            <div className='position-relative'>
                                                <span className='comment-task-amount-icon text-muted'>€</span>
                                                <input
                                                    defaultValue={defaultAmount.total}
                                                    className='comment-task-input ps-4 w-100'
                                                    type="text"
                                                    name='amount'
                                                    step='0.01'
                                                    min='0'
                                                    disabled />
                                            </div>
                                        </div>
                                        <div className='w-100 d-flex flex-column justify-content-center gap-1'>
                                            <label className='text-muted'>Invoiced</label>
                                            <div className='position-relative'>
                                                <span className='comment-task-amount-icon text-muted'>€</span>
                                                <input
                                                    defaultValue={defaultAmount.invoiced}
                                                    className='comment-task-input ps-4 w-100'
                                                    type="text"
                                                    name='amount'
                                                    step='0.01'
                                                    min='0'
                                                    disabled />
                                            </div>
                                        </div>
                                        <div className='w-100 d-flex flex-column justify-content-center gap-1'>
                                            <label className='text-muted'>Residual</label>
                                            <div className='position-relative'>
                                                <span className='comment-task-amount-icon text-muted'>€</span>
                                                <input
                                                    defaultValue={defaultAmount.residual}
                                                    className='comment-task-input ps-4 w-100'
                                                    type="text"
                                                    name='amount'
                                                    step='0.01'
                                                    min='0'
                                                    disabled />
                                            </div>
                                        </div>
                                        <div className='d-flex flex-column justify-content-center gap-1'>
                                            <label className='text-muted'>Description</label>
                                            <textarea
                                                defaultValue={defaultDescription}
                                                className='comment-task-text'
                                                type="text"
                                                name='description'
                                                disabled />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="comment-task-comment-container col-12 col-md-6 pt-3 mt-3 pt-md-0 mt-md-0">
                                <div>
                                    <h3 className='comment-task-title mb-2'>Comments</h3>
                                    <form
                                        onSubmit={handleCommentSubmit}
                                        className='d-flex flex-column justify-content-center gap-1'>
                                        <div className='d-flex flex-column justify-content-center gap-1'>
                                            <label className='text-muted'>Write your comment</label>
                                            <textarea
                                                onChange={handleFormInput}
                                                className='comment-task-comment'
                                                type="text"
                                                name='comment'
                                                required />
                                        </div>
                                        <button
                                            className='comment-task-btn'
                                            type='submit'>
                                            {sendLoader ?
                                                <span className="comment-task-btn-loader"></span>
                                                :
                                                'Send'
                                            }
                                        </button>
                                    </form>
                                </div>
                                {taskComments.length <= 0 ?
                                    <div className='mt-5 text-center'>
                                        <p>There are no comments yet...</p>
                                    </div>
                                    :
                                    taskComments.map((comment, index) =>
                                        <CommentCard
                                            key={index}
                                            commentData={comment}
                                            session={session}
                                            onSubmitModify={patchModifyComment}
                                            onChangeModify={handleModifyComment}
                                            setModifyComment={setModifyComment}
                                            onClickDelete={() => handleShowToast(comment._id)} />
                                    )
                                }
                            </div>
                        </>
                    }
                    <MyToast
                        show={showToast}
                        handleShow={handleHideToast}
                        imgShow={false}
                        classStyle='myToast-comment-style z-3'
                        body={singleCommentLoader ?
                            <div className='d-flex justify-content-center'>
                                <span className="single-comment-loader"></span>
                            </div>
                            :
                            <div className='d-flex flex-column gap-2'>
                                <strong className='m-0'>Are you sure you want delete this comment?</strong>
                                <div className='d-flex gap-1'>
                                    <span>{taskSingleComment.comment}</span>
                                </div>
                                <div className='d-flex gap-2'>
                                    <button
                                        onClick={handleHideToast}
                                        className='myToast-comment-btn-cancel'>
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => deleteSingleComment(taskSingleComment._id)}
                                        className='myToast-comment-btn-delete'>
                                        {deleteCommentLoader ?
                                            <span className="delete-comment-loader"></span>
                                            :
                                            'Delete'
                                        }
                                    </button>
                                </div>
                            </div>
                        }
                    />
                </div>
            </div>
        } />
    )
}

export default CommentTask;
