import type { NextPage } from "next";
import Head from "next/head";
import { AuthPanel } from '@saveaday/shared-auth/client';

const LoginPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Sign in - SaveADay.ai</title>
        <meta name="description" content="Sign in to SaveADay.ai" />
      </Head>
      <div className="flex min-h-screen w-full items-center justify-center bg-gray-50 px-6 py-16">
        <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-10 shadow-sm">
          <AuthPanel
            mode="signIn"
            title="Sign in to SaveADay.ai"
            description="Use your password, magic link, or Google to access all your apps."
          />
        </div>
      </div>
    </>
  );
};

export default LoginPage;

