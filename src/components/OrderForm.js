import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const OrderForm = () => {
  return (
    <Formik
      initialValues={{ user_id: '', products: [{ product_id: '', quantity: 1 }] }}
      validationSchema={Yup.object({
        user_id: Yup.string().required('Required'),
        products: Yup.array().of(
          Yup.object().shape({
            product_id: Yup.string().required('Required'),
            quantity: Yup.number().required('Required').positive('Must be a positive number'),
          })
        ).required('Must have products')
      })}
      onSubmit={(values, { setSubmitting }) => {
        axios.post('http://localhost:5000/api/order', values)
          .then(response => console.log(response))
          .catch(error => console.error('Error:', error))
          .finally(() => setSubmitting(false));
      }}
    >
      {({ isSubmitting, values, setFieldValue }) => (
        <Form>
          <label htmlFor="user_id">User ID</label>
          <Field name="user_id" type="text" />
          <ErrorMessage name="user_id" component="div" />

          {values.products.map((product, index) => (
            <div key={index}>
              <label htmlFor={`products.${index}.product_id`}>Product ID</label>
              <Field name={`products.${index}.product_id`} type="text" />
              <ErrorMessage name={`products.${index}.product_id`} component="div" />

              <label htmlFor={`products.${index}.quantity`}>Quantity</label>
              <Field name={`products.${index}.quantity`} type="number" />
              <ErrorMessage name={`products.${index}.quantity`} component="div" />

              <button type="button" onClick={() => {
                const products = values.products.slice();
                products.splice(index, 1);
                setFieldValue('products', products);
              }}>Remove Product</button>
            </div>
          ))}

          <button type="button" onClick={() => {
            const products = values.products.slice();
            products.push({ product_id: '', quantity: 1 });
            setFieldValue('products', products);
          }}>Add Product</button>

          <button type="submit" disabled={isSubmitting}>Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default OrderForm;
