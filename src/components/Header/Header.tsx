import React from 'react';
import { useWindowSize } from 'usehooks-ts';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

import { removePartners } from '../../store/slices/partnersSlice';
import { removeToken } from '../../store/slices/authSlice';

import logout from '../../assets/logout.svg';

import links from '../../constants/links';

import styles from './Header.module.scss';

function Header() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { width } = useWindowSize();
  const { token } = useAppSelector((state) => state.auth);

  const clickHandler = () => {
    dispatch(removePartners());
    dispatch(removeToken());
    navigate(links.signin);
  };

  const exitBtnBig = (
    <button onClick={clickHandler} type="button" className={styles.btn}>
      Выход
    </button>
  );

  const exitBtnSmall = (
    <button
      onClick={clickHandler}
      type="button"
      className={`${styles.btn} ${styles['btn-small']}`}
    >
      <img src={logout} alt="кнопка - выход" />
    </button>
  );

  const exitBtn = width > 499 ? exitBtnBig : exitBtnSmall;

  return (
    <header className={styles.wrapper}>
      <h1 className={styles.header}>Наша команда</h1>
      <p className={styles.headerText}>
        Это опытные специалисты, хорошо разбирающиеся во всех задачах, которые
        ложатся на их плечи, и умеющие находить выход из любых, даже самых
        сложных ситуаций.
      </p>
      {token && exitBtn}
    </header>
  );
}

export default Header;
