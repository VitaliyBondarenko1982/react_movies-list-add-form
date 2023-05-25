import classNames from 'classnames';
import React, {
  ChangeEvent, Dispatch, SetStateAction, useEffect, useState,
} from 'react';
import { IValidation } from '../../types/IValidation';

type Props = {
  name: string,
  value: string,
  label?: string,
  required?: boolean,
  onChange: (event: ChangeEvent<HTMLInputElement>) => void,
  validate: Dispatch<SetStateAction<IValidation>>;
};

function getRandomDigits() {
  return Math.random().toString().slice(2);
}

const validation = (url: string, name: string): boolean => {
  if (!['imgUrl', 'imdbUrl'].includes(name) || !url) {
    return false;
  }

  // eslint-disable-next-line max-len
  const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  return !pattern.test(url);
};

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  required = false,
  onChange,
  validate,
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  const [touched, setTouched] = useState(false);
  const hasError = touched && required && !value.trim();

  const isNotValid = touched && validation(value.trim(), name);

  useEffect(() => {
    if (hasError || isNotValid) {
      validate(prev => ({ ...prev, [name]: true }));
    }
  }, [hasError, isNotValid]);

  const onFocus = () => {
    validate(prev => ({ ...prev, [name]: false }));
    setTouched(false);
  };

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>

      <div className="control">
        <input
          name={name}
          id={id}
          data-cy={`movie-${name}`}
          className={classNames('input', {
            'is-danger': isNotValid || hasError,
          })}
          type="text"
          placeholder={`Enter ${label}`}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={() => setTouched(true)}
        />
      </div>
      {hasError && <p className="help is-danger">{`${label} is required`}</p>}
      {isNotValid && <p className="help is-danger">{`${label} is not valid`}</p>}
    </div>
  );
};
