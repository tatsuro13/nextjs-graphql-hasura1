/* eslint-disable @next/next/link-passhref */
import { GetStaticPaths, GetStaticProps } from 'next';
import { initializeApollo } from '../../lib/apploClient';
import { GET_USERBY_ID, GET_USERIDS } from '../../queries/queries';
import {
  GetUserByIdQuery,
  GetUsersQuery,
  Users,
} from '../../types/generated/graphql';

import React from 'react';
import { VFC } from 'react';
import Layout from '../../components/Layout';
import Link from 'next/link';
import { ChevronDoubleLeftIcon } from '@heroicons/react/solid';

interface Props {
  user: {
    __typename?: 'users';
  } & Pick<Users, 'id' | 'name' | 'created_at'>;
}

const UserDetail: VFC<Props> = ({ user }) => {
  if (!user) {
    return <Layout title="loading">Loading...</Layout>;
  }
  return (
    <Layout title={user.name}>
      <p className="text-xl font-bold">User detail</p>
      <p className="m-4">
        {'ID : '}
        {user.id}
      </p>
      <p className="mb-4 text-xl font-bold">{user.name}</p>
      <p className="mb-12">{user.created_at}</p>
      <Link href="/hasura-ssg">
        <div className="flex cursor-pointer mt-12">
          <ChevronDoubleLeftIcon
            data-testid="auth-to-main"
            className="h-5 w-5 mr-3 text-blue-500"
          />
          <span data-testid="back-to-main">main-ssg-pageに戻る</span>
        </div>
      </Link>
    </Layout>
  );
};

export default UserDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  const aplloClient = initializeApollo();
  const { data } = await aplloClient.query<GetUsersQuery>({
    query: GET_USERIDS,
  });
  const paths = data.users.map((user) => ({
    params: {
      id: user.id,
    },
  }));
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const aplloClient = initializeApollo();
  const { data } = await aplloClient.query<GetUserByIdQuery>({
    query: GET_USERBY_ID,
    variables: { id: params.id },
  });
  return {
    props: {
      user: data.users_by_pk,
    },
    revalidate: 1,
  };
};
