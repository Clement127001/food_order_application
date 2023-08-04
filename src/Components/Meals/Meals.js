import { Fragment } from "react";
import MealsSummary from "./MealsSumary/MealsSummary";

import AvailableMeals from "./AvaliableMeals/AvailabaleMeals";

const Meals = () => {
  return (
    <Fragment>
      <MealsSummary />
      <AvailableMeals />
    </Fragment>
  );
};

export default Meals;
