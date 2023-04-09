import { useState, useRef, forwardRef } from 'react';
import { BsPlus } from 'react-icons/bs';

const Form = forwardRef(function Form({ handleClickAddTodo }, ref) {
  const [todoContent, setTodoContent] = useState('');
  const btnRef = useRef(null);

  function handleChange(event) {
    setTodoContent(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    handleClickAddTodo(todoContent);
    setTodoContent('');
    ref.current.focus();
  }

  return (
    <form className="main-form" onSubmit={handleSubmit}>
      <button
        className={`add-btn ${todoContent === '' ? '' : 'active'}`}
        aria-label="Add new todo"
        ref={btnRef}
      >
        {todoContent !== '' && <BsPlus />}
      </button>
      <input
        type="text"
        value={todoContent}
        onChange={handleChange}
        onFocus={() => btnRef.current.classList.add('focus')}
        onBlur={() => btnRef.current.classList.remove('focus')}
        ref={ref}
        placeholder="Create a new todo..."
        required
        autoFocus
      />
    </form>
  );
});

export default Form;
