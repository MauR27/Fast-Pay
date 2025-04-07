"use client";

import React, { useState } from "react";
import { Formik, FormikHelpers, FormikProps, Form, Field } from "formik";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

type FormValuesType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};
const SignUpComponent = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  //   const [isloading, setLoading] = useState(false);

  const initialValues: FormValuesType = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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
          if (values.password !== values.confirmPassword) {
            return setError("Passwords do not match");
          }

          try {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_URL_ADDRESS}/api/auth/register`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  name: values.name,
                  email: values.email,
                  password: values.password,
                }),
              }
            );
            const data = await res.json();

            console.log(data);

            await signIn("credentials", {
              email: data.email,
              password: values.password,
              redirect: false,
            });

            if (res.ok) {
              setError("");
              return router.push("/");
            } else {
              setError(res.statusText);
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
            <Field name="name" type="text" placeholder="Name" required />
            <Field name="email" type="email" placeholder="Email" required />
            <Field
              name="password"
              type="password"
              placeholder="********"
              required
            />
            <Field
              name="confirmPassword"
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

export default SignUpComponent;
