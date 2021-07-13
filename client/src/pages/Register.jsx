import React from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

function Register() {
  const { register, handleSubmit, errors, setError } = useForm({
    criteriaMode: 'all',
  });
  const history = useHistory();

  const onSubmit = (data) => {
    console.log(data);
    axios({
      method: 'post',
      url: '/api/user/registerUser',
      data,
    })
      .then((res) => {
        console.log(res);
        history.push({
          pathname: '/',
        });
      })
      .catch((e) => {
        if (e.response.data.errors[0]) {
          setError(e.response.data.errors[0].field, {
            type: 'manual',
            message: e.response.data.errors[0].message,
          });
          console.log(e.response.data);
          console.log(errors);
        }
      });
  };

  return (
    <div className="col-lg-4 offset-lg-4 userform">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 className="userformTitle">Register</h3>
        <div className="form-group">
          <span>Username</span>
          <input
            type="username"
            name="username"
            className="form-control"
            placeholder="Username"
            ref={register({
              required: 'Enter your username',
            })}
          />
          {errors.username && (
            <p style={{ color: 'red' }}>{errors.username.message}</p>
          )}
        </div>
        <div className="form-group">
          <span>Password</span>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Enter password"
            ref={register({
              required: 'please enter a password',
              minLength: {
                value: 6,
                message: 'password must be atleast 6 characters',
              },
            })}
          />
          {errors.password && (
            <p style={{ color: 'red' }}>{errors.password.message}</p>
          )}
        </div>

        <div>
          <button type="submit" className="btn btn-primary btn-block">
            Register
          </button>
        </div>
        <p style={{ marginTop: '1rem', textAlign: 'center' }}>
          <a href="/login">Have an account? Log in!</a>
        </p>
      </form>
    </div>
  );
}

export default Register;
