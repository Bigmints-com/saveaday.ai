import type { NextPage } from "next";
import Head from "next/head";
import { AuthPanel } from '@saveaday/shared-auth/client';

const RegisterPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create account - SaveADay.ai</title>
        <meta name="description" content="Create your SaveADay.ai account" />
      </Head>
      <div className="flex min-h-screen w-full items-center justify-center bg-gray-50 px-6 py-16">
        <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-10 shadow-sm">
          <AuthPanel
            mode="register"
            title="Create your SaveADay.ai account"
            description="We'll send you a secure link to verify your email and finish setting up your account."
          />
        </div>
      </div>
    </>
  );
};

export default RegisterPage;

