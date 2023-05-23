import React, { Fragment, useState } from 'react';
import i18 from 'i18next';
import { UTLabel, UTButton, UTTextInput, UTLoading } from '@widergy/energy-ui';
import { connect, useDispatch } from 'react-redux';

import DigitalBillsActions from 'redux/digitalBills/actions';

import styles from './styles.module.scss';

// eslint-disable-next-line react/prop-types
const DigitalBillModal = ({ show, type, email, onHide, digitalBills, loading, error }) => {
  const dispatch = useDispatch();
  const [modifyInput, setModifyInput] = useState('');
  const [emailIsValid, setEmailIsValid] = useState(false);

  const handleModifyInput = inputEmail => {
    const checkEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(inputEmail);
    setModifyInput(inputEmail);
    setEmailIsValid(checkEmail);
  };

  const digitalBillsMapper = {
    modificar: digitalBills?.putDigitalBills?.mensaje,
    baja: digitalBills?.deleteDigitalBills?.mensaje,
    alta: digitalBills?.postDigitalBills?.mensaje
  };

  const handleConfirm = async typeAction => {
    switch (typeAction) {
      case 'modificar':
        dispatch(DigitalBillsActions.putDigitalBills(modifyInput));
        setTimeout(() => {
          window.location.reload();
        }, 3000);
        break;

      case 'baja':
        dispatch(DigitalBillsActions.deleteDigitalBills());
        setTimeout(() => {
          window.location.reload();
        }, 3000);
        break;

      case 'alta':
        dispatch(DigitalBillsActions.postDigitalBills(modifyInput));
        setTimeout(() => {
          window.location.reload();
        }, 3000);
        break;

      default:
        break;
    }
  };

  return (
    <Fragment>
      {show ? (
        <Fragment>
          <section className={styles.DigitalBillModalContainer}>
            {Object.keys(digitalBills).length === 0 ? (
              <div className={styles.DigitalBillModalContainerData}>
                <div className={styles.DigitalBillModalTitle}>
                  <h1>{i18.t(`DigitalBill:actions:${type}:title`)}</h1>
                </div>

                <div className={styles.DigitalBillModalBody}>
                  {type !== 'alta' && (
                    <UTLabel>
                      {i18.t(`DigitalBill:actions:${type}:body:text`)} ➜ {email}
                    </UTLabel>
                  )}
                  {/* EMAIL INPUT */}
                  {type === 'modificar' || type === 'alta' ? (
                    <Fragment>
                      <UTLabel className={styles.DigitalBillModalBodySecondText}>
                        {i18.t(`DigitalBill:actions:${type}:body:inputText`)}
                      </UTLabel>
                      <UTTextInput
                        input={{ name: 'input', value: modifyInput }}
                        onChange={e => handleModifyInput(e.target.value)}
                        label="name@example.com"
                        meta={{ active: false }}
                        helperText={!emailIsValid && modifyInput && 'Ingrese un correo electrónico válido'}
                        error={!emailIsValid && modifyInput}
                      />
                    </Fragment>
                  ) : null}
                </div>

                <div className={styles.DigitalBillModalFooter}>
                  <UTButton colorTheme="error" onClick={() => onHide(false)}>
                    Cancelar
                  </UTButton>

                  <UTButton
                    disabled={(type === 'modificar' || type === 'alta') && !emailIsValid}
                    colorTheme="success"
                    onClick={() => handleConfirm(type)}
                  >
                    Aceptar
                  </UTButton>
                </div>
              </div>
            ) : (
              <div className={styles.DigitalBillModalContainerData}>
                <UTButton colorTheme="primary" onClick={() => onHide(false)}>
                  Cerrar
                </UTButton>
                <UTLoading loading={loading}>
                  {error ? (
                    <UTLabel>{error}</UTLabel>
                  ) : (
                    <UTLabel style={{ textAlign: 'center' }}>{digitalBillsMapper[type]}</UTLabel>
                  )}
                </UTLoading>
              </div>
            )}
          </section>
        </Fragment>
      ) : null}
    </Fragment>
  );
};

const mapStateToProps = store => ({
  digitalBills: store.digitalBills,
  loading:
    store.digitalBills.deleteDigitalBillsLoading ||
    store.digitalBills.putDigitalBillsLoading ||
    store.digitalBills.postDigitalBillsLoading,
  error:
    store.digitalBills.deleteDigitalBillsError ||
    store.digitalBills.putDigitalBillsError ||
    store.digitalBills.postDigitalBillsError
});

export default connect(mapStateToProps)(DigitalBillModal);
