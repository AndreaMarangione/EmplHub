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
      <div className="card">
        <div className="card-block comment-card-block comment-card w-100">
          {session.id === commentData.employeeId._id ?
            <div className='d-flex align-items-center justify-content-end ms-auto gap-2'>
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
          <div className="row">
            <div className="col-auto d-flex align-items-center gap-3">
              <div className='task-img-container'>
                <img
                  className='commentCard-img'
                  src={commentData.employeeId.avatar}
                  alt="employee-avatar" />
              </div>
              <div className="">
                <h5 className='m-0'>
                  {`${commentData.employeeId.name} ${commentData.employeeId.surname}`}
                </h5>
                <span className='commentCard-header-date text-muted'>{createdAt}</span>
              </div>
            </div>
          </div>
        </div>
        <ul className="task-list-comment">
          <li>
            <i className="task-icon" />
            <form
              onSubmit={(e) => {
                handleModifyLoader(true);
                onSubmitModify(e, commentData._id);
              }}
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
                  className='text-muted'
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
          </li>
        </ul>
      </div>
    )
  }

export default CommentCard;
