import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <header className="bg-primary text-primary-foreground p-4 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center max-w-4xl">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Task Manager</h1>
        <nav>
          <ul className="flex flex-wrap gap-3 md:space-x-4 text-center">
            <li>
              <Link 
                to="/" 
                className={`${isActive('/') ? 'text-white' : 'text-primary-foreground/80'} hover:text-white transition-colors`}
              >
                All Tasks
              </Link>
            </li>
            <li>
              <Link 
                to="/completed" 
                className={`${isActive('/completed') ? 'text-white' : 'text-primary-foreground/80'} hover:text-white transition-colors`}
              >
                Completed
              </Link>
            </li>
            <li>
              <Link 
                to="/add" 
                className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md hover:bg-secondary/80 transition-colors"
              >
                Add New Task
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
