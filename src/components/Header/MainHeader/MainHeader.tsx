import React from 'react';

import styles from './MainHeader.module.scss';

function MainHeader() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.header}>Наша команда</h1>
      <p className={styles.headerText}>
        Это опытные специалисты, хорошо разбирающиеся во всех задачах, которые
        ложатся на их плечи, и умеющие находить выход из любых, даже самых
        сложных ситуаций.
      </p>
    </div>
  );
}

export default MainHeader;
