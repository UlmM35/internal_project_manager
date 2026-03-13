import './App.css'
import { useState, useEffect } from 'react';
import { Project } from './types';
import { getProjects } from './services/projects'
import Notification from './components/Notification'
import ProfileForm from './components/ProfileForm';

const App = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState('');
 
  useEffect(() => {
      getProjects()
          .then(setProjects)
          .catch(() => setError('Failed to load projects.'));
  }, []);
 
  if (error) {
    return <Notification type="error" message={error} />
  }

  if (!projects.length) {
    return <p>Loading...</p>;
  }
  
  return <ProfileForm projects={projects} />;
}

export default App
