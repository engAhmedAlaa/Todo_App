import ThemeToggle from './ThemeToggle';

function Header() {
  return (
    <header className="main-header">
      <h1 className="logo" translate="no">
        Todo
      </h1>
      <ThemeToggle />
    </header>
  );
}

export default Header;
