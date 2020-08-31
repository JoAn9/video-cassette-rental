import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { createMovie, loadActors } from './requests';

function MovieForm() {
  const [actors, setActors] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedActor, setSelectedActor] = useState('');
  const [errors, setErrors] = useState({
    actor: '',
    title: '',
    description: '',
  });

  useEffect(() => {
    const fetchActors = async () => {
      const loadedActors = await loadActors();
      setActors(loadedActors);
    };
    fetchActors();
    return () => {};
  }, []);

  let history = useHistory();

  const handleChangeActor = event => {
    setErrors({ ...errors, selectedActor: '' });
    setSelectedActor(event.target.value);
  };

  const handleChangeTitle = event => {
    setErrors({ ...errors, title: '' });
    setTitle(event.target.value);
  };

  const handleChangeDescription = event => {
    setErrors({ ...errors, description: '' });
    setDescription(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const errorClass = 'is-danger';
    if (!selectedActor) {
      setErrors({ ...errors, selectedActor: errorClass });
      return;
    }
    if (!title) {
      setErrors({ ...errors, title: errorClass });
      return;
    }
    if (!description) {
      setErrors({ ...errors, description: errorClass });
      return;
    }

    const movie = await createMovie({
      actorId: actors.find(item => item.name === selectedActor).id,
      title,
      description,
    });
    history.push(`/movies/${movie.id}`);
  };

  return (
    <div>
      <h1 className="title">New Movie</h1>
      <div className="box">
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Choose Actor</label>
            <div className={`select ${errors.selectedActor}`}>
              <select value={selectedActor} onChange={handleChangeActor}>
                <option defaultValue hidden>
                  actors
                </option>
                {actors.map(item => (
                  <option key={item.id}>{item.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="field">
            <label className="label">Title</label>
            <div className="control">
              <input
                className={`input ${errors.title}`}
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

export default MovieForm;
