import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store/hooks';

import Header from '../../components/Header/Header';
import Notification from '../../components/common/Notification/Notification';
import PartnerCard from '../../components/PartnerCard/PartnerCard';

import getUsers from '../../store/thunks/getUsers';
import { setPage } from '../../store/slices/partnersSlice';

import showMoreImg from '../../assets/showMore.svg';

import links from '../../constants/links';

import styles from './PartnersPage.module.scss';

function PartnersPage() {
  const { token } = useAppSelector((state) => state.auth);
  const { partners, error, loading, page, showMore } = useAppSelector(
    (state) => state.partners
  );
  const dispatch = useAppDispatch();

  const [notification, setNotification] = useState(false);

  useEffect(() => {
    if (partners && !error && !loading) {
      setNotification(false);
    }

    // подумать про clearTimeout
    if (loading || error) {
      setNotification(true);
      setTimeout(() => {
        setNotification(false);
      }, 5000);
    }
  }, [partners, error, loading]);

  useEffect(() => {
    if (token) {
      dispatch(getUsers(page));
      dispatch(setPage());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showMoreClickHandler = () => {
    dispatch(getUsers(page));
    dispatch(setPage());
  };

  const notAuthorised = (
    <div className={styles.notAuthorised}>
      Для просмотра списка партнеров{' '}
      <Link to={links.signup} className={styles.link}>
        зарегистрируйтесь
      </Link>{' '}
      или{' '}
      <Link to={links.signin} className={styles.link}>
        войдите
      </Link>
    </div>
  );

  const showMoreBtn = (
    <button
      onClick={showMoreClickHandler}
      type="button"
      className={styles.showMoreBtn}
    >
      <span className={styles.showMoreText}>Показать еще</span>
      <img
        src={showMoreImg}
        className={styles.showMoreImg}
        alt="иконка - показать больше"
      />
    </button>
  );

  const cardsBlock = (
    <div className={styles.cardsBlock}>
      {partners?.map((partner) => (
        <PartnerCard
          key={partner.id}
          img={partner.avatar}
          name={partner.name}
        />
      ))}
    </div>
  );

  return (
    <main className={styles.wrapper}>
      <Header />
      {!token && notAuthorised}
      {error && notification && (
        <Notification
          type="error"
          text={`${error}. Попробуйте перезагрузить страницу`}
        />
      )}
      {loading && notification && (
        <Notification type="loading" text={`Идет загрузка`} />
      )}
      {partners.length > 0 && (
        <>
          {cardsBlock}
          {showMore && showMoreBtn}
        </>
      )}
    </main>
  );
}

export default PartnersPage;
