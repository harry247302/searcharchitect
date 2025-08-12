"use client";
import React, { useEffect, useState } from 'react';
import Main from './Main';
import { useRouter } from 'next/navigation';

const Page = () => {
  const [token, setToken] = useState('');
  const router = useRouter();

  useEffect(() => {
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    };

    const token = getCookie('architectToken');
    setToken(token);

    if (!token) {
      router.push('/');
    }
  }, [router]);

  if (!token) return null; // or a loading spinner

  return <Main />;
};

export default Page;
