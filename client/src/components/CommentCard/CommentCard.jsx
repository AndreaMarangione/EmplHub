import React, { useEffect, useState } from 'react';
import ModifyIcon from '../icons/ModifyIcon/ModifyIcon';
import DeleteIcon from '../icons/DeleteIcon/DeleteIcon';
import './commentCard.css';

const CommentCard =
  ({
    commentData,
    session,
    onChangeModify,
    onSubmitModify,
    setModifyComment,
    onClickDelete
  }) => {
    const [createdAt, setCreatedAt] = useState('');
    const [showSaveBtn, setShowSaveBtn] = useState(false);
    const [modifyLoader, setModifyLoader] = useState(false);
    const handleModifyLoader = command => setModifyLoader(command);
    const handleCreatedAt = () => {
      const date = commentData.createdAt.slice(0, 10)
        .split('-')
        .reverse()
        .join('/');
      const time = new Date(commentData.createdAt).toString().slice(16, 21);
      setCreatedAt(`${date} - ${time}`);
    }
    const handleModifyComment = () => {
      const myComment = document.querySelector(`#comment-${commentData._id}`);
      myComment.classList.remove('commentCard-body');
      myComment.classList.add('commentCard-body-modify');
      setModifyComment(myComment.value);
      setShowSaveBtn(true);
    }
    useEffect(() => {
      handleCreatedAt();
      // eslint-disable-next-line
    }, [])
    return (
      <div className='commentCard-container'>
        <div className='commentCard-header'>
          <div className='commentCard-img-container'>
            <img
              className='commentCard-img'
              src={commentData.employeeId.avatar}
              alt="employee-avatar" />
          </div>
          <div className='d-flex flex-column'>
            <strong>{`${commentData.employeeId.name} ${commentData.employeeId.surname}`}</strong>
            <span className='commentCard-header-date text-muted'>{createdAt}</span>
          </div>
          {session.id === commentData.employeeId._id ?
            <div className='d-flex align-items-center ms-auto gap-2'>
              <ModifyIcon
                tooltipActive={true}
                tooltipMessage='Modify'
                classStyle='commentCard-modify-icon'
                onClick={handleModifyComment} />
              <DeleteIcon
                tooltipActive={true}
                tooltipMessage='Delete'
                classStyle='commentCard-delete-icon'
                onClick={onClickDelete} />
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
            <button
              onClick={() => handleModifyLoader(true)}
              type='submit'>
              {modifyLoader ?
                <span className="commentCard-btnLoader"></span>
                :
                'Save'
              }
            </button>
            :
            null
          }
        </form>
      </div>
    )
  }

export default CommentCard;
