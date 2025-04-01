import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import AddTaskPage from './pages/AddTaskPage';
import EditTaskPage from './pages/EditTaskPage';
import CompletedTasksPage from './pages/CompletedTasksPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Header />
        <main className="container mx-auto max-w-4xl flex-grow p-4 md:p-6">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add" element={<AddTaskPage />} />
            <Route path="/edit/:id" element={<EditTaskPage />} />
            <Route path="/completed" element={<CompletedTasksPage />} />
          </Routes>
        </main>
        <footer className="py-4 text-center text-sm text-muted-foreground border-t">
          &copy; {new Date().getFullYear()} Task Manager App
        </footer>
      </div>
    </Router>
  );
}

export default App;
