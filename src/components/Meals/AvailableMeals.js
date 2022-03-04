import { DUMMY_MEALS } from './dummy-meals';

const AvailableMeals = () => {
	const mealsList = DUMMY_MEALS.map(meal => <li key={meal.id}>{meal.name}</li>);

	return (
		<section>
			<ul>{mealsList}</ul>
		</section>
	);
};

export default AvailableMeals;
