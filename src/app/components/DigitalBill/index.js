import React, { Fragment, useState } from 'react';
import i18 from 'i18next';
import { UTLabel, UTButton } from '@widergy/energy-ui';
import { bool, arrayOf, string } from 'prop-types';

import styles from './styles.module.scss';
import DigitalBillModal from './Components/DigitalBillModal';

const DigitalBill = ({ billType, email }) => {
  const check = billType ? 'subscribed' : 'notSubscribed';
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState(null);

  const handleModal = type => {
    setOpenModal(true);
    setModalType(type);
  };

  return (
    <Fragment>
      <UTLabel>{i18.t(`DigitalBill:${check}:title`)}</UTLabel>
      <div className={styles.DigitalBillsBtnContainer}>
        {billType ? (
          <Fragment>
            <UTButton colorTheme="success" onClick={() => handleModal('modificar')}>
              {i18.t(`DigitalBill:actions:modificar:shortTitle`)}
            </UTButton>
            <UTButton colorTheme="error" onClick={() => handleModal('baja')}>
              {i18.t(`DigitalBill:actions:baja:shortTitle`)}
            </UTButton>
          </Fragment>
        ) : (
          <UTButton colorTheme="success" onClick={() => handleModal('alta')}>
            {i18.t(`DigitalBill:actions:alta:shortTitle`)}
          </UTButton>
        )}
      </div>

      <DigitalBillModal show={openModal} type={modalType} email={email} onHide={() => setOpenModal(false)} />
    </Fragment>
  );
};

DigitalBill.propTypes = {
  billType: bool,
  email: arrayOf(string)
};

export default DigitalBill;
