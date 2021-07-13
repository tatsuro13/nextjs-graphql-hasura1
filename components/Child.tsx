/* eslint-disable react/display-name */
import { FormEvent, memo, VFC } from 'react';

interface Props {
  printMsg: () => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
}

const Child: VFC<Props> = memo(({ printMsg, handleSubmit }) => {
  return (
    <>
      <p>Child Component</p>
      <button
        className="my-3 py-1 px-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-2xl focus:outline-none"
        onClick={printMsg}
      >
        click
      </button>
    </>
  );
});

export default Child;
