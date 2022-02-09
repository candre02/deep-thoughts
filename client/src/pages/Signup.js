// import files
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

// import AuthService from utils dir and auth file
import Auth from '../utils/auth';

const Signup = () => {
  // useState() capturing form field data from user and storing it in state using Hook from React
  const [formState, setFormState] = useState({ 
    username: '', 
    email: '', 
    password: '' 
  });
  
  // useMutation Hook creates and prepears a js function wraps around mutation code and returns
  // returns addUser function thats returned
  // captures the err, destructed err obj
  const [addUser, { error }] = useMutation(ADD_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      // ... spread operator
      ...formState,
      [name]: value
    });
  };

  // submit form (notice the async!) 
  // async/await instead of .then() and .catch()
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // use try/catch instead of promises to handle errors "try again"
    try {
      // execute addUser mutation and pass in variable data from form
      const { data } = await addUser({
        // ... spread operator
        // variables to be an obj with key/value pair, match w/ formState obj
        variables: { ...formState }
      });
      
      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-md-6">
        <div className="card">
          <h4 className="card-header">Sign Up</h4>
          <div className="card-body">
            <form onSubmit={handleFormSubmit}>
              <input
                className="form-input"
                placeholder="Your username"
                name="username"
                type="username"
                id="username"
                value={formState.username}
                onChange={handleChange}
              />
              <input
                className="form-input"
                placeholder="Your email"
                name="email"
                type="email"
                id="email"
                value={formState.email}
                onChange={handleChange}
              />
              <input
                className="form-input"
                placeholder="******"
                name="password"
                type="password"
                id="password"
                value={formState.password}
                onChange={handleChange}
              />
              <button className="btn d-block w-100" type="submit">
                Submit
              </button>
            </form>
            {/* returning the error, JSX */}
            {error && <div>Sign up failed</div>}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;
