import styles from './ConfirmModal.module.css';

export default function ConfirmModal({ isOpen, onClose, onConfirm, message }) {
  if (!isOpen) return null;

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <p>{message}</p>
        <div className={styles.actions}>
          <button onClick={onClose} className={styles.cancel}>Cancelar</button>
          <button onClick={onConfirm} className={styles.confirm}>Remover</button>
        </div>
      </div>
    </div>
  );
}
