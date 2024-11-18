import {StyleSheet, View} from 'react-native';
import {Route, Routes, Navigate} from 'react-router-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignIn from './SignIn';
import ReviewForm from './ReviewForm';
import SignUp from './SignUp';
import MyReviews from './MyReviews';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: '#e1e4e8'
  },
  heading: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center'
  }
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar/>
      <Routes>
        <Route path='/signIn' element={<SignIn />}/>
        <Route path='/createReview' element={<ReviewForm />}/>
        <Route path='/myReviews' element={<MyReviews />}/>
        <Route path='/signUp' element={<SignUp />}/>
        <Route path='/:id' element={<RepositoryList/>}/>
        <Route path='/' element={<RepositoryList/>}/>
        <Route path='*' element={<Navigate to='/' replace/>}/>
      </Routes>
    </View>
  )
}

export default Main