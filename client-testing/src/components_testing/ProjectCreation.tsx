import { useEffect } from 'react';
import io from 'socket.io-client';

const ProjectCreation = () => {
    
    console.log('hello from ProjectCreation');
    useEffect(() => {
    const socket = io('localhost:6005');

    socket.on('project_created', (data) => {
      console.log('Received projectCreated event:', data);
      // Handle the data or update your React state as needed
    });
  
    return () => {
      socket.disconnect();
    };
  }, []); // Empty dependency array means this effect runs once when the component mounts
};

export default ProjectCreation;
