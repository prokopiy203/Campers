import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

function NotFoundPage() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>404 - Page Not Found</h1>
      <p className={styles.text}>
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <Link to="/" className={styles.link}>
        Go back to Home
      </Link>
    </div>
  );
}

export default NotFoundPage;
