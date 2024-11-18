import { useFormik } from "formik";
import * as yup from 'yup';
import { View, TextInput, Pressable, StyleSheet } from "react-native";
import Text from "./Text";
import theme from "../theme";
import { useMutation } from "@apollo/client";
import { CREATEREVIEW } from "../graphql/mutations";
import { useNavigate } from "react-router-native";
import { useEffect } from "react";

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

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .required('Repository owner name is required'),
  rating: yup
    .number()
    .min(0)
    .max(100)
    .required('Rating is required'),
  review: yup
    .string()
    .optional(),
  repositoryName: yup
    .string()
    .required('Repository name is required')
})

const initialValues = {
  ownerName: '',
  rating: '',
  review: '',
  repositoryName: ''
}

const ReviewForm = () => {
  const [mutate, data] = useMutation(CREATEREVIEW);
  const navigate = useNavigate();

  useEffect(() => {
    if(!data.loading && data.data) {
      console.log('repo loaded');
      navigate(`/${data.data.createReview.repositoryId}`);
    }
  }, [data.data])

  const onSubmit = (values) => {
    console.log(values);
    mutate({variables: {review: {
      ownerName: values.ownerName,
      repositoryName: values.repositoryName,
      rating: Number(values.rating),
      text: values.review !== '' ? values.review : null
    }}});
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  });

  return (
    <View style={styles.flexContainer}>
    <View style={[styles.flexItem, formik.touched.ownerName && formik.errors.ownerName ? {borderColor: '#d73a4a'} : null]}>
      <TextInput
        placeholder='Repository owner name'
        value={formik.values.ownerName}
        onChangeText={formik.handleChange('ownerName')}
      />
    </View>
    {formik.touched.ownerName && formik.errors.ownerName && (
        <Text style={{color: '#d73a4a'}}>{formik.errors.ownerName}</Text>
    )}
    <View style={[styles.flexItem, formik.touched.repositoryName && formik.errors.repositoryName ? {borderColor: '#d73a4a'} : null]}>
      <TextInput
        placeholder='Repository name'
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange('repositoryName')} 
      />
    </View>
    {formik.touched.repositoryName && formik.errors.repositoryName && (
        <Text style={{color: '#d73a4a'}}>{formik.errors.repositoryName}</Text>
    )}
    <View style={[styles.flexItem, formik.touched.rating && formik.errors.rating ? {borderColor: '#d73a4a'} : null]}>
      <TextInput
        placeholder='Rating between 0 and 100'
        value={formik.values.rating}
        onChangeText={formik.handleChange('rating')} 
      />
    </View>
    {formik.touched.rating && formik.errors.rating && (
        <Text style={{color: '#d73a4a'}}>{formik.errors.rating.toString()}</Text>
    )}
    <View style={[styles.flexItem]}>
      <TextInput
        multiline
        placeholder='Review'
        value={formik.values.review}
        onChangeText={formik.handleChange('review')} 
      />
    </View>
    <Pressable style={styles.button} onPress={formik.handleSubmit}>
      <Text style={styles.textStyle}>Create a review</Text>
    </Pressable>
  </View>
  )
}

export default ReviewForm;