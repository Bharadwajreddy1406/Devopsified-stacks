import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-blue-700' : '';
  };

  return (
    <nav className="bg-blue-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center text-white font-bold text-xl">
              DevConnect
            </Link>
          </div>
          <div className="flex items-center">
            <div className="hidden md:ml-6 md:flex md:space-x-4">
              <Link 
                to="/" 
                className={`${isActive('/')} text-white hover:bg-blue-700 px-3 py-2 rounded-md font-medium transition-colors duration-200`}
              >
                Home
              </Link>
              <Link 
                to="/tools" 
                className={`${isActive('/tools')} text-white hover:bg-blue-700 px-3 py-2 rounded-md font-medium transition-colors duration-200`}
              >
                DevOps Tools
              </Link>
              <Link 
                to="/tutorials" 
                className={`${isActive('/tutorials')} text-white hover:bg-blue-700 px-3 py-2 rounded-md font-medium transition-colors duration-200`}
              >
                Tutorials
              </Link>
              <Link 
                to="/about" 
                className={`${isActive('/about')} text-white hover:bg-blue-700 px-3 py-2 rounded-md font-medium transition-colors duration-200`}
              >
                About
              </Link>
            </div>
          </div>
          <div className="flex items-center md:hidden">
            {/* Mobile menu button */}
            <button type="button" className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-700 focus:outline-none">
              <span className="sr-only">Open main menu</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className="md:hidden hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link to="/" className="text-white block px-3 py-2 rounded-md font-medium">Home</Link>
          <Link to="/tools" className="text-white block px-3 py-2 rounded-md font-medium">DevOps Tools</Link>
          <Link to="/tutorials" className="text-white block px-3 py-2 rounded-md font-medium">Tutorials</Link>
          <Link to="/about" className="text-white block px-3 py-2 rounded-md font-medium">About</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
