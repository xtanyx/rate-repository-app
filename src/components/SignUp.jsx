import { useFormik } from 'formik';
import * as yup from 'yup';
import { StyleSheet, Pressable, View, TextInput } from 'react-native';
import Text from './Text';
import theme from '../theme';
import { useMutation } from '@apollo/client';
import { SIGNUP } from '../graphql/mutations';
import { useNavigate } from 'react-router-native';
import useSignIn from '../hooks/useSignIn';

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
  password: '',
  passwordConfirm: ''
}

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5)
    .max(30)
    .required('Username is required'),
  password: yup
    .string()
    .min(5)
    .max(50)
    .required('Password is required'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null])
    .required('Password confirm is required')
})

const SignUp = () => {
  const [mutate, data] = useMutation(SIGNUP);
  const navigate = useNavigate();
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    console.log(values);
    try {
      await mutate({variables: {user: {username: values.username, 
        password: values.password}}});
      const {data} = await signIn({username: values.username, password: values.password});
      console.log(data);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

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
      <View style={[styles.flexItem, formik.touched.passwordConfirm && formik.errors.passwordConfirm ? {borderColor: '#d73a4a'} : null]}>
        <TextInput
          secureTextEntry
          placeholder='Password'
          value={formik.values.passwordConfirm}
          onChangeText={formik.handleChange('passwordConfirm')} 
        />
      </View>
      {formik.touched.passwordConfirm && formik.errors.passwordConfirm && (
          <Text style={{color: '#d73a4a'}}>{formik.errors.passwordConfirm}</Text>
      )}
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.textStyle}>Sign Up</Text>
      </Pressable>
    </View>
  )
}

export default SignUp;