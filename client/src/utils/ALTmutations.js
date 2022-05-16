import { gql } from '@apollo/client';
//maybe we can  have edit piece mutation and the form gets edited piece by piece, 
//and then have a delete piece and a add piece mutation which is a form mutation proper
export const EDIT_FORM = gql`
mutation editForm($formID: ID!) {
  editForm(formID: $formID) {
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

export const EDIT_PIECE = gql`
mutation editPiece($pieceID: ID!) {
  editPiece(pieceID: $pieceID) {
    _id
    _type
    data
  }
}
`;