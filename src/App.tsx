import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { MainDashboard } from './components/MainDashboard';
import { DatasetPage } from './components/DatasetPage';
import { AlgorithmComparison } from './components/AlgorithmComparison';
import { RunDetail } from './components/RunDetail';
import { NetworkExplorer } from './components/NetworkExplorer';
import { UploadMonitor } from './components/UploadMonitor';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <Routes>
          <Route path="/" element={<MainDashboard />} />
          <Route path="/dataset/:id" element={<DatasetPage />} />
          <Route path="/compare" element={<AlgorithmComparison />} />
          <Route path="/run/:id" element={<RunDetail />} />
          <Route path="/explorer" element={<NetworkExplorer />} />
          <Route path="/upload" element={<UploadMonitor />} />
        </Routes>
      </div>
    </Router>
  );
}
