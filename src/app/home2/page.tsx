import React from 'react';
import Link from 'next/link';

export default function Home2() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Home2 Page</h1>
      <p className="mb-4">This is a new page called home2.</p>
      <Link href="/" className="text-blue-500 hover:underline">
        Back to Home
      </Link>
    </main>
  );
} 