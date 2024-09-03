import React from "react";
import { createPortal } from "react-dom";
import styles from "./modal.module.css";

const PurchaseModal = ({ children, closeModal }) => {
  return createPortal(
    <>
      <div className={styles.modal_back_drop} onClick={closeModal}></div>
      <div>
        <div className={styles.modal_content}>
          <div className={styles.modal_close_btn_div}>
            <button className={styles.close_btn} onClick={closeModal}>
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div className={styles.modal_children}>{children}</div>
        </div>
      </div>
    </>,
    document.getElementById("modal")
  );
};

export default PurchaseModal;
