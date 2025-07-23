import { useState } from 'react';
import styles from '../components/ExtensionCard.module.css';

export default function ExtensionCard({ id, logo_path, name, description, isActive }) {
    const [isChecked, setIsChecked] = useState(isActive);

    const handleCheckboxChange = async () => {
        const newValue = !isChecked;
        setIsChecked(newValue);

        try {
            const response = await fetch(`http://localhost:3001/extensions/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ isActive: newValue }),
            });

            if (!response.ok) {
                throw new Error(`Erro ao atualizar: ${response.status}`);
            }

            const updated = await response.json();
            console.log('Extensão atualizada:', updated);
        } catch (err) {
            console.error('Erro na requisição:', err);
            setIsChecked(!newValue);
        }
    };

    return (
        <div className={styles.card}>
            <img src={logo_path} alt={name} />
            <div className={styles.text_container}>
                <h1>{name}</h1>
                <p>{description}</p>
            </div>
            <div className={styles.button_container}>
                <button>Remove</button>
                <label className={styles.toggleSwitch}>
                    <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                    />
                    <span className={styles.slider}></span>
                </label>
            </div>
        </div>
    );
}
