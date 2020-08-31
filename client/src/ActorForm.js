import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { addActor } from './requests';

function ActorForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    description: '',
  });

  let history = useHistory();

  const handleChangeName = event => {
    setErrors({ ...errors, name: '' });
    setName(event.target.value);
  };

  const handleChangeDescription = event => {
    setErrors({ ...errors, description: '' });
    setDescription(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const errorClass = 'is-danger';

    if (!name) {
      setErrors({ ...errors, name: errorClass });
      return;
    }
    if (!description) {
      setErrors({ ...errors, description: errorClass });
      return;
    }

    const actor = await addActor({
      name,
      description,
    });
    history.push(`/actors/${actor.id}`);
  };

  return (
    <div>
      <h1 className="title">New Actor</h1>
      <div className="box">
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input
                className={`input ${errors.name}`}
                type="text"
                name="name"
                value={name}
                onChange={handleChangeName}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Description</label>
            <div className="control">
              <textarea
                className={`input ${errors.description}`}
                style={{ height: '10em' }}
                name="description"
                value={description}
                onChange={handleChangeDescription}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button className="button is-link" type="submit">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ActorForm;
