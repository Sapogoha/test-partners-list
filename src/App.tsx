import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SignUpPage from './pages/SignUpPage/SignUpPage';
import SignInPage from './pages/SignInPage/SignInPage';
import PartnersPage from './pages/PartnersPage/PartnersPage';
import PartnerPage from './pages/PartnerPage/PartnerPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

import links from './constants/links';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={links.main} element={<PartnersPage />} />
        <Route path={links.partner} element={<PartnerPage />} />
        <Route path={links.signin} element={<SignInPage />} />
        <Route path={links.signup} element={<SignUpPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
