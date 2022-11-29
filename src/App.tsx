import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SignUpPage from './pages/SignUpPage/SignUpPage';
import SignInPage from './pages/SignInPage/SignInPage';
import PartnersPage from './pages/PartnersPage/PartnersPage';
import PartnerPage from './pages/PartnerPage/PartnerPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

function App() {
  const start = '/test-partners-list';
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`${start}/`} element={<PartnersPage />} />
        <Route path={`${start}/partner/:id`} element={<PartnerPage />} />
        <Route path={`${start}/signin`} element={<SignInPage />} />
        <Route path={`${start}/signup`} element={<SignUpPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
