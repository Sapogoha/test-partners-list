import React from 'react';

import AuthLayout from '../../components/Auth/AuthLayout/AuthLayout';
import SignUpForm from '../../components/Auth/SignUpForm/SignUpForm';

function SignUpPage() {
  return (
    <AuthLayout>
      <SignUpForm />
    </AuthLayout>
  );
}

export default SignUpPage;
