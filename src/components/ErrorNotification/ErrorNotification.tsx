import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { ErrorMessage } from '../../types/ErrorMessage';
import classNames from 'classnames';

type Props = {
  errorMessage: ErrorMessage | null;
  setErrorMessage: Dispatch<SetStateAction<ErrorMessage | null>>;
};

export const ErrorNotification: React.FC<Props> = props => {
  const { errorMessage, setErrorMessage } = props;

  useEffect(() => {
    if (!errorMessage) {
      return;
    }

    const timerId = setTimeout(() => {
      setErrorMessage(null);
    }, 3000);

    return () => {
      clearTimeout(timerId);
    };
  }, [errorMessage, setErrorMessage]);

  /* DON'T use conditional rendering to hide the notification */
  /* Add the 'hidden' class to hide the message smoothly */

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: !errorMessage },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setErrorMessage(null)}
      />
      {errorMessage}
    </div>
  );
};
