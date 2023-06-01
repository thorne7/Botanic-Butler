import React, { useState, useEffect } from 'react';

const MyPlants = () => {
  const [plants, setPlants] = useState([]);
  const [wateringLog, setWateringLog] = useState('');
  const [pruningLog, setPruningLog] = useState('');
  const [fertilizingLog, setFertilizingLog] = useState('');

  useEffect(() => {
    // Load plants from local storage on component mount
    const savedPlants = localStorage.getItem('plants');
    if (savedPlants) {
      setPlants(JSON.parse(savedPlants));
    }
  }, []);

  useEffect(() => {
    // Save plants to local storage whenever the plants state changes
    localStorage.setItem('plants', JSON.stringify(plants));
  }, [plants]);

  const handlePlantSubmit = (event) => {
    event.preventDefault();
    // Logic for adding a new plant to the list
    const newPlant = {
      id: Date.now(),
      common_name: event.target.elements.common_name.value,
      scientific_name: event.target.elements.scientific_name.value,
    };
    setPlants([...plants, newPlant]);
    event.target.reset();
  };

  const handleLogSubmit = (logType) => {
    // Logic for creating a new log
    const logMessage = logType === 'Watering' ? wateringLog : logType === 'Pruning' ? pruningLog : fertilizingLog;
    console.log(`Create ${logType} log with message: ${logMessage}`);
    // Reset the log input fields
    setWateringLog('');
    setPruningLog('');
    setFertilizingLog('');
  };

  const handleDeletePlant = (id) => {
    // Logic for deleting a plant from the list
    const updatedPlants = plants.filter((plant) => plant.id !== id);
    setPlants(updatedPlants);
  };

  return (
    <div>
      <h2>My Plants</h2>
      {plants.length ? (
        <ul>
          {plants.map((plant) => (
            <li key={plant.id}>
              {plant.common_name} - {plant.scientific_name}
              <button onClick={() => handleDeletePlant(plant.id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No plants added yet.</p>
      )}

      <h2>Add Plant</h2>
      <form onSubmit={handlePlantSubmit}>
        <label>
          Common Name:
          <input type="text" name="common_name" required />
        </label>
        <label>
          Scientific Name:
          <input type="text" name="scientific_name" required />
        </label>
        <button type="submit">Add Plant</button>
      </form>

      <h2>Create Log</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          Watering Log:
          <input type="text" value={wateringLog} onChange={(e) => setWateringLog(e.target.value)} />
        </label>
        <button onClick={() => handleLogSubmit('Watering')}>Submit Watering Log</button>

        <label>
          Pruning Log:
          <input type="text" value={pruningLog} onChange={(e) => setPruningLog(e.target.value)} />
        </label>
        <button onClick={() => handleLogSubmit('Pruning')}>Submit Pruning Log</button>

        <label>
          Fertilizing Log:
          <input type="text" value={fertilizingLog} onChange={(e) => setFertilizingLog(e.target.value)} />
        </label>
        <button onClick={() => handleLogSubmit('Fertilizing')}>Submit Fertilizing Log</button>
      </form>
    </div>
  );
};

export default MyPlants;
