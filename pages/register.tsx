import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Register() {
  const router = useRouter();

  useEffect(() => {
    window.location.href = 'https://app.saveaday.ai/register';
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <p className="text-gray-500">Redirecting to register...</p>
    </div>
  );
}
