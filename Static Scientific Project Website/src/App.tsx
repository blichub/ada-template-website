import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { HomePage } from './components/HomePage';
import { RQ1Spatial } from './components/RQ1Spatial';
import { RQ2Temporal } from './components/RQ2Temporal';
import { RQ3CellTypes } from './components/RQ3CellTypes';
import { About } from './components/About';
import { ScrollToTop } from './components/ScrollToTop';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-[#0a0e27]">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/rq1-spatial" element={<RQ1Spatial />} />
          <Route path="/rq2-temporal" element={<RQ2Temporal />} />
          <Route path="/rq3-celltypes" element={<RQ3CellTypes />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}
