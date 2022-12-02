import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../store/hooks';

import Notification from '../../Notification/Notification';

import links from '../../../links';

import styles from './AuthLayout.module.scss';

type Props = {
  children: JSX.Element;
};

function AuthLayout({ children }: Props) {
  const navigate = useNavigate();
  const { token, error, loading } = useAppSelector((state) => state.auth);
  const [notification, setNotification] = useState(false);

  useEffect(() => {
    if (token && !error && !loading) {
      setNotification(false);
      navigate(links.main);
    }

    // подумать про clearTimeout
    if (loading || error) {
      setNotification(true);
      setTimeout(() => {
        setNotification(false);
      }, 2500);
    }
  }, [token, error, loading, navigate]);

  return (
    <main className={styles.wrapper}>
      {children}
      {loading && notification && <Notification type="loading" />}
      {error && notification && <Notification type="error" text="Ошибка" />}
    </main>
  );
}

export default AuthLayout;
