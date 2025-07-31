import ExtensionCard from "./ExtensionCard";
import styles from "./CardList.module.css";

export default function CardList({ extensions, loading, error, onRemove, onToggleActive }) {
  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div className={styles.card_list}>
      {extensions.map((ext) => (
        <ExtensionCard
          key={ext.id}
          id={ext.id}
          logo_path={ext.logo}
          name={ext.name}
          description={ext.description}
          isActive={ext.isActive}
          onRemove={onRemove}
          onToggleActive={onToggleActive}
        />
      ))}
    </div>
  );
}
