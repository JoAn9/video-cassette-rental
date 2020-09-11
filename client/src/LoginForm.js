import React, { useState } from 'react';
import { login } from './utils/auth';

function LoginForm({ onLogin }) {
  const [input, setInput] = useState({ email: '', password: '', error: false });

  const handleChange = event => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };

  const handleClick = async event => {
    event.preventDefault();
    const { email, password } = input;
    const response = await login(email, password);
    response ? onLogin() : setInput({ ...input, error: true });
  };

  const { email, password, error } = input;

  return (
    <form>
      <div className="field">
        <label className="label">Email</label>
        <div className="control">
          <input
            className="input"
            type="text"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Password</label>
        <div className="control">
          <input
            className="input"
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="field">
        <p className="help is-danger">{error && 'Invalid credentials'}</p>
        <div className="control">
          <button className="button is-link" onClick={handleClick}>
            Login
          </button>
        </div>
      </div>
    </form>
  );
}

export default LoginForm;
