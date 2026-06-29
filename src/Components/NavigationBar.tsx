import { Link } from "react-router";
import { ToggleCartPanel } from "./Cart/ToggleCartPanel";
import { NavigationBarStyle } from "../Styling/NavigationBarStyle";

export function NavigationBar(){
    return(
        <NavigationBarStyle>
            <div className="navbar">
                <Link to={"/search"}>Book Search</Link>
                <Link to={"/allauthors"}>All Authors</Link>
                <ToggleCartPanel/>
            </div>
        </NavigationBarStyle>
    )
}