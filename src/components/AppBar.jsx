import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text'
import theme from '../theme';
import { Link } from 'react-router-native';
import { useQuery } from '@apollo/client';
import {ME} from '../graphql/queries'
import { useApolloClient } from '@apollo/client';
import useAuthStorage from '../hooks/useAuthStorage';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.secondary,
  },
  flexContainer: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  flexRepositories: {
    flexGrow: 0,
    paddingHorizontal: 10
  },
  textStyle: {
    color: theme.colors.white
  }
});

const AppBar = () => {
  const userResult = useQuery(ME);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  if (userResult.loading) {
    return null;
  }

  const handleOnPress = () => {
    console.log('pressed');
  }

  const handleSignOut = async () => {
    console.log('working');
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  }

  console.log(userResult.data.me);
  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.flexContainer}>
        <Pressable style={styles.flexRepositories} onPress={handleOnPress}>
          <Link to='/'>
            <Text color='textSecondary' fontSize='subheading' fontWeight='bold'>Repositories</Text>
          </Link>
        </Pressable>
        {
          !userResult.data.me
            ? <Pressable style={styles.flexRepositories}>
                <Link to='/signIn'>
                  <Text color='textSecondary' fontSize='subheading' fontWeight='bold'>Sign in</Text>
                </Link>
              </Pressable>
            : <Pressable style={styles.flexRepositories} onPress={handleSignOut}>
                  <Text color='textSecondary' fontSize='subheading' fontWeight='bold'>Sign Out</Text>
              </Pressable>
        }
      </ScrollView>
    </View>
  )
};

export default AppBar;