import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      }
    }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email    
    }
  }
`;

export const QUERY_SAVED_PLANTS = gql`
  query GetSavedPlants {
    savedPlants {
      _id
      common_name
    }
  }
`;

export const QUERY_SEARCH_PLANT = gql`
  query SearchPlant($query: String!) {
   searchPlant(query: $query) {
    common_name
    scientific_name
   }
 }
`;