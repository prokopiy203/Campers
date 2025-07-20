import { Link, NavLink, Outlet } from "react-router-dom";
import Icon from "../UI/Icon/Icon";
import styles from "./CampersDetails.module.css";
import CampersGallery from "../CampersGallery/CampersGallery";
import clsx from "clsx";

function CamperDetails({ camper }) {
  return (
    <>
      <div key={camper.id} className={styles.detailsWrapper}>
        <div className={styles.titleBox}>
          <h2 className={styles.listTitle}>{camper.name}</h2>
          <span className={styles.listNavigation}>
            <Link className={styles.listNavigationItem}>
              <Icon name="icon-Rating-full" stroke={"transparent"} width={16} />
              {camper.rating}({camper.reviews.length})
            </Link>
            <Link className={styles.listNavigationItem}>
              <Icon name="icon-map" stroke={"transparent"} />
              {camper.location}
            </Link>
          </span>
          <p className={styles.listPrice}>€{camper.price}.00</p>
        </div>
        <div className={styles.imgBox}>
          <CampersGallery gallery={camper.gallery} />
        </div>
        <p className={styles.listDesc}>{camper.description}</p>
        <div className={styles.navBox}>
          <NavLink
            to="features"
            end
            className={({ isActive }) =>
              clsx(styles.navLink, { [styles.active]: isActive })
            }
          >
            Features
          </NavLink>
          <NavLink
            to="reviews"
            end
            className={({ isActive }) =>
              clsx(styles.navLink, { [styles.active]: isActive })
            }
          >
            Reviews
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default CamperDetails;
