import "../../styles/sudul/Register.css";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import Swal from "sweetalert2";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

function Register() {
  const [image, setImage] = useState("");

  //seller register validation
  const registerSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(5, "Too Short! Enter More Than 5 Characters")
      .max(50, "Too Long!")
      .required("Required"),
    lastName: Yup.string()
      .min(5, "Too Short! Enter More Than 5 Characters")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    contactNo: Yup.string()
      .min(10, "Enter valid mobile Number!")
      .max(12, "Too Long!")
      .required("Required"),
    password: Yup.string()
      .min(8, "Too Short! Enter More Than 8 Characters")
      .max(50, "Too Long!")
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
  });

  async function register(values) {
    // const storageRef = ref(storage, `seller/${Image.name + v4()}`);

    // await uploadBytes(storageRef, imageSeller)
    //   .then(() => {
    //     console.log("uploaded");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    // await getDownloadURL(storageRef)
    //   .then(async (url) => {
    // console.log(url);

    async function uploadProfilePhoto(imageFile) {
      const storageRef = ref(storage, `user/${Image.name + v4()}`);

      try {
        await uploadBytes(storageRef, imageFile);

        const url = await getDownloadURL(storageRef);

        console.log("Image uploaded. URL:", url);

        await auth.currentUser.updateProfile({
          photoURL: url,
        });
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    // Example usage:
    const imageFile = uploadProfilePhoto(imageFile); // Get the image file from user input, e.g., a file input element.

    const data = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      contactNo: values.contactNo,
      password: values.password,
      image: "sd",
    };
    await axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/user/`, data)
      .then((res) => {
        console.log(res);
        Swal.fire({
          icon: "success",
          title: "Successful",
          text: "New User Registered Successfully!",
        }).then((result) => {
          if (result.isConfirmed) {
            const login = { email: values.email, password: values.password };
            axios
              .post(`${import.meta.env.VITE_BACKEND_URL}/user/login`, login)
              .then((res) => {
                sessionStorage.setItem("user", res.data.user);
                window.location.href = "/";
              })
              .catch((err) => {
                console.log(err);
              });
          }
        });
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Please Check Your Email!!",
          footer: "Your Email is already in the Database!!",
        });
      });

    //   }).catch((err) => {
    //     console.log(err);
    //     alert("Email already exists!")
    //     return;
    //   });
  }
  return (
    <>
      <div className="register-container">
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            contactNo: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={registerSchema}
          onSubmit={(values) => {
            register(values);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              {/* firstName */}
              <div className="form-group col-md-6">
                <label>First Name</label>
                <Field
                  name="firstName"
                  placeholder="First Name"
                  type="text"
                  className={
                    "form-control" +
                    (errors.firstName && touched.firstName ? " is-invalid" : "")
                  }
                />
                <div className="invalid-feedback">{errors.firstName}</div>
              </div>

              {/* lastName */}
              <div className="form-group col-md-6">
                <label>Last Name</label>
                <Field
                  name="lastName"
                  placeholder="Last Name"
                  type="text"
                  className={
                    "form-control" +
                    (errors.lastName && touched.lastName ? " is-invalid" : "")
                  }
                />
                <div className="invalid-feedback">{errors.lastName}</div>
              </div>

              {/* email */}
              <div className="form-group col-md-6">
                <label>Email</label>
                <Field
                  name="email"
                  placeholder="example@abc.com"
                  type="text"
                  className={
                    "form-control" +
                    (errors.email && touched.email ? " is-invalid" : "")
                  }
                />
                <div className="invalid-feedback">{errors.email}</div>
              </div>

              {/* contactNo */}
              <div className="form-group col-md-6">
                <label>Contact Number</label>
                <Field
                  name="contactNo"
                  placeholder="+94770000000"
                  type="text"
                  className={
                    "form-control" +
                    (errors.contactNo && touched.contactNo ? " is-invalid" : "")
                  }
                />
                <div className="invalid-feedback">{errors.contactNo}</div>
              </div>

              {/* password */}
              <div className="form-group col-md-6">
                <label>Password</label>
                <Field
                  name="password"
                  placeholder="Password"
                  type="password"
                  className={
                    "form-control" +
                    (errors.password && touched.password ? " is-invalid" : "")
                  }
                />
                <div className="invalid-feedback">{errors.password}</div>
              </div>

              {/* confirmPassword */}
              <div className="form-group col-md-6">
                <label>Confirm Password</label>
                <Field
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  type="password"
                  className={
                    "form-control" +
                    (errors.confirmPassword && touched.confirmPassword
                      ? " is-invalid"
                      : "")
                  }
                />
                <div className="invalid-feedback">{errors.confirmPassword}</div>
              </div>

              {/* image upload */}
              <div className="form-group col-md-6">
                <label>Profile picture</label>
                <br />
                <br />
                <input
                  type="file"
                  name="file"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                  }}
                />
              </div>

              <br />
              {/* submit button */}
              <Button variant="primary" type="submit">
                Register
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default Register;
