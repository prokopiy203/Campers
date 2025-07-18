import CampersFiltered from "../../components/CampersFiltered/CampersFiltered";
import CampersList from "../../components/CampersList/CampersList";
import Container from "../../components/Container/Container";
import Section from "../../components/Section/Section";
import styles from "./CatalogPage.module.css";

function CatalogPage() {
  return (
    <Section>
      <Container className={styles.catalogBox}>
        <CampersFiltered />
        <CampersList />
      </Container>
    </Section>
  );
}

export default CatalogPage;
