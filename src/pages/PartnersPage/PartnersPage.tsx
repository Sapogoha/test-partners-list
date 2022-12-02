import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store/hooks';

import Header from '../../components/Header/Header';
import Notification from '../../components/Notification/Notification';
import PartnerCard from '../../components/PartnerCard/PartnerCard';

import getUsers from '../../store/thunks/getUsers';
import { setPage } from '../../store/slices/partnersSlice';

import showMoreImg from '../../assets/showMore.svg';

import links from '../../links';

import styles from './PartnersPage.module.scss';

function PartnersPage() {
  const dispatch = useAppDispatch();
  const [notification, setNotification] = useState(false);
  const { token } = useAppSelector((state) => state.auth);
  const { partners, error, loading, page, showMore } = useAppSelector(
    (state) => state.partners
  );

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
    if (token && partners.length < 1) {
      dispatch(getUsers(page));
      dispatch(setPage());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showMoreClickHandler = () => {
    dispatch(getUsers(page));
    dispatch(setPage());
  };

  return (
    <main className={styles.wrapper}>
      <Header />
      {!token && (
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
      )}
      {error && notification && (
        <Notification
          type="error"
          text={`${error}. Попробуйте перезагрузить страницу`}
        />
      )}
      {loading && notification && <Notification type="loading" />}
      {partners.length > 0 && (
        <>
          <div className={styles.cardsBlock}>
            {partners?.map((partner) => (
              <PartnerCard
                id={partner.id}
                key={partner.id}
                img={partner.avatar}
                name={partner.name}
                likeBtn={partner.likeBtn}
              />
            ))}
          </div>
          {showMore && (
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
          )}
        </>
      )}
    </main>
  );
}

export default PartnersPage;
