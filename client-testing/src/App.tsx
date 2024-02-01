import React, { useState } from 'react';
import ProjectCreation from './components_testing/ProjectCreation';
import MilestoneCreation from './components_testing/MilestoneCreation';
import MilestoneCompleted from './components_testing/MilestoneCompleted';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      {/* Your existing App component content goes here */}
      
      {/* Include the ProjectCreation component */}
      <ProjectCreation />

      {/* Include the MilestoneCreation component */}
      <MilestoneCreation />

      {/* Include the MilestoneCompleted component */}
      <MilestoneCompleted />

      {/* Example: Display the current count state */}
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

export default App;
