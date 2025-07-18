import { Link } from "react-router-dom";
import styles from "./CampersList.module.css";
import Icon from "../UI/Icon/Icon";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCampers } from "../../redux/campers/operations";
import { selectedCampersByLocation } from "../../redux/campers/selectors";
import CampersCategories from "../CampersCategories/CampersCategories";

function CampersList() {
  const [isFavorite, setIsFavorite] = useState(false);
  const dispatch = useDispatch();

  const campers = useSelector(selectedCampersByLocation);

  useEffect(() => {
    if (campers.length === 0) {
      dispatch(getCampers());
    }
  }, [dispatch, campers.length]);

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  return (
    <div>
      <ul className={styles.listCamperItems}>
        {campers.map((item) => (
          <li key={item.id} className={styles.listItem}>
            <img
              className={styles.listImg}
              src={item.gallery[0].thumb}
              width="292"
              height="320"
              alt="alt"
            />
            <div className={styles.listInfoBox}>
              <div>
                <span className={styles.listTitleBox}>
                  <h2 className={styles.listTitle}>
                    {" "}
                    {item.name.length > 28
                      ? item.name.slice(0, 28) + "..."
                      : item.name}
                  </h2>
                  <span className={styles.listPriceBox}>
                    <p className={styles.listPrice}>€{item.price}.00</p>
                    <button
                      className={styles.listBtnLike}
                      onClick={toggleFavorite}
                    >
                      <Icon
                        name="icon-Like"
                        width={26}
                        height={24}
                        className={clsx(
                          styles.heart,
                          isFavorite ? styles.heartActive : styles.heart
                        )}
                      />
                    </button>
                  </span>
                </span>
                <span className={styles.listNavigation}>
                  <Link className={styles.listNavigationItem}>
                    <Icon
                      name="icon-Rating"
                      stroke={"transparent"}
                      width={16}
                    />
                    {item.rating}({item.reviews.length})
                  </Link>
                  <Link className={styles.listNavigationItem}>
                    <Icon name="icon-map" stroke={"transparent"} />
                    {item.location}
                  </Link>
                </span>
              </div>
              <p className={styles.listDesc}>
                {item.description.length > 60
                  ? item.description.slice(0, 63) + "..."
                  : item.description}
              </p>
              <div className={clsx("scroll", styles.listTegBox)}>
                <CampersCategories categories={item} />
              </div>
              <button type="button" className={styles.listBtnMore}>
                Show More
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CampersList;
