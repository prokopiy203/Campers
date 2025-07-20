import CampersCategories from "../CampersCategories/CampersCategories";
import styles from "./CampersFeatures.module.css";
import { formatLabel, formatValueWithUnit } from "../../hooks/capitalizeWord";

function CampersFeatures({ features }) {
  return (
    <>
      <div className={styles.featuresBox}>
        <CampersCategories categories={features} />
        <div>
          <h2 className={styles.featuresTitle}>Vehicle details</h2>
          <ul key={features.id} className={styles.featuresList}>
            <li className={styles.featuresTitleDesc}>
              Form <p>{formatLabel(features.form)}</p>
            </li>
            <li className={styles.featuresTitleDesc}>
              Length <p>{formatValueWithUnit(features.length)}</p>
            </li>
            <li className={styles.featuresTitleDesc}>
              Width <p>{formatValueWithUnit(features.width)}</p>
            </li>
            <li className={styles.featuresTitleDesc}>
              Height <p>{formatValueWithUnit(features.height)}</p>
            </li>
            <li className={styles.featuresTitleDesc}>
              Tank <p>{formatValueWithUnit(features.tank)}</p>
            </li>
            <li className={styles.featuresTitleDesc}>
              Consumption <p>{formatValueWithUnit(features.consumption)}</p>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default CampersFeatures;
