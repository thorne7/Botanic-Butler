import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_SAVED_PLANTS } from '../utils/queries';


const MyPlants = () => {
  const { loading, error, data } = useQuery(QUERY_SAVED_PLANTS);
  const user = data?.me;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const plants = user?.plants || [];

  return (
    <div>
      <h2>My Plants</h2>
      {plants.length ? (
        <ul>
          {plants.map((plant) => (
            <li key={plant._id}>
              {plant.common_name} - {plant.scientific_name}
            </li>
          ))}
        </ul>
      ) : (
        <p>No plants saved.</p>
      )}
    </div>
  );
};

export default MyPlants;