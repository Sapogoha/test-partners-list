import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';

import { toggleLikeBtn } from '../../store/slices/partnersSlice';

import Button from '../Button/Button';

import links from '../../links';

import emptyHeart from '../../assets/emptyHeart.svg';
import filledHeart from '../../assets/filledHeart.svg';

import styles from './PartnerCard.module.scss';

type Props = {
  img: string;
  name: string;
  id: number;
  likeBtn: boolean;
};

function PartnerCard({ img, name, id, likeBtn }: Props) {
  const navigate = useNavigate();
  const clickHandler = (id: number) => {
    navigate(`${links.partnerNoId}/${id}`);
  };
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(toggleLikeBtn(id));
  };
  return (
    <article className={styles.partner}>
      <img
        onClick={() => clickHandler(id)}
        className={styles.img}
        src={img}
        alt="аватарка"
      />
      <div onClick={() => clickHandler(id)} className={styles.name}>
        {name}
      </div>
      <Button type="button" className={styles.likeBtn} onClick={handleClick}>
        <img
          src={likeBtn ? filledHeart : emptyHeart}
          alt={`кнопка лайк ${likeBtn ? '' : 'не '}нажата`}
        />
      </Button>
    </article>
  );
}

export default PartnerCard;
