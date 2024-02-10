import { useEffect } from 'react';
import io from 'socket.io-client';

const MilestoneCreation = () => {
    
    console.log('hello from MilestoneCreation');
    useEffect(() => {
    // const socket = io('localhost:6005');
    const socket = io('https://flowease.onrender.com');

    socket.on('milestone_created', (data) => {
      console.log('Received milestoneCreated event:', data);
      // Handle the data or update your React state as needed
    });
  
    return () => {
      socket.disconnect();
    };
  }, []); // Empty dependency array means this effect runs once when the component mounts
};

export default MilestoneCreation;
