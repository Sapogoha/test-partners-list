import React from 'react';

import styles from './PartnerHeader.module.scss';

type Props = {
  img: string;
  name: string;
};

function PartnerHeader({ img, name }: Props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.textWrapper}>
        <h1 className={styles.header}>{name}</h1>
        <div className={styles.title}>Партнер</div>
      </div>

      <img className={styles.img} src={img} alt="аватарка" />
    </div>
  );
}

export default PartnerHeader;
