import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { ADD_PLANT } from '../utils/mutations';
import { QUERY_SEARCH_PLANT } from '../utils/queries';

const AddPlant = () => {
    
    const [searchTerm, setSearchTerm] = useState('');
    const [commonName, setCommonName] =useState ('');
    const [scientificName, setScientificName] = useState('');
    const [addPlant, {loading, error }] = useMutation(ADD_PLANT);
    const { loading: searchLoading, error: searchError, data: searchData } = useQuery(QUERY_SEARCH_PLANT, {
        variables: { query: searchTerm },
        skip: searchTerm === '', // Skip the query if the search is empty
      });
      

    const handleSubmit = (e) => {
        e.preventDefault();
        addPlant({
            variables: { common_name: commonName, scientific_name: scientificName },
        })
        .then((response) => {
            console.log('Plant added:', response.data.addPlant);
            setCommonName('');
            setScientificName('');
        })
        .catch((error) => {
            console.error('Failed to add plant', error);
        });
    };

    const handleSearchPlant = () => {
        setSearchTerm(searchTerm);
      };

    return (
        <div>
          <h2>Add Plant</h2>
    
          <div>
            <label>
              Common Name:
              <input
                type="text"
                value={commonName}
                onChange={(e) => setCommonName(e.target.value)}
              />
            </label>
            <button onClick={handleSubmit}>Add Plant</button>
          </div>
    
          <div>
            <h3>Plant Search</h3>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearchPlant}>Search</button>
    
            {searchLoading && <p>Loading search results...</p>}
            {searchError && <p>Error: {searchError.message}</p>}
    
            {searchData && searchData.searchPlant && (
              <ul>
                {searchData.searchPlant.map((plant) => (
                  <li key={plant._id}>{plant.common_name}</li>
                ))}
              </ul>
            )}
          </div>
    
          {loading && <p>Adding plant...</p>}
          {error && <p>Error: {error.message}</p>}
        </div>
      );
    };
    
export default AddPlant;
