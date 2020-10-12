import React, { ReactElement } from 'react';
import { login } from './utils/auth';

type LoginProps = {
  onLogin: () => void;
};

function LoginForm({ onLogin }: LoginProps): ReactElement {
  const [input, setInput] = React.useState({
    email: '',
    password: '',
    error: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };

  const handleClick = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, password } = input;
    const response = await login(email, password);
    response ? onLogin() : setInput({ ...input, error: true });
  };

  const { email, password, error } = input;

  return (
    <form data-test="form-component" onSubmit={handleClick}>
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
        <p className="help is-danger" data-test="error-element">
          {error && 'Invalid credentials'}
        </p>
        <div className="control">
          <button
            className="button is-link"
            type="submit"
            data-test="login-button"
          >
            Login
          </button>
        </div>
      </div>
    </form>
  );
}

export default LoginForm;
