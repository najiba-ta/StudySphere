import LoginPage from '@/components/LoginPage';
import React, { Suspense } from 'react';

const page = () => {
  return (
   <Suspense fallback={<div>Loading...</div>}>
    <LoginPage/>
   </Suspense>
  );
};

export default page;