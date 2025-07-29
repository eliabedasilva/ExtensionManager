
import ExtensionCard from "./ExtensionCard";
import styles from "./CardList.module.css"

export default function CardList({extensions, loading, error}) {

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