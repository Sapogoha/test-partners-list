import React from 'react';
import { useNavigate } from 'react-router-dom';

import links from '../../links';

import styles from './PartnerCard.module.scss';

type Props = {
  img: string;
  name: string;
  id: number;
};

function PartnerCard({ img, name, id }: Props) {
  const navigate = useNavigate();
  const clickHandler = (id: number) => {
    navigate(`${links.partnerNoId}/${id}`);
  };
  return (
    <article className={styles.partner} onClick={() => clickHandler(id)}>
      <img className={styles.img} src={img} alt="аватарка" />
      <div className={styles.name}>{name}</div>
    </article>
  );
}

export default PartnerCard;
