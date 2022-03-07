import Modal from '../UI/Modal';
import classes from './Cart.module.css';

const Cart = ({ onHideCart }) => {
	const cartItems = (
		<ul className={classes['cart-items']}>
			{[
				{
					id: 'c1',
					name: 'Sushi',
					amount: 2,
					price: 22.99,
				},
			].map(item => (
				<li>{item.name}</li>
			))}
		</ul>
	);
	return (
		<Modal onClose={onHideCart}>
			{cartItems}
			<div className={classes.total}>
				<span>Total Amount</span>
				<span>40.22</span>
			</div>
			<div className={classes.actions}>
				<button onClick={onHideCart} className={classes['button--alt']}>
					Close
				</button>
				<button className={classes['button']}>Order</button>
			</div>
		</Modal>
	);
};

export default Cart;
