import React from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

function Login() {
  const { register, handleSubmit, errors, setError } = useForm({
    criteriaMode: 'all',
  });
  const history = useHistory();

  const onSubmit = (data) => {
    console.log(data);
    axios({
      method: 'post',
      url: '/api/user/loginUser',
      data,
    })
      .then((res) => {
        console.log(res);
        history.push({
          pathname: '/',
        });
        // window.href.location = '../';
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
    <div className="col-lg-4 offset-lg-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>Login</h3>
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
        <p className="forgot-password text-right">
          <a href="/">Forgot Password?</a>
        </p>

        <div>
          <button type="submit" className="btn btn-primary btn-block">
            Login
          </button>
        </div>
        <p style={{ marginTop: '1rem', textAlign: 'center' }}>
          <a href="/register">Don't have an account yet? Sign up!</a>
        </p>
      </form>
    </div>
  );
}

export default Login;
