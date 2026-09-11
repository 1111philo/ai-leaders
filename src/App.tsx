
import { BrowserRouter, Routes, Route, Navigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import Partners from './pages/Partners';
import Universities from './pages/Universities';
import Lessons from './pages/Lessons';
import LessonDetail from './pages/LessonDetail';
import Graduation from './pages/Graduation';

function FurqanRedirect() {
  const [searchParams] = useSearchParams();
  useEffect(() => {
    if (searchParams.has('furqan')) {
      window.location.replace('https://furqanali.blog/');
    }
  }, [searchParams]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <FurqanRedirect />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/universities" element={<Universities />} />
          {/* Legacy URLs — keep old links and search results working. */}
          <Route path="/employers" element={<Navigate to="/partners" replace />} />
          <Route path="/edu-partners" element={<Navigate to="/universities" replace />} />
          <Route path="/lessons" element={<Lessons />} />
          <Route path="/lessons/:slug" element={<LessonDetail />} />
          <Route path="/graduation" element={<Graduation />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
