import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store/hooks';

import Header from '../../components/Header/Header';
import Notification from '../../components/Notification/Notification';
import PartnerInfo from '../../components/PartnerInfo/PartnerInfo';

import getUser from '../../store/thunks/getUser';

function PartnerPage() {
  const dispatch = useAppDispatch();
  const [notification, setNotification] = useState(false);
  const { id } = useParams();
  const { token } = useAppSelector((state) => state.auth);
  const { partner, error, loading } = useAppSelector((state) => state.partner);

  useEffect(() => {
    if (partner?.name && !error && !loading) {
      setNotification(false);
    }
    // подумать про clearTimeout
    if (loading || error) {
      setNotification(true);
      setTimeout(() => {
        setNotification(false);
      }, 5000);
    }
  }, [partner, error, loading]);

  useEffect(() => {
    if (token && id) {
      dispatch(getUser(Number(id)));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header img={partner?.avatar} name={partner?.name} />
      {error && notification && (
        <Notification
          type="error"
          text={`${error}. Попробуйте перезагрузить страницу или вернуться назад и выбрать другого партнера`}
        />
      )}
      {loading && notification && <Notification type="loading" />}
      {!loading && !error && partner?.email && (
        <PartnerInfo email={partner?.email} />
      )}
    </div>
  );
}

export default PartnerPage;
