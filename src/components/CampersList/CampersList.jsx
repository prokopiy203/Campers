import { Link } from "react-router-dom";
import styles from "./CampersList.module.css";
import Icon from "../UI/Icon/Icon";
import clsx from "clsx";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCampers,
  getCampersByLocation,
} from "../../redux/campers/operations";
import {
  selectedCampersByFiltered,
  selectedCampersItem,
  selectFavorites,
  selectHasMore,
  selectIsLoading,
} from "../../redux/campers/selectors";
import CampersCategories from "../CampersCategories/CampersCategories";
import { setFilters, toggleFavorite } from "../../redux/campers/slice";
import { buildQueryParams } from "../../hooks/buildQueryParams";
import { PuffLoader } from "react-spinners";

function CampersList() {
  const dispatch = useDispatch();

  const campers = useSelector(selectedCampersItem);
  const filters = useSelector(selectedCampersByFiltered);
  const hasMore = useSelector(selectHasMore);
  const loading = useSelector(selectIsLoading);
  const favorites = useSelector(selectFavorites);

  useEffect(() => {
    const queryParams = buildQueryParams(filters);
    dispatch(getCampersByLocation(queryParams));
  }, [filters, dispatch]);

  const handleFavoriteClick = (id) => {
    dispatch(toggleFavorite(id));
  };

  const handleLoadMore = () => {
    if (!hasMore) return;

    const nextPage = filters.page + 1;
    const newFilters = { ...filters, page: nextPage };
    const queryParams = buildQueryParams(newFilters);

    const hasActiveFilters =
      newFilters.location ||
      newFilters.transmission ||
      newFilters.engine ||
      newFilters.form ||
      (newFilters.equipment && newFilters.equipment.length > 0);

    const thunkAction = hasActiveFilters
      ? getCampersByLocation(queryParams)
      : getCampers(queryParams);

    dispatch(thunkAction).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        dispatch(setFilters(newFilters));
      }
    });
  };
  return (
    <div className={styles.listWrapper}>
      <ul className={styles.listCamperItems}>
        {loading && (
          <div className={styles.noResultsBox}>
            <PuffLoader />
          </div>
        )}
        {!loading && campers.length === 0 && (
          <div className={styles.noResultsBoxTittle}>
            <h2 className={styles.noResults}>
              No results found. Try adjusting your filters.
            </h2>
          </div>
        )}
        {!loading &&
          campers.map((item) => (
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
                        onClick={() => handleFavoriteClick(item.id)}
                      >
                        <Icon
                          name="icon-Like"
                          width={26}
                          height={24}
                          className={clsx(
                            styles.heart,
                            favorites.includes(item.id)
                              ? styles.heartActive
                              : styles.heart
                          )}
                        />
                      </button>
                    </span>
                  </span>
                  <span className={styles.listNavigation}>
                    <Link
                      to={`/catalog/${item.id}/reviews#reviews`}
                      className={styles.listNavigationItem}
                    >
                      <Icon
                        name="icon-Rating-full"
                        stroke={"transparent"}
                        width={16}
                      />
                      {item.rating}({item.reviews.length})
                    </Link>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        item.location
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.listNavigationItem}
                    >
                      <Icon name="icon-map" stroke={"transparent"} />
                      {item.location}
                    </a>
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
                <Link to={`/catalog/${item.id}`} className={styles.listBtnMore}>
                  Show More
                </Link>
              </div>
            </li>
          ))}
      </ul>
      {!loading && campers.length >= 4 && (
        <button
          className={styles.btnLoadMore}
          type="button"
          disabled={!hasMore}
          onClick={handleLoadMore}
        >
          {hasMore ? "Load More" : "Not Results"}
        </button>
      )}
    </div>
  );
}

export default CampersList;
