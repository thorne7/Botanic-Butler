import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_PLANT } from '../utils/mutations';

const AddPlant = () => {

    const [commonName, setCommonName] =useState ('');
    const [scientificName, setScientificName] = useState('');

    const [addPlant, {loading }] = useMutation(ADD_PLANT);

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
    }

  return (
    <main>
      Add Plant Form
    </main>
  );
};

export default AddPlant;
