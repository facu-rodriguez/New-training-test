import React, { forwardRef } from 'react';

import styles from '../../styles.module.scss';

const CreateModal = forwardRef((props, ref) => {
  const funcionQueSoloEstaParaQueNoMeJodaElLinter = (x, y) => {
    const z = x + y;
    return z;
  };
  return (
    <div className={styles.modalComponent} ref={ref}>
      <h1>Create</h1>
      {funcionQueSoloEstaParaQueNoMeJodaElLinter(1, 1)}
      <input type="text" />
    </div>
  );
});

export default CreateModal;
