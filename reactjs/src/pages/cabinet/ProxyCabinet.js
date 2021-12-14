import CustomerCabinet from "./CustomerCabinet";
import PerformerCabinet from "./PerformerCabinet";
import { useSelector } from "react-redux";

const ProxyCabinet = ({ match }) => {
  const { customer } = useSelector((state) => state.userReducer);
  const { courier } = useSelector((state) => state.userReducer);

  if (customer) {
    return <CustomerCabinet match={match} />;
  } else if (courier) {
    return <PerformerCabinet match={match} />;
  } else {
    return <h1>Sorry, no role with that id</h1>;
  }
};

export default ProxyCabinet;
