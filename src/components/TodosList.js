import TodoItem from './TodoItem';
import FilterButtons from './FilterButtons';

function TodosList({
  todos,
  showState,
  activeTodosLength,
  handleClickDeleteTodo,
  handleChangeCheckTodo,
  handleClickClearCompleted,
  handleClickState,
}) {
  return (
    <ul className="todos-list">
      {todos.length === 0 ? (
        <div className="no-todos">There is no {showState} todos</div>
      ) : (
        todos.map((todo) => (
          <TodoItem
            key={todo.id}
            {...todo}
            handleClickDeleteTodo={handleClickDeleteTodo}
            handleChangeCheckTodo={handleChangeCheckTodo}
          />
        ))
      )}
      <div className="todos-control">
        <span className="length">
          {activeTodosLength === 0
            ? 'No todos'
            : activeTodosLength === 1
            ? `${activeTodosLength} todo`
            : `${activeTodosLength} todos`}{' '}
          left
        </span>
        <FilterButtons
          showState={showState}
          handleClickState={handleClickState}
        />
        <button
          className="clear-btn"
          aria-label="Clear completed todos"
          onClick={handleClickClearCompleted}
        >
          Clear Completed
        </button>
      </div>
    </ul>
  );
}

export default TodosList;
