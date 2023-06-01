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
    const logMessage =
      logType === 'Watering' ? wateringLog : logType === 'Pruning' ? pruningLog : fertilizingLog;
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
    <div className="container mt-5 pb-4" style={{ backgroundColor: '#4E7130', color: '#C9B590' }}>
      <h2 className="mb-4">My Plants</h2>
      <div className="overflow-auto" style={{ maxHeight: '300px' }}>
        {plants.length ? (
          <ul className="list-group">
            {plants.map((plant) => (
              <li
                key={plant.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {plant.common_name} - {plant.scientific_name}
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleDeletePlant(plant.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No plants added yet.</p>
        )}
      </div>

      <h2>Add Plant</h2>
      <form onSubmit={handlePlantSubmit}>
        <div className="mb-3">
          <label className="form-label">Common Name:</label>
          <input type="text" className="form-control" name="common_name" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Scientific Name:</label>
          <input type="text" className="form-control" name="scientific_name" required />
        </div>
        <button type="submit" className="btn btn-primary">Add Plant</button>
      </form>

      <h2>Create Log</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mb-3">
          <label className="form-label">Watering Log:</label>
          <input
            type="text"
            className="form-control"
            value={wateringLog}
            onChange={(e) => setWateringLog(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" onClick={() => handleLogSubmit('Watering')}>Submit Watering Log</button>

        <div className="mb-3">
          <label className="form-label">Pruning Log:</label>
          <input
            type="text"
            className="form-control"
            value={pruningLog}
            onChange={(e) => setPruningLog(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" onClick={() => handleLogSubmit('Pruning')}>Submit Pruning Log</button>

        <div className="mb-3">
          <label className="form-label">Fertilizing Log:</label>
          <input
            type="text"
            className="form-control"
            value={fertilizingLog}
            onChange={(e) => setFertilizingLog(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" onClick={() => handleLogSubmit('Fertilizing')}>Submit Fertilizing Log</button>
      </form>
    </div>
  );
};

export default MyPlants;
