import React from 'react';
import { useNavigate } from 'react-router-dom';

import links from '../../links';

import styles from './NotFoundPage.module.scss';

function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <section className={styles.redirect}>
      <h2 className={styles.header}>Страница не найдена</h2>
      <p className={styles.text}>
        Нам очень жаль. Посмотрите другие страницы - у нас много интересного!
      </p>
      <div className={styles.buttonWrapper}>
        <button
          className={styles.button}
          onClick={() => navigate(links.main)}
          type="button"
        >
          На главную
        </button>
      </div>
    </section>
  );
}

export default NotFoundPage;
