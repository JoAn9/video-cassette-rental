import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createMovie } from './requests';

function MovieForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  let history = useHistory();

  const handleChangeTitle = event => {
    setTitle(event.target.value);
  };

  const handleChangeDescription = event => {
    setDescription(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const actorId = 'BJHw1NEXv'; // to fix!!!!!!!
    const movie = await createMovie({ actorId, title, description });
    history.push(`/movies/${movie.id}`);
  };

  return (
    <div>
      <h1 className="title">New Movie</h1>
      <div className="box">
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Title</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="title"
                value={title}
                onChange={handleChangeTitle}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Description</label>
            <div className="control">
              <textarea
                className="input"
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

export default MovieForm;
