"use client";

import { Formik, FormikHelpers, FormikProps, Form, Field } from "formik";
import { signIn } from "next-auth/react";
import React, { useState } from "react";

type FormValuesType = {
  email: string;
  password: string;
};

const SignInComponent = () => {
  const [error, setError] = useState<string | null>(null);

  const initialValues: FormValuesType = {
    email: "",
    password: "",
  };
  return (
    <div>
      <h1 className="text-3xl">Sign Up</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={async (
          values: FormValuesType,
          { setSubmitting }: FormikHelpers<FormValuesType>
        ) => {
          try {
            const res = await signIn("credentials", {
              email: values.email,
              password: values.password,
              redirect: false,
            });
            if (res?.ok) {
              window.location.href = "/";
            }
            if (res?.error) {
              setError(res.error);
            }
          } catch (err) {
            if (err instanceof Error) {
              console.error("Error:", err.message);
            }
          }

          setSubmitting(false);
        }}
      >
        {({ isSubmitting }: FormikProps<FormValuesType>) => (
          <Form className="flex flex-col gap-4">
            <Field name="email" type="email" placeholder="Email" required />
            <Field
              name="password"
              type="password"
              placeholder="********"
              required
            />

            <p>{error}</p>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Sign Up
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignInComponent;
