import React from 'react';
import { Link } from 'react-router-dom';

import styles from './RedirectLink.module.scss';

import links from '../../../constants/links';

function RedirectLink({ curPage }: any) {
  return (
    <span className={styles.redirect}>
      {curPage === links.signup ? 'Уже есть аккаунт?' : 'Еще нет аккаунта?'}{' '}
      <Link
        to={curPage === links.signup ? links.signin : links.signup}
        className={styles.link}
      >
        {' '}
        {curPage === links.signup ? 'Войти' : 'Зарегистрироваться'}
      </Link>
    </span>
  );
}

export default RedirectLink;
