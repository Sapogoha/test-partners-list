import React from 'react';

import styles from './PartnerCard.module.scss';

type Props = {
  img: string;
  name: string;
};

function PartnerCard({ img, name }: Props) {
  return (
    <article className={styles.partner}>
      <img className={styles.img} src={img} alt="аватарка" />
      <div className={styles.name}>{name}</div>
    </article>
  );
}

export default PartnerCard;
