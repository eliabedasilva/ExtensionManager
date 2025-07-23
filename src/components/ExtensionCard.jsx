import styles from '../components/ExtensionCard.module.css';

export default function ExtensionCard({logo_path, name, description, isActive}){
    return (
        <div className={`${styles.card}`}>
            <img src={logo_path} alt={name} />
            <div className={`${styles.text_container}`}>
                <h1>{name}</h1>
                <p>{description}</p>
            </div>
            <div className={`${styles.button_container}`}>
                <button>Remove</button>
                <label className={styles.toggleSwitch}>
                    <input type="checkbox" />
                    <span className={styles.slider}></span>
                </label>
            </div>
        </div>
    )
}
