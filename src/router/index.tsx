import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Register = lazy(() => import('../views/Register'));
const Login = lazy(() => import('../views/Login'));
const Home = lazy(() => import('../views/Home'));
const About = lazy(() => import('../views/About'));

const App = () => (
  <Router>
    <Suspense fallback={<div></div>}>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Suspense>
  </Router>
);

export default App;