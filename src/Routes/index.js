import { Switch, Route } from "react-router-dom";
import inicial from "../Pages/inicial";

export default function Routes(){
    return(
        <Switch>
            <Route exact path="/"  component={inicial}/>
        </Switch>
    )
}