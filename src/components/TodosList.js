import TodoItem from './TodoItem';

function TodosList({ todos, dispatch, showState }) {
  return (
    <ul className="todos-list">
      {todos.length === 0 ? (
        <div className="no-todos">There is no {showState} todos</div>
      ) : (
        todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} dispatch={dispatch} />
        ))
      )}
    </ul>
  );
}

export default TodosList;
