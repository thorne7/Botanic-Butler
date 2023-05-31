import {
  gql
} from '@apollo/client';

export const LOGIN_USER = gql `
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql `
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_PLANT = gql`
  mutation AddPlant($common_name: String!, $scientific_name: String) {
    addPlant(common_name: $common_name, scientific_name: $scientific_name) {
      _id
      common_name
    }
  }
`;
