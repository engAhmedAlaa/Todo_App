function FilterButton({ state, showState, handleClickState }) {
  return (
    <button
      className={`filter-btn ${showState === state ? 'active' : ''}`}
      aria-label={`Show ${state} todos`}
      onClick={() => handleClickState(state)}
    >
      {state}
    </button>
  );
}

function FilterButtons(props) {
  const states = ['all', 'active', 'completed'];

  return (
    <div className="filter-btns">
      {states.map((state) => (
        <FilterButton key={state} state={state} {...props} />
      ))}
    </div>
  );
}

export default FilterButtons;
