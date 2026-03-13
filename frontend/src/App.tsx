import './App.css'
import { useState, useEffect } from 'react';
import { Project } from './types';
import { getProjects } from './services/projects'
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
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (!projects.length) {
    return <p>Loading...</p>;
  }
  
  return <ProfileForm projects={projects} />;
}

export default App
