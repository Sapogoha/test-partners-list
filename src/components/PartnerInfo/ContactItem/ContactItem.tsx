import React from 'react';

import styles from './ContactItem.module.scss';

type Props = {
  alt: string;
  icon: string;
  children: JSX.Element;
};

function ContactItem({ alt, icon, children }: Props) {
  return (
    <li className={styles.contactItem}>
      <img className={styles.icon} src={icon} alt={alt} />
      <div className={styles.contact}>{children}</div>
    </li>
  );
}

export default ContactItem;
