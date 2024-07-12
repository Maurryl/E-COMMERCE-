import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const ProductForm = () => {
  return (
    <Formik
      initialValues={{ name: '', price: 0, description: '' }}
      validationSchema={Yup.object({
        name: Yup.string().required('Required'),
        price: Yup.number().required('Required').positive('Must be a positive number'),
        description: Yup.string().required('Required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        axios.post('http://localhost:5000/api/product', values)
          .then(response => console.log(response))
          .catch(error => console.error('Error:', error))
          .finally(() => setSubmitting(false));
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <label htmlFor="name">Name</label>
          <Field name="name" type="text" />
          <ErrorMessage name="name" component="div" />

          <label htmlFor="price">Price</label>
          <Field name="price" type="number" />
          <ErrorMessage name="price" component="div" />

          <label htmlFor="description">Description</label>
          <Field name="description" type="text" />
          <ErrorMessage name="description" component="div" />

          <button type="submit" disabled={isSubmitting}>Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default ProductForm;
