import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './auth/Login';
import PrivateRoute from './auth/PrivateRoute';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import VideoGenerator from './components/VideoGenerator';
import VideoUpload from './components/VideoUpload';
import useFirebaseAuthWatcher from './hooks/useFirebaseAuthWatcher';

//Createed this Cause useNavigate() may be used only in the context of a <Router> component.
function AppContent() {
  useFirebaseAuthWatcher(); //
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="generate" element={<VideoGenerator />} />
        <Route path="upload" element={<VideoUpload />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
