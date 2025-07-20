import { Outlet, useParams } from "react-router-dom";
import CamperDetails from "../../components/CampersDetails/CamperDetails";
import Container from "../../components/Container/Container";
import Section from "../../components/Section/Section";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCamperById } from "../../redux/campers/operations";
import { selectCamperDetails } from "../../redux/campers/selectors";

function DetailsPage() {
  const { id } = useParams();
  const camper = useSelector(selectCamperDetails);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!camper || camper.id !== id) {
      dispatch(getCamperById(id));
    }
  }, [dispatch, id, camper]);

  if (!camper) return <p>Loading...</p>;

  return (
    <Section>
      <Container>
        <CamperDetails camper={camper} />
        <Outlet />
      </Container>
    </Section>
  );
}

export default DetailsPage;
