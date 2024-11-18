import { gql } from "@apollo/client";

export const AUTHENTICATE = gql`
  mutation authenticate($credentials: AuthenticateInput!) {
    authenticate(credentials: $credentials){
      accessToken
    }
  }
`

export const CREATEREVIEW = gql`
  mutation CreateReview($review: CreateReviewInput!) {
    createReview(review: $review){
      repositoryId
    }
  }
`

export const SIGNUP = gql`
  mutation SignUp($user: CreateUserInput!) {
    createUser(user: $user) {
      username
    }
  }
`

export const DELETEREVIEW = gql`
  mutation DeleteReview($id: ID!) {
    deleteReview(id: $id)
  }
`