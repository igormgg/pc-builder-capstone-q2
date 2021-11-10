import { Route, Switch, useHistory } from "react-router";
import Build from "../pages/Build";
import Cart from "../pages/Cart";
import CategoryProducts from "../pages/CategoryProducts";
import Products from "../pages/Products";
import Sign from "../pages/Sign";

const Routes = () => {
  const history = useHistory();

  return (
    <Switch>
      <Route exact path="/">
        <Products />
      </Route>
      <Route exact path="/build">
        <Build />
      </Route>
      <Route exact path="/sign">
        <Sign />
      </Route>
      <Route exact path="/cart">
        <Cart />
      </Route>
      <Route exact path="/build/:category">
        <CategoryProducts />
      </Route>
      <Route>{() => history.push("/")}</Route>
    </Switch>
  );
};

export default Routes;
