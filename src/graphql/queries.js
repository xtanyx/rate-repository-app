import { gql } from "@apollo/client";

export const REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          id
          ownerAvatarUrl
          fullName
          language
          forksCount
          stargazersCount
          ratingAverage
          reviewCount
        }
      }
    }
  }
`
export const ME = gql`
  query {
    me {
      id
      username
    }
  }
`