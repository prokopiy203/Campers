import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import styles from "./CampersGallery.module.css";

const CampersGallery = ({ gallery }) => {
  const [index, setIndex] = useState(-1);
  const slides = gallery.map((img) => ({ src: img.thumb }));

  return (
    <>
      <div className={styles.imgBox}>
        {gallery.map((image, i) => (
          <img
            key={i}
            className={styles.listImg}
            src={image.thumb}
            width="292"
            height="312"
            alt={`Camper ${i + 1}`}
            onClick={() => setIndex(i)}
            style={{ cursor: "pointer" }}
          />
        ))}
      </div>

      <Lightbox
        slides={slides}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
      />
    </>
  );
};

export default CampersGallery;
