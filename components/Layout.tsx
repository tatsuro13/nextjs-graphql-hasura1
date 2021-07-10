import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { VFC } from 'react';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  title: string;
}

const Layout: VFC<Props> = ({ children, title = 'Welcome to Next.js' }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <header>
        <nav>
          <div>
            <div>
              <Link href="/">
                <a data-testid="home-nav">Home</a>
              </Link>
            </div>
          </div>
        </nav>
      </header>
      <main>{children}</main>
      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Layout;
