import React, { useState } from 'react';
import { Input } from '@chakra-ui/react'
import { useQuery, useMutation } from '@apollo/client';
import { ADD_PLANT } from '../utils/mutations';
import { QUERY_SEARCH_PLANT } from '../utils/queries';

const AddPlant = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [addPlant] = useMutation(ADD_PLANT);

  const { loading, error, data } = useQuery(QUERY_SEARCH_PLANT, {
    variables: { query: searchTerm },
    skip: searchTerm === '',
  });

  const handleSearchPlant = () => {
    setSearchTerm(searchTerm);
  };

  const handleSubmit = (plant) => {
    addPlant({
      variables: {
        common_name: plant.common_name,
        scientific_name: plant.scientific_name,
      },
    })
      .then((response) => {
        console.log('Plant added:', response.data.addPlant);
      })
      .catch((error) => {
        console.error('Failed to add plant', error);
      });
  };

  return (
    <div>
      <h2>Add Plant</h2>

      <div>
        <h3>Plant Search</h3>
        <input variant='flushed' placeholder='Plant Names Go Here '
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearchPlant}>Search</button>

        {loading && <p>Loading search results...</p>}
        {error && <p>Error: {error.message}</p>}

        {data && data.searchPlant && (
          <ul>
            {data.searchPlant.map((plant) => (
              <li key={plant._id}>
                {plant.common_name}
                <button onClick={() => handleSubmit(plant)}>Add Plant</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AddPlant;
