import React, { useState, ReactElement } from 'react';

type searchProps = {
  handleSearch: (
    text: string,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
};

function SearchMovie({ handleSearch }: searchProps): ReactElement {
  const [text, setText] = useState('');

  const handleChangeSearchText = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setText(event.target.value);
  };

  return (
    <form>
      <input
        className="input search"
        type="text"
        name="title"
        placeholder="Search Movie..."
        onChange={handleChangeSearchText}
        value={text}
      />
      <button
        className="button is-link"
        type="submit"
        onClick={e => handleSearch(text, e)}
      >
        Find
      </button>
    </form>
  );
}

export default SearchMovie;
