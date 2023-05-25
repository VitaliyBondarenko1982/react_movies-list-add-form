import {
  ChangeEvent, FC, FormEvent, useState,
} from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { IValidation } from '../../types/IValidation';

interface Props {
  onAdd: (newMovie: Movie) => void;
}

const initialInputs = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

const initialValidateInputs: IValidation = {
  title: false,
  description: false,
  imgUrl: false,
  imdbUrl: false,
  imdbId: false,
};

export const NewMovie: FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [newMovie, setNewMovie] = useState(initialInputs);
  const [validateInputs, setValidateInputs] = useState<IValidation>(
    initialValidateInputs,
  );

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setNewMovie(prevMovie => ({ ...prevMovie, [name]: value }));
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    onAdd(newMovie);
    setNewMovie(initialInputs);
    setCount(prevCount => prevCount + 1);
  };

  const {
    title, description, imdbUrl, imgUrl, imdbId,
  } = newMovie;

  const isEmptyField = Object.values(newMovie).some(input => !input.trim());
  const isErrorsExists = Object.values(validateInputs).some(input => input);
  const submitDisabled = isEmptyField || isErrorsExists;

  return (
    <form className="NewMovie" key={count} onSubmit={onSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={onChange}
        validate={setValidateInputs}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={onChange}
        validate={setValidateInputs}
        required
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={onChange}
        validate={setValidateInputs}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={onChange}
        validate={setValidateInputs}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={onChange}
        validate={setValidateInputs}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={submitDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
