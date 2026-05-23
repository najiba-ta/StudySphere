import LoginPage from '@/components/LoginPage';
import React, { Suspense } from 'react';

export const metadata = {
  title: "StudySphere – Login",
};

const page = () => {
  return (
   <Suspense fallback={<div>Loading...</div>}>
    <LoginPage/>
   </Suspense>
  );
};

export default page;