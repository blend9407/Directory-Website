import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ToolDetailPage from './pages/ToolDetailPage';
import CategoriesPage from './pages/CategoriesPage';
import ToolMatchQuiz from './components/ToolMatchQuiz';
import BlogListPage from './pages/BlogListPage';
import BlogPostPage from './pages/BlogPostPage';
import SubmitToolPage from './pages/SubmitToolPage';
import NewArrivalsPage from './pages/NewArrivalsPage';
import AboutPage from './pages/AboutPage';
import AdvertisePage from './pages/AdvertisePage';
import PrivacyPage from './pages/PrivacyPage';
import ContactPage from './pages/ContactPage';

const App: React.FC = () => {
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  return (
    <Router>
      <Layout onOpenQuiz={() => setIsQuizOpen(true)}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/tool/:id" element={<ToolDetailPage />} />
          <Route path="/blog" element={<BlogListPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/submit-tool" element={<SubmitToolPage />} />
          <Route path="/new-arrivals" element={<NewArrivalsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/advertise" element={<AdvertisePage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        
        <ToolMatchQuiz 
          isOpen={isQuizOpen} 
          onClose={() => setIsQuizOpen(false)} 
        />
      </Layout>
    </Router>
  );
};

export default App;