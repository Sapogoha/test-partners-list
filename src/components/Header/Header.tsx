import React from 'react';
import { useWindowSize } from 'usehooks-ts';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

import Button from './Button/Button';
import MainHeader from './MainHeader/MainHeader';
import PartnerHeader from './PartnerHeader/PartnerHeader';

import { removePartners } from '../../store/slices/partnersSlice';
import { removeToken } from '../../store/slices/authSlice';
import { removePartner } from '../../store/slices/partnerSlice';

import logout from '../../assets/logout.svg';
import back from '../../assets/back.svg';

import links from '../../links';

import styles from './Header.module.scss';

type Props = {
  img?: string;
  name?: string;
};

function Header({ img, name }: Props) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { width } = useWindowSize();
  const { token } = useAppSelector((state) => state.auth);

  const clickExitHandler = () => {
    dispatch(removePartners());
    dispatch(removeToken());
    navigate(links.signin);
  };

  const clickBackHandler = () => {
    dispatch(removePartner());
    navigate(links.main);
  };

  return (
    <header className={styles.wrapper}>
      <div className={styles.btnWrapper}>
        {token && width > 499 ? (
          <Button
            type="button"
            className={`${styles.btn}  ${styles['btn-exit']}`}
            onClick={clickExitHandler}
          >
            Выход
          </Button>
        ) : (
          <Button
            onClick={clickExitHandler}
            type="button"
            className={`${styles.btn}  ${styles['btn-exit']}`}
          >
            <img src={logout} alt="кнопка - выход" />
          </Button>
        )}
        {token && img && name && width > 499 && (
          <Button
            onClick={clickBackHandler}
            type="button"
            className={`${styles.btn}  ${styles['btn-back']}`}
          >
            Назад
          </Button>
        )}
        {token && img && name && width < 500 && (
          <Button
            onClick={clickBackHandler}
            type="button"
            className={`${styles.btn}  ${styles['btn-back']}`}
          >
            <img src={back} alt="кнопка - назад" />
          </Button>
        )}
      </div>
      {!img && !name && <MainHeader />}
      {img && name && <PartnerHeader img={img} name={name} />}
    </header>
  );
}

export default Header;
