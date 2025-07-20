import { useSelector } from "react-redux";
import { selectCamperDetails } from "../../redux/campers/selectors";
import styles from "./CampersReviews.module.css";
import Avatar from "react-avatar";
import Rating from "../Rating/Rating";

function CampersReviews() {
  const reviews = useSelector(selectCamperDetails);

  return (
    <div className={styles.reviewsBox}>
      <ul className={styles.listReviews}>
        {reviews.reviews.map((item, index) => (
          <li key={index}>
            <div className={styles.avatarBox}>
              <Avatar
                name={item.reviewer_name}
                color="#f2f4f7"
                fgColor="#e44848"
                textSizeRatio={2}
                size="60"
                round={true}
              />
              <span className={styles.starBox}>
                <h3 className={styles.avatarName}>{item.reviewer_name}</h3>
                <Rating
                  value={item.reviewer_rating}
                  max={5}
                  fullIconName="icon-Rating-full"
                  emptyIconName="icon-Rating"
                  fill="#FFC531"
                />
              </span>
            </div>
            <p className={styles.avatarComment}>{item.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CampersReviews;
