import Form from './Form';
import TodosList from './TodosList';
import FilterButtons from './FilterButtons';
import { useState, useEffect, useRef, useMemo } from 'react';
import { v4 as uuidV4 } from 'uuid';

function Content() {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem('todos')) || []
  );
  const [showState, setShowState] = useState('all');
  const inputRef = useRef(null);

  const activeTodos = useMemo(
    () => todos.filter((todo) => todo.isCompleted === false),
    [todos]
  );
  const completedTodos = useMemo(
    () => todos.filter((todo) => todo.isCompleted === true),
    [todos]
  );
  let visibleTodos =
    showState === 'all'
      ? todos
      : showState === 'active'
      ? activeTodos
      : completedTodos;

  function handleClickAddTodo(todoContent) {
    setTodos((todos) => [
      {
        id: uuidV4(),
        content: todoContent,
        isCompleted: false,
      },
      ...todos,
    ]);
  }

  function handleClickDeleteTodo(todoId) {
    setTodos(todos.filter((todo) => todo.id !== todoId));
  }

  function handleChangeCheckTodo(todoId) {
    setTodos(
      todos.map((todo) =>
        todo.id !== todoId
          ? todo
          : {
              ...todo,
              isCompleted: !todo.isCompleted,
            }
      )
    );
  }

  function handleClickClearCompleted() {
    setTodos(todos.filter((todo) => todo.isCompleted !== true));
  }

  function handleClickState(state) {
    setShowState(state);
  }

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <main className="main-content">
      <Form handleClickAddTodo={handleClickAddTodo} ref={inputRef} />
      {todos.length === 0 ? (
        <div className="empty">
          <button
            className="initialize"
            onClick={() => inputRef.current.focus()}
          >
            Add Items Todo
          </button>
        </div>
      ) : (
        <>
          <TodosList
            todos={visibleTodos}
            showState={showState}
            activeTodosLength={activeTodos.length}
            handleClickDeleteTodo={handleClickDeleteTodo}
            handleChangeCheckTodo={handleChangeCheckTodo}
            handleClickClearCompleted={handleClickClearCompleted}
            handleClickState={handleClickState}
          />
          <FilterButtons
            handleClickState={handleClickState}
            showState={showState}
          />
        </>
      )}
    </main>
  );
}

export default Content;
