import React from 'react';

import AuthLayout from '../../components/Auth/AuthLayout/AuthLayout';
import SignInForm from '../../components/Auth/SignInForm/SignInForm';

function SignInPage() {
  return (
    <AuthLayout>
      <SignInForm />
    </AuthLayout>
  );
}

export default SignInPage;
