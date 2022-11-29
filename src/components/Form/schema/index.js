import * as yup from "yup";
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

export const userSechema = yup.object().shape({
  username: yup.string().required("field is required"),
  email: yup
    .string()
    .email("Please enter valid email")
    .required("field is required"),
  password: yup
    .string()
    .min(5)
    .matches(passwordRules, {
      message:
        "Please create 1 upper case letter, 1 lower case letter, 1 numeric digit",
    })
    .required("field is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null, "password must match"])
    .required("Field is required"),
});

export const productSechema = yup.object().shape({
  productname: yup.string().required("field is required"),
  shortDescription: yup.string().required("field is required"),
  description: yup.string().required("field is required"),
  price: yup.number().required("Field is required"),
  category: yup.string().required("field is required"),
});
