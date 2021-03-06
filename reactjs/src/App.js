import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { PrivateRoute } from "./common/auth";
import Login from "./pages/login/Login";
import Registration from "./pages/registration/Registration";
import Main from "./pages/map/Main";
import ProxyCabinet from "./pages/cabinet/ProxyCabinet";
import "./common/normilize.css";
import "antd/dist/antd.css";
import License from './pages/registration/components/license'
const App = () => {

  return (
    <Router>
      <Switch>
        <Route path="/agreement" component={License} />
        <Route path="/login" component={Login} />
        <Route path="/registration" component={Registration} />
        <PrivateRoute path="/cabinet" component={ProxyCabinet} />
        <PrivateRoute path="/" component={Main} />

      </Switch>
    </Router>
  );
};

export default App;
