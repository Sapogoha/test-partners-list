import React from 'react';
import styles from './Notification.module.scss';

type Props = {
  type: string;
  text?: string;
};

function Notification({ type, text }: Props) {
  return (
    <div className={`${styles.notification} ${styles[`notification-${type}`]}`}>
      {type === 'loading' ? 'Идет загрузка' : text}
    </div>
  );
}

export default Notification;
