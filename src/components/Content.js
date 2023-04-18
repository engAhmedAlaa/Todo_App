import Form from './Form';
import TodosContainer from './TodosContainer';
import FilterButtons from './FilterButtons';
import { useState, useEffect, useRef, useMemo, useReducer } from 'react';
import { v4 as uuidV4 } from 'uuid';

function Content() {
  const [todos, dispatch] = useReducer(
    todosReducer,
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

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <main className="main-content">
      <Form dispatch={dispatch} ref={inputRef} />
      {todos.length === 0 ? (
        <div className="empty">
          <button
            className="initialize"
            onClick={() => inputRef.current.focus()}
          >
            Add Todos
          </button>
        </div>
      ) : (
        <>
          <TodosContainer
            todos={visibleTodos}
            dispatch={dispatch}
            showState={showState}
            length={activeTodos.length}
            setShowState={setShowState}
          />
          <FilterButtons setShowState={setShowState} showState={showState} />
        </>
      )}
    </main>
  );
}

function todosReducer(todos, action) {
  switch (action.type) {
    case 'add_todo': {
      return [
        {
          id: uuidV4(),
          content: action.todoContent,
          isCompleted: false,
        },
        ...todos,
      ];
    }
    case 'check_todo': {
      return todos.map((todo) =>
        todo.id !== action.todoId
          ? todo
          : {
              ...todo,
              isCompleted: !todo.isCompleted,
            }
      );
    }
    case 'save_todo': {
      return todos.map((todo) =>
        todo.id !== action.todoId
          ? todo
          : {
              ...todo,
              content: action.editedContent,
            }
      );
    }
    case 'delete_todo': {
      return todos.filter((todo) => todo.id !== action.todoId);
    }
    case 'clear_completed_todos': {
      return todos.filter((todo) => todo.isCompleted !== true);
    }
    default: {
      throw new Error(`Unknown action ${action.type}`);
    }
  }
}

export default Content;
