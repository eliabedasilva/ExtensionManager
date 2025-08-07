import { useState } from 'react';
import styles from '../components/ExtensionCard.module.css';
import ConfirmModal from './ConfirmModal';
import { useTheme } from './ThemeContext';

export default function ExtensionCard({ id, logo_path, name, description, isActive, onRemove, onToggleActive }) {
  const [isChecked, setIsChecked] = useState(isActive);
  const [showModal, setShowModal] = useState(false);
  const { theme, toggleTheme } = useTheme()


  const handleRemoveClick = () => setShowModal(true);
  const handleConfirm = async () => {
    try {
      await fetch(`http://localhost:3001/extensions/${id}`, {
        method: 'DELETE',
      });
      onRemove(id);
    } catch (error) {
      console.error("Erro ao remover:", error);
    } finally {
      setShowModal(false);
    }
  };

  const handleCheckboxChange = async () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    try {
      const res = await fetch(`http://localhost:3001/extensions/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: newValue }),
      });
      if (!res.ok) throw new Error(`Erro ao atualizar: ${res.status}`);
      onToggleActive(id, newValue);
    } catch (error) {
      console.error("Erro na atualização:", error);
      setIsChecked(!newValue);
    }
  };

  return (
    <div className={`${styles.card} ${styles[theme]}`}>
      <img src={logo_path} alt={name} />
      <div className={styles.text_container}>
        <h1 className={`${styles[theme]}`}>{name}</h1>
        <p className={`${styles[theme]}`}>{description}</p>
      </div>
      <div className={`${styles.button_container} ${styles[theme]}`}>
        <button onClick={handleRemoveClick}>Remove</button>
        <label className={styles.toggleSwitch}>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <span className={`${styles.slider} ${styles[theme]}`}></span>
        </label>
      </div>

      <ConfirmModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirm}
        message={`Do you really want to remove "${name}"?`}
      />
    </div>
  );
}
