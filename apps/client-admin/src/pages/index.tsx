import RootLayout from '@components/layouts/base';
import type { PageProps } from '@components/types';
import { NextPage } from 'next';
import Link from 'next/link';

const Page: NextPage<PageProps> = ({ params, searchParams }) => {
  return (
    <RootLayout pageTitle="admin">
      <div className="">
        <h1 className="">
          Typography {'<'}h1{'>'}
        </h1>
        <h2 className="">
          Typography {'<'}h2{'>'}
        </h2>
        <h3 className="">
          Typography {'<'}h3{'>'}
        </h3>
        <h4 className="">
          Typography {'<'}h4{'>'}
        </h4>
        <p className="">
          Typography {'<'}p{'>'}
        </p>
      </div>
    </RootLayout>
  );
};

export default Page;
