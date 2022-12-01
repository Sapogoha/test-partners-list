import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../store/hooks';

import links from '../../../constants/links';

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

  const notificationLoading = (
    <div className={`${styles.notification} ${styles['notification-loading']}`}>
      Загрузка
    </div>
  );

  const notificationError = (
    <div className={`${styles.notification} ${styles['notification-error']}`}>
      Ошибка
    </div>
  );

  return (
    <main className={styles.wrapper}>
      {children}
      {loading && notification && notificationLoading}
      {error && notification && notificationError}
    </main>
  );
}

export default AuthLayout;
