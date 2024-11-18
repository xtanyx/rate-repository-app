import { gql } from "@apollo/client";

export const REPOSITORIES = gql`
  query Repositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String, $after: String, $first: Int){
    repositories (orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword, after: $after, first: $first){
      edges {
        node {
          id
          ownerAvatarUrl
          fullName
          description
          language
          forksCount
          stargazersCount
          ratingAverage
          reviewCount
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
`
export const ME = gql`
  query getCurrentUser($includeReviews: Boolean = false){
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            rating
            repository {
              fullName
            }
            repositoryId
            text
            createdAt
          }
        }
      }
    }
  }
`

export const REPOSITORY = gql`
  query repository ($id: ID!, $first: Int, $after: String){
    repository(id: $id){
      id
      ownerAvatarUrl
      description
      fullName
      language
      forksCount
      stargazersCount
      ratingAverage
      reviewCount
      url
      reviews (first: $first, after: $after){
        totalCount
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
`