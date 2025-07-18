import { Link } from "react-router-dom";
import styles from "./Hero.module.css";
import Container from "../Container/Container";

function Hero() {
  return (
    <Container className={styles.heroWrapper}>
      <div>
        <h1 className={styles.title}>Campers of your dreams</h1>
        <p className={styles.desc}>
          You can find everything you want in our catalog
        </p>
        <Link className={styles.linkView} to="/catalog">
          View Now
        </Link>
      </div>
    </Container>
  );
}

export default Hero;
