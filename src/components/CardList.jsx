import { useState, useEffect } from "react";
import ExtensionCard from "./ExtensionCard";
import styles from "./CardList.module.css"

export default function CardList() {
    const [extensions, setExtensions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchExtensions = async () => {
            try {
                setLoading(true);
                const response = await fetch('http://localhost:3001/extensions'); 
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                setExtensions(data);
            } catch (err) {
                setError(err.message);
                console.error('Erro ao buscar extensões:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchExtensions();
    }, []);

    if (loading) {
        return (
            <div className={styles.card_list}>
                <div className={styles.loading}>Loading...</div>
            </div>
        );
    }

    if (error && extensions.length === 0) {
        return (
            <div className={styles.card_list}>
                <div className={styles.error}>
                    Error: {error}
                </div>
            </div>
        );
    }

    return (
        <div className={styles.card_list}>
            {extensions.map((extension) => (
                <ExtensionCard 
                    key={extension.id || extension.name}
                    id={extension.id}
                    logo_path={extension.logo}
                    name={extension.name}
                    description={extension.description}
                    isActive={extension.isActive}
                />
            ))}
        </div>
    );
}