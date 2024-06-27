import { gql } from "@apollo/client";

export const GET_TRANSACTIONS = gql`
  query GetTransactions {
    transactions {
      _id
      description
      paymentType
      category
      amount
      location
      date
    }
  }
`;

export const GET_TRANSACTION = gql`
  query GetTransaction($transactionId: ID!){
    transaction(transactionId: $transactionId){
      description
      paymentType
      category
      amount
      location
      date
    }
  }
`;
