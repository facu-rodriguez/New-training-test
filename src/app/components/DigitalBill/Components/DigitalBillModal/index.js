import React, { Fragment, useState } from 'react';
import i18 from 'i18next';
import { UTLabel, UTButton, UTTextInput, UTLoading } from '@widergy/energy-ui';
import { connect } from 'react-redux';
import { bool, string } from 'prop-types';

import DigitalBillsActions from 'redux/bills/actions';
import { checkEmail } from 'utils/checkEmailsUtils';
import { digitalTypes } from 'types/digitalTypes';
import { DELETE_METHOD, PUT_METHOD, POST_METHOD } from 'constants/actionMethod';

import styles from './styles.module.scss';

const DigitalBillModal = ({ show, type, email, onHide, digitalBills, loading, error, dispatch }) => {
  const [modifyInput, setModifyInput] = useState('');
  const [emailIsValid, setEmailIsValid] = useState(false);

  const handleModifyInput = inputEmail => {
    setEmailIsValid(checkEmail(inputEmail));
    setModifyInput(inputEmail);
  };

  const handleConfirm = typeAction => {
    switch (typeAction) {
      case PUT_METHOD:
        dispatch(DigitalBillsActions.putDigitalBills(modifyInput));
        break;

      case DELETE_METHOD:
        dispatch(DigitalBillsActions.deleteDigitalBills());
        break;

      case POST_METHOD:
        dispatch(DigitalBillsActions.postDigitalBills(modifyInput));
        break;

      default:
        break;
    }
  };

  const handleFinalClose = () => {
    onHide(false);
    switch (type) {
      case PUT_METHOD:
        dispatch(DigitalBillsActions.clearDigitalBills('PUT_DIGITAL_BILLS'));
        break;

      case DELETE_METHOD:
        dispatch(DigitalBillsActions.clearDigitalBills('DELETE_DIGITAL_BILLS'));
        break;

      case POST_METHOD:
        dispatch(DigitalBillsActions.clearDigitalBills('POST_DIGITAL_BILLS'));
        break;

      default:
        break;
    }
  };

  return show ? (
    <section className={styles.DigitalBillModalContainer}>
      {digitalBills?.mensaje === '' && !loading && !error ? (
        <div className={styles.DigitalBillModalContainerData}>
          <div className={styles.DigitalBillModalTitle}>
            <h1>{i18.t(`DigitalBill:actions:${type}:title`)}</h1>
          </div>

          <div className={styles.DigitalBillModalBody}>
            {type !== POST_METHOD && (
              <UTLabel>
                {i18.t(`DigitalBill:actions:${type}:body:text`)} ➜ {email}
              </UTLabel>
            )}

            {(type === PUT_METHOD || type === POST_METHOD) && (
              <Fragment>
                <UTLabel className={styles.DigitalBillModalBodySecondText}>
                  {i18.t(`DigitalBill:actions:${type}:body:inputText`)}
                </UTLabel>
                <UTTextInput
                  input={{ name: 'input', value: modifyInput }}
                  onChange={e => handleModifyInput(e.target.value)}
                  label="name@example.com"
                  meta={{ active: false }}
                  helperText={!emailIsValid && modifyInput && i18.t(`DigitalBill:emailIsValid`)}
                  error={!emailIsValid && modifyInput}
                />
              </Fragment>
            )}
          </div>

          <div className={styles.DigitalBillModalFooter}>
            <UTButton colorTheme="error" onClick={() => onHide(false)}>
              {i18.t(`DigitalBill:cancel`)}
            </UTButton>

            <UTButton
              disabled={(type === PUT_METHOD || type === POST_METHOD) && !emailIsValid}
              colorTheme="success"
              onClick={() => handleConfirm(type)}
            >
              {i18.t(`DigitalBill:accept`)}
            </UTButton>
          </div>
        </div>
      ) : (
        <div className={styles.DigitalBillModalContainerData}>
          <UTButton colorTheme="primary" onClick={handleFinalClose}>
            {i18.t(`DigitalBill:close`)}
          </UTButton>
          <UTLoading loading={loading}>
            {error ? (
              <UTLabel>{error}</UTLabel>
            ) : (
              <UTLabel className={styles.DigitalBillModalFinalMessage}>{digitalBills?.mensaje}</UTLabel>
            )}
          </UTLoading>
        </div>
      )}
    </section>
  ) : null;
};

DigitalBillModal.propTypes = {
  show: bool,
  type: string,
  email: string,
  onHide: bool,
  digitalBills: digitalTypes,
  loading: bool,
  error: bool
};

const mapStateToProps = store => ({
  digitalBills: store.bills.digitalBills,
  loading: store.bills.digitalBillsLoading,
  error: store.bills.digitalBillsError
});

export default connect(mapStateToProps)(DigitalBillModal);
