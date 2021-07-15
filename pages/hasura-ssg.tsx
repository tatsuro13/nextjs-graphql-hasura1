import { GetStaticProps } from 'next';
import { initializeApollo } from '../lib/apploClient';
import { GET_USERS } from '../queries/queries';
import { GetUsersQuery, Users } from '../types/generated/graphql';
import React from 'react';
import { VFC } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';

interface Props {
  users: ({
    __typename?: 'users';
  } & Pick<Users, 'id' | 'name' | 'created_at'>)[];
}

const HasuraSSG: VFC<Props> = ({ users }) => {
  return (
    <Layout title="SSG + ISR">
      <p className="mb-3 font-bold">SSG+ISR</p>
      {users?.map((user) => {
        return (
          <Link key={user.id} href={`/users/${user.id}`}>
            <a className="my-1 cursor-pointer" data-testid={`link-${user.id}`}>
              {user.name}
            </a>
          </Link>
        );
      })}
    </Layout>
  );
};

export default HasuraSSG;

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query<GetUsersQuery>({
    query: GET_USERS,
  });
  return {
    props: { users: data.users },
    revalidate: 1,
  };
};
