import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import Icon from "../UI/Icon/Icon";
import styles from "./CampersDetails.module.css";
import CampersGallery from "../CampersGallery/CampersGallery";
import clsx from "clsx";
import { useEffect } from "react";

function CamperDetails({ camper }) {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        const yOffset = -15;
        const y =
          element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <>
      <div key={camper.id} className={styles.detailsWrapper}>
        <div className={styles.titleBox}>
          <h2 className={styles.listTitle}>{camper.name}</h2>
          <span className={styles.listNavigation}>
            <Link
              to={`/catalog/${camper.id}/reviews#reviews`}
              className={styles.listNavigationItem}
            >
              <Icon name="icon-Rating-full" stroke={"transparent"} width={16} />
              {camper.rating}({camper.reviews.length})
            </Link>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                camper.location
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.listNavigationItem}
            >
              <Icon name="icon-map" stroke={"transparent"} />
              {camper.location}
            </a>
          </span>
          <p className={styles.listPrice}>€{camper.price}.00</p>
        </div>
        <div className={styles.imgBox}>
          <CampersGallery gallery={camper.gallery} />
        </div>
        <p className={styles.listDesc}>{camper.description}</p>
        <div id="reviews" className={styles.navBox}>
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
            to="reviews#reviews"
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
