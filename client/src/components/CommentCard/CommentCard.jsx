import React, { useEffect, useState } from 'react';
import AxiosApi from '../../class/axiosApi';
import ModifyIcon from '../icons/ModifyIcon/ModifyIcon';
import DeleteIcon from '../icons/DeleteIcon/DeleteIcon';
import './commentCard.css';

const CommentCard =
  ({
    commentData,
    session,
    onChangeModify,
    onSubmitModify,
    setModifyComment
  }) => {
    const api = new AxiosApi();
    const [employee, setEmployee] = useState({});
    const [createdAt, setCreatedAt] = useState('');
    const [showSaveBtn, setShowSaveBtn] = useState(false);
    const handleCreatedAt = () => {
      const date = commentData.createdAt.slice(0, 10)
        .split('-')
        .reverse()
        .join('/');
      setCreatedAt(date);
    }
    const getEmployee = async () => {
      try {
        const response = await api.get(`/employee/${commentData.employeeId}`);
        if (response.statusText) {
          setEmployee({
            avatar: response.data.avatar,
            name: response.data.name,
            surname: response.data.surname
          })
        }
      } catch (error) {
        console.error(error.response);
      }
    }
    const handleModifyComment = () => {
      const myComment = document.querySelector(`#comment-${commentData._id}`);
      myComment.classList.remove('commentCard-body');
      myComment.classList.add('commentCard-body-modify');
      setModifyComment(myComment.value);
      setShowSaveBtn(true);
    }
    useEffect(() => {
      getEmployee();
      handleCreatedAt();
      // eslint-disable-next-line
    }, [])
    return (
      <div className='commentCard-container'>
        <div className='commentCard-header'>
          <div className='commentCard-img-container'>
            <img
              className='commentCard-img'
              src={employee.avatar}
              alt="employee-avatar" />
          </div>
          <span>{createdAt}</span>
          {session.id === commentData.employeeId ?
            <div className='d-flex align-items-center ms-auto gap-2'>
              <ModifyIcon
                tooltipActive={true}
                tooltipMessage='Modify'
                classStyle='commentCard-modify-icon'
                onClick={handleModifyComment} />
              <DeleteIcon
                tooltipActive={true}
                tooltipMessage='Delete'
                classStyle='commentCard-delete-icon' />
            </div>
            :
            null
          }
        </div>
        <form
          onSubmit={onSubmitModify}
          className='commentCard-body-container'>
          <textarea
            onChange={onChangeModify}
            id={`comment-${commentData._id}`}
            className='commentCard-body'
            defaultValue={commentData.comment}
            type="text"
            name='comment'
            required />
          {showSaveBtn ?
            <button type='submit'>
              Save
            </button>
            :
            null
          }
        </form>
      </div>
    )
  }

export default CommentCard;
