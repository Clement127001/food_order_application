import { Fragment } from "react";
import classes from "./Header.module.css";
import HeaderCartIcon from "../HeaderCartIcon/HeaderCartIcon";

import mealImage from "../../../Assets/meals.jpg";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartIcon onClick={props.onClick} />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealImage} alt={mealImage} />
      </div>
    </Fragment>
  );
};

export default Header;
