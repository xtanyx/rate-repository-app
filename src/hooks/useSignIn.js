import { useApolloClient, useMutation } from "@apollo/client"
import {AUTHENTICATE} from '../graphql/mutations'
import useAuthStorage from "./useAuthStorage";
import { useNavigate } from "react-router-native";

const useSignIn = () => {
  const nagivate = useNavigate();
  const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(AUTHENTICATE);
  const apolloClient = useApolloClient();

  const signIn = async ({username, password}) => {
    const response = await mutate({variables: {credentials: {username, password}}});
    const token = await response.data.authenticate.accessToken;
    await authStorage.setAccessToken(token);
    apolloClient.resetStore();
    nagivate('/');
    return token
  }

  return [signIn, result];
}

export default useSignIn;