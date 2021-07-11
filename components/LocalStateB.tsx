import { useReactiveVar } from '@apollo/client';
import Link from 'next/link';
import React from 'react';
import { VFC } from 'react';
import { todoVar } from '../cache';

const LocalStateB: VFC = () => {
  const todos = useReactiveVar(todoVar);
  return (
    <>
      {todos.map((task, index) => {
        return (
          <p className="mb-3" key={index}>
            {task.title}
          </p>
        );
      })}
      <Link href="/local-state-a">
        <a>Back</a>
      </Link>
    </>
  );
};

export default LocalStateB;
