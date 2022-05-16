//to do it like this we need to add Appolo client div to the App.js
import { gql } from '@apollo/client';

export const QUERY_SINGLE_FORM = gql`
query singleForm($formID: ID!) {
  singleForm(formID: $formID) {
    _id
    title
    description
    pieces{
        _id
        type
        data
    }
  }
}
`;

export const QUERY_ALL_FORMS = gql`
query allForms($userID: ID!) {
  allForms(userID: $userID) {
    _id
    title
    description
  }
}
`;

export const QUERY_RESPONSES = gql`
query responses($formID: ID!) {
  responses(formID: $formID) {
    _id
    title
    description
    pieces{
        _id
        type
        data
        responses
    }
  }
}
`;


