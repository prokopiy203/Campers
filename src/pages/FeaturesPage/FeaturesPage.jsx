import { useSelector } from "react-redux";
import CampersFeatures from "../../components/CampersFeatures/CampersFeatures";
import { selectCamperDetails } from "../../redux/campers/selectors";

function FeaturesPage() {
  const campers = useSelector(selectCamperDetails);

  return (
    <div>
      <CampersFeatures features={campers} />
    </div>
  );
}

export default FeaturesPage;
