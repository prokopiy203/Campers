import Icon from "../UI/Icon/Icon";
import styles from "./CampersCategories.module.css";
import { availableTags } from "../../hooks/tagConfig";

function CampersCategories({ categories }) {
  return (
    <div className={styles.listTegBox}>
      {Object.entries(availableTags).map(([key, config]) => {
        const value = categories[key];
        if (typeof value === "boolean") {
          if (!value) return null;
          return (
            <div key={key}>
              <span className={styles.listTeg}>
                <Icon name={config.iconName} width={20} height={20} />
                {config.label}
              </span>
            </div>
          );
        }
        if (config.values && config.values[value]) {
          const { iconName, label } = config.values[value];
          return (
            <div key={key}>
              <span className={styles.listTeg}>
                <Icon
                  className={styles.icon}
                  name={iconName}
                  width={20}
                  height={20}
                  stroke={"transparent"}
                />
                {label}
              </span>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}

export default CampersCategories;
