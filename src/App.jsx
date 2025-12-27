import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Footer from "./sections/Footer";
import Navbar from "./components/NavBar";
import BlogPost from "./pages/BlogPost";
import Blog from "./pages/Blog";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import PostEditor from "./pages/admin/PostEditor";

// ScrollToTop component to ensure pages start at top on navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};


const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/new" element={
          <ProtectedRoute>
            <PostEditor />
          </ProtectedRoute>
        } />
        <Route path="/admin/edit/:id" element={
          <ProtectedRoute>
            <PostEditor />
          </ProtectedRoute>
        } />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
