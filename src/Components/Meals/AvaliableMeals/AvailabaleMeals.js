import { useEffect, useState } from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../../UI/Card";
import MealsItem from "../MealsItem/MealsItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  //maintaing the loading and error state is very helpful in improving the user experinece
  const [isLoading, setIslodaing] = useState(true);
  const [httpError, setHttpError] = useState(null);
  useEffect(() => {
    setIslodaing(true);
    const fetchMeals = async () => {
      console.log("fetching food details");
      const response = await fetch(
        "https://food-order-application-27a66-default-rtdb.firebaseio.com/Meals.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const mealsData = await response.json();

      const loadedMeals = [];
      for (const key in mealsData) {
        loadedMeals.push({
          id: key,
          name: mealsData[key].name,
          description: mealsData[key].description,
          price: mealsData[key].price,
        });
      }

      setMeals(loadedMeals);
    };
    fetchMeals().catch((err) => {
      setIslodaing(false);
      setHttpError(err.message);
    });

    setIslodaing(false);
  }, []);

  if (isLoading) {
    return (
      <section>
        <p className={classes.mealsIsLoading}>Loading ...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section>
        <p className={classes.mealsError}>{httpError}</p>
      </section>
    );
  }

  const mealList = meals.map((meal) => (
    <MealsItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul className={classes.meals}>{mealList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
