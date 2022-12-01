import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAppDispatch } from '../../../store/hooks';
import signUp from '../../../store/thunks/postSignUp';
import ISignInForm from '../../../types/IAuth';

import RedirectLink from '../RedirectLink/RedirectLink';

import eye from '../../../assets/eye.svg';
import eyeOff from '../../../assets/eyeOff.svg';

import links from '../../../constants/links';

import styles from './SignUpForm.module.scss';

interface IFormInputs {
  firstName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const schema = yup
  .object({
    firstName: yup
      .string()
      .trim()
      .required('Введите имя')
      .matches(
        /^[a-zA-Zа-яёА-ЯЁ]+$/,
        'Имя может содержать только строчные и заглавные буквы'
      ),
    email: yup.string().trim().required('Введите корректный email').email(),
    password: yup
      .string()
      .required('Введите пароль')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/,
        'Пароль должен содержать от 6 символов: минимум одну строчную и одну заглавную букву, одну цифру'
      ),
    confirmPassword: yup
      .string()
      .required('Введите пароль')
      .oneOf([yup.ref('password'), null], 'Пароли должны совпадать'),
  })
  .required();

function SignUpForm() {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const dummyData: ISignInForm = {
    email: 'eve.holt@reqres.in',
    password: 'pistol',
  };

  const onSubmit = (data: IFormInputs) => {
    console.log(data);
    dispatch(signUp(dummyData));
  };

  const [iconShowPass, setIconShowPass] = useState(false);
  const [iconShowConfirmPass, setIconShowConfirmPass] = useState(false);

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h2 className={styles.header}>Регистрация</h2>
        <div className={styles.itemWrapper}>
          <label className={styles.label}>Имя</label>
          <input
            className={
              errors.firstName
                ? `${styles.input} ${styles['input-error']}`
                : styles.input
            }
            placeholder="Артем"
            type="text"
            {...register('firstName')}
          />
          {errors.firstName && (
            <div className={styles.error}>{errors.firstName.message}</div>
          )}
        </div>

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
        <div className={styles.itemWrapper}>
          <label className={styles.label}>Подтвердите пароль</label>
          <div className={styles.inputWrapper}>
            <input
              className={
                errors.confirmPassword
                  ? `${styles.input} ${styles['input-error']}`
                  : styles.input
              }
              placeholder="******"
              type={iconShowConfirmPass ? 'text' : 'password'}
              {...register('confirmPassword')}
            ></input>
            <button
              type="button"
              className={styles.showIcon}
              onClick={() => {
                setIconShowConfirmPass((cur) => !cur);
              }}
            >
              <img
                src={iconShowConfirmPass ? eye : eyeOff}
                alt={`иконка - ${iconShowConfirmPass ? 'скрыть' : 'показать'}`}
              />
            </button>
          </div>
          {errors.confirmPassword && (
            <div className={styles.error}>{errors.confirmPassword.message}</div>
          )}
        </div>

        <button type="submit" className={styles.button}>
          Зарегистрироваться
        </button>
        <RedirectLink curPage={links.signup} />
      </form>
    </div>
  );
}

export default SignUpForm;
