import React, { Fragment, useState } from 'react';
import i18 from 'i18next';
import { UTLabel, UTButton } from '@widergy/energy-ui';
import { bool, array } from 'prop-types';

import styles from './styles.module.scss';
import DigitalBillModal from './Components/DigitalBillModal';

const DigitalBill = ({ billType, email }) => {
  const check = billType ? 'subscribed' : 'notSubscribed';
  const [modal, setModal] = useState(false);
  const [modalType, setModalType] = useState(null);

  const handleModal = type => {
    setModal(true);
    setModalType(type);
  };

  return (
    <Fragment>
      <UTLabel>{i18.t(`DigitalBill:${check}:title`)}</UTLabel>
      <div className={styles.DigitalBillsBtnContainer}>
        {billType ? (
          <Fragment>
            <UTButton colorTheme="success" onClick={() => handleModal('modificar')}>
              Modificar
            </UTButton>
            <UTButton colorTheme="error" onClick={() => handleModal('baja')}>
              Darse de baja
            </UTButton>
          </Fragment>
        ) : (
          <UTButton colorTheme="success" onClick={() => handleModal('alta')}>
            Alta
          </UTButton>
        )}
      </div>

      <DigitalBillModal show={modal} type={modalType} email={email} onHide={() => setModal(false)} />
    </Fragment>
  );
};

DigitalBill.propTypes = {
  billType: bool,
  // eslint-disable-next-line react/forbid-prop-types
  email: array
};

export default DigitalBill;
