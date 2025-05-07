import { useState } from 'react';
import { getStatus, callAI } from './api';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(false);

  const handleStatusClick = async () => {
    try {
      setIsLoading(true);
      const status = await getStatus();
      alert(`Status: ${JSON.stringify(status)}`);
    } catch (error) {
      alert('Error fetching status. Please check the console for details.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAIClick = async () => {
    try {
      setIsLoading(true);
      const response = await callAI({ message: 'Hello AI' });
      alert(`AI Response: ${JSON.stringify(response)}`);
    } catch (error) {
      alert('Error calling AI. Please check the console for details.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React API Demo</h1>
        <div className="button-container">
          <button 
            onClick={handleStatusClick} 
            disabled={isLoading}
            className="api-button"
          >
            {isLoading ? 'Loading...' : 'Check Status'}
          </button>
          <button 
            onClick={handleAIClick} 
            disabled={isLoading}
            className="api-button"
          >
            {isLoading ? 'Processing...' : 'Send to AI'}
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
