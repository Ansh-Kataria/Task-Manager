import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Task from './components/Task';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';

function App() {
  return (

    <>
      {/* <Navbar /> */}
      <Router>

        <div>
          <Navbar />
          <Routes>

            <Route path="/" element={<Task />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </Router>
    </>
    // <div className="App">
    //   <TaskList />
    // </div>
  );
}

export default App;
