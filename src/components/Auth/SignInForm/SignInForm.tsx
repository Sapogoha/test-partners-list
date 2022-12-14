import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAppDispatch } from '../../../store/hooks';
import signIn from '../../../store/thunks/postSignIn';
import IAuth from '../IAuth';

import RedirectLink from '../RedirectLink/RedirectLink';
import Button from '../../Button/Button';

import eye from '../../../assets/eye.svg';
import eyeOff from '../../../assets/eyeOff.svg';

import links from '../../../links';

import styles from './SignInForm.module.scss';

const schema = yup
  .object({
    email: yup.string().trim().required('Введите корректный email').email(),
    password: yup
      .string()
      .required('Введите пароль')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/,
        'Пароль должен содержать от 6 символов: минимум одну строчную и одну заглавную букву, одну цифру'
      ),
  })
  .required();

function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuth>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });
  const dispatch = useAppDispatch();
  const onSubmit = (data: IAuth) => dispatch(signIn(data));

  const [iconShowPass, setIconShowPass] = useState(false);

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h2 className={styles.header}>Вход</h2>
        <div className={styles.itemWrapper}>
          <label className={styles.label}>Электронная почта</label>
          <input
            className={
              errors.email
                ? `${styles.input} ${styles['input-error']}`
                : styles.input
            }
            placeholder="example@mail.ru"
            type="email"
            {...register('email')}
          />
          {errors.email && (
            <div className={styles.error}>{errors.email.message}</div>
          )}
        </div>
        <div className={styles.itemWrapper}>
          <label className={styles.label}>Пароль</label>
          <div className={styles.inputWrapper}>
            <input
              className={
                errors.password
                  ? `${styles.input} ${styles['input-error']}`
                  : styles.input
              }
              placeholder="******"
              type={iconShowPass ? 'text' : 'password'}
              {...register('password')}
            ></input>
            <button
              type="button"
              className={styles.showIcon}
              onClick={() => {
                setIconShowPass((cur) => !cur);
              }}
            >
              <img
                src={iconShowPass ? eye : eyeOff}
                alt={`иконка - ${iconShowPass ? 'скрыть' : 'показать'}`}
              />
            </button>
          </div>

          {errors.password && (
            <div className={styles.error}>{errors.password.message}</div>
          )}
        </div>
        <Button type="submit" className={styles.button}>
          Войти
        </Button>
        <RedirectLink curPage={links.signin} />
      </form>
    </div>
  );
}

export default SignInForm;
