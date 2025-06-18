import styles from '../components/ExtensionCard.module.css';
import Logo from "../assets/images/logo-console-plus.svg?react";

export default function ExtensionCard(){
    return (
        <div className={`${styles.card}`}>
            <Logo className={`${styles.logo}`}/>
            <div className={`${styles.text_container}`}>
                <h1>Title</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, error.</p>
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
