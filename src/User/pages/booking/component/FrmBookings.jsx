import { Field, Form, Formik } from "formik";
import React from "react";

const FrmBookings = () => {
  return (
    <Formik>
      {() => {
        return (
          <Form className="flex flex-col w-full bg-gray-300/10 backdrop-blur-md">
            <label htmlFor="">Select Room</label>
            <Field
              className="h-[35px]  focus:outline-none focus:border-none  bg-gray-700 text-gray-500 focus:text-gray-300"
              type="number"
              as="input"
              name="pricePerNight"
              autoComplete="off"
              id="pricePerNight"
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default FrmBookings;
