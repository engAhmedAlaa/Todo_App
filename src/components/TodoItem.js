import { useState } from 'react';
import checkIcon from '../assets/check.svg';
import crossIcon from '../assets/cross.svg';
import { CiEdit } from 'react-icons/ci';
import { BsHandThumbsUp } from 'react-icons/bs';

function TodoItem({ todo, dispatch }) {
  const { id, content, isCompleted } = todo;
  const [editedContent, setEditedContent] = useState(content);
  const [isEditing, setIsEditing] = useState(false);

  function handleCheckTodo() {
    dispatch({ type: 'check_todo', todoId: id });
  }

  function handleSaveTodo() {
    dispatch({ type: 'save_todo', todoId: id, editedContent });
  }

  function handleDeleteTodo() {
    dispatch({ type: 'delete_todo', todoId: id });
  }

  return (
    <li className={`todo-item ${isCompleted ? 'completed' : ''}`}>
      <label className="check-icon">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={handleCheckTodo}
        />
        {isCompleted && <img src={checkIcon} alt="Check Icon" />}
      </label>
      {isEditing ? (
        <input
          type="text"
          className="edit-inp"
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          autoFocus
        />
      ) : (
        <span className="content" onDoubleClick={handleCheckTodo}>
          {content}
        </span>
      )}
      <div className="btns">
        {isEditing ? (
          <button
            className="save-btn"
            onClick={() => {
              setIsEditing(false);
              handleSaveTodo();
            }}
            aria-label="Save todo"
          >
            <BsHandThumbsUp />
          </button>
        ) : (
          <button
            className="edit-btn"
            onClick={() => setIsEditing(true)}
            aria-label="Edit todo"
          >
            <CiEdit />
          </button>
        )}
        <button
          className="delete-btn"
          aria-label="Delete todo"
          onClick={handleDeleteTodo}
        >
          <img src={crossIcon} alt="Cross Icon" />
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
