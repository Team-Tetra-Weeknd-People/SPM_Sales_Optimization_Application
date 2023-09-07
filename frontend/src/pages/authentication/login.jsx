import "../../styles/sudul/Login.css";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Swal from "sweetalert2";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

function Login() {
  const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(8, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
  });
  async function login(values) {
    const login = { email: values.email, password: values.password };
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/user/login`, login)
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Successful",
          text: "Login Successfully!",
        });
        sessionStorage.setItem("user", res.data.user);
        setTimeout(()=>{
          window.location.href = "/";
        },1500);
        
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Please Check Your Email & Password!!",
          footer: "Your Credentails Are Invalid!!",
        });
      });
  }
  return (
    <>
      <div className="login-container">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={loginSchema}
          onSubmit={(values) => {
            console.log(values);
            login(values);
          }}
        >
          {({ errors, touched }) => (
            <Form>
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

              <br />
              {/* submit button */}
              <Button variant="primary" type="submit">
                Login
              </Button>
            </Form>
          )}
        </Formik>
        <div>
          <a href="./register">Register</a>
        </div>
      </div>
    </>
  );
}

export default Login;
