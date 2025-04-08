"use client";

import React, { useState } from "react";
import { Formik, FormikHelpers, FormikProps, Form, Field } from "formik";

type FormValuesType = {
  name: string;
  id: string;
  qr_code: string;
};

const AddTableComponent = () => {
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const initialValues: FormValuesType = {
    name: "",
    id: "",
    qr_code: "",
  };

  return (
    <div>
      <button
        className="bg-blue-500 text-white p-2 rounded cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        Add table
      </button>
      {isOpen && (
        <Formik
          initialValues={initialValues}
          onSubmit={async (
            values: FormValuesType,
            { setSubmitting }: FormikHelpers<FormValuesType>
          ) => {
            try {
              const res = await fetch(
                `${process.env.NEXT_PUBLIC_URL_ADDRESS}/api/add_table`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(values),
                }
              );

              if (res?.ok) {
                window.location.href = `${process.env.NEXT_PUBLIC_URL_ADDRESS}/admin/dashboard`;
              }
              if (res?.statusText) {
                setStatusMessage(res.statusText);
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
              <Field
                name="name"
                type="text"
                placeholder="Table 1..."
                required
              />
              <Field name="id" type="text" placeholder="Table id..." required />
              <Field
                name="qr_code"
                type="text"
                placeholder="67263..."
                required
              />

              <p>{statusMessage}</p>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-500 text-white p-2 rounded"
              >
                Save
              </button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default AddTableComponent;
