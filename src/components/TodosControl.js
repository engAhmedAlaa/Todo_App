import FilterButtons from './FilterButtons';

function TodosControl({ dispatch, showState, length, setShowState }) {
  function handleClearCompletedTodos() {
    dispatch({ type: 'clear_completed_todos' });
  }

  return (
    <div className="todos-control">
      <span className="length">
        {length === 0
          ? 'No todos'
          : length === 1
          ? `${length} todo`
          : `${length} todos`}{' '}
        left
      </span>
      <FilterButtons showState={showState} setShowState={setShowState} />
      <button
        className="clear-btn"
        aria-label="Clear completed todos"
        onClick={handleClearCompletedTodos}
      >
        Clear Completed
      </button>
    </div>
  );
}

export default TodosControl;
