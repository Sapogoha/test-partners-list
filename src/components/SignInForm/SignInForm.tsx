import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import eye from '../../assets/eye.svg';
import eyeOff from '../../assets/eyeOff.svg';

import links from '../../constants/links';

import styles from './SignInForm.module.scss';

interface IFormInputs {
  email: string;
  password: string;
}

const schema = yup
  .object({
    email: yup.string().trim().required('Введите корректный email').email(),
    password: yup
      .string()
      .required('Введите пароль')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/,
        'Пароль должен содержать 6 символов: минимум одну строчную и одну заглавную букву, одну цифру'
      ),
  })
  .required();

function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: IFormInputs) => console.log(data);

  const [iconShowPass, setIconShowPass] = useState(false);

  return (
    <main className={styles.wrapper}>
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

        <button type="submit" className={styles.button}>
          Войти
        </button>
        <div className={styles.redirect}>
          Еще нет аккаунта?{' '}
          <Link to={links.signup} className={styles.link}>
            {' '}
            Зарегистрироваться
          </Link>
        </div>
      </form>
    </main>
  );
}

export default SignInForm;
