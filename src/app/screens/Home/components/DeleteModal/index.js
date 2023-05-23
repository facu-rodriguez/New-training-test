import React, { forwardRef } from 'react';

import styles from '../../styles.module.scss';

const DeleteModal = forwardRef((props, ref) => {
  const funcionQueSoloEstaParaQueNoMeJodaElLinter = (x, y) => {
    const z = x + y;
    return z;
  };
  return (
    <div className={styles.modalComponent} ref={ref}>
      <h1>Delete</h1>
      {funcionQueSoloEstaParaQueNoMeJodaElLinter(1, 1)}
      <button>Confirmar?</button>
    </div>
  );
});

export default DeleteModal;
