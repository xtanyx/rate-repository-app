import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import * as yup from 'yup';
import Text from './Text';
import { useFormik } from 'formik';
import theme from '../theme';

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
})

const styles = StyleSheet.create({
  flexContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 5
  },
  flexItem: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'grey',
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginVertical: 5
  },
  button: {
    backgroundColor: '#0366d6',
    padding: 10
  },
  textStyle: {
    color: theme.colors.white,
    textAlign: 'center'
  }
})

const initialValues = {
  username: '',
  password: ''
}

const onSubmit = (values) => {
  console.log(values);
}
const SignIn = () => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  });

  return (
    <View style={styles.flexContainer}>
      <View style={[styles.flexItem, formik.touched.username && formik.errors.username ? {borderColor: '#d73a4a'} : null]}>
        <TextInput
          placeholder='Username'
          value={formik.values.username}
          onChangeText={formik.handleChange('username')}
          
        />
      </View>
      {formik.touched.username && formik.errors.username && (
          <Text style={{color: '#d73a4a'}}>{formik.errors.username}</Text>
      )}
      <View style={[styles.flexItem, formik.touched.password && formik.errors.password ? {borderColor: '#d73a4a'} : null]}>
        <TextInput
          secureTextEntry
          placeholder='Password'
          value={formik.values.password}
          onChangeText={formik.handleChange('password')} 
        />
      </View>
      {formik.touched.password && formik.errors.password && (
          <Text style={{color: '#d73a4a'}}>{formik.errors.password}</Text>
      )}
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.textStyle}>Sign In</Text>
      </Pressable>
    </View>
  );
};

export default SignIn;