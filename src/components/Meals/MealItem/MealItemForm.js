import { useRef, useContext } from 'react';

import CartContext from '../../../store/cart-context';
import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';

const MealItemForm = ({ meal }) => {
	const amountInputRef = useRef();
	const cartCtx = useContext(CartContext);
	const addMealHandler = ev => {
		console.log('added twice');
		ev.preventDefault();
		const amountValue =
			amountInputRef.current.value && amountInputRef.current.value.trim();
		const amount = +amountValue;
		if (!amount || amount < 1 || amount > 5) {
			return;
		}
		cartCtx.addItem({ ...meal, amount });
	};

	return (
		<form className={classes.form} onSubmit={addMealHandler}>
			<Input
				ref={amountInputRef}
				label="Amount"
				input={{
					id: 'amount_' + meal?.id,
					type: 'number',
					min: '1',
					max: '5',
					step: '1',
					defaultValue: '1',
				}}
			/>
			<button type="submit">+ Add</button>
		</form>
	);
};

export default MealItemForm;
