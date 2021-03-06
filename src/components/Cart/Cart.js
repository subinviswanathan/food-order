import { useContext } from 'react';
import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = ({ onHideCart }) => {
	const cartCtx = useContext(CartContext);
	const price = `$${cartCtx.totalAmount.toFixed(2)}`;

	const cartItems = (
		<ul className={classes['cart-items']}>
			{cartCtx.items.map(item => (
				<CartItem
					key={item.id}
					meal={item}
					onAdd={cartCtx.addItem.bind(null, { ...item, amount: 1 })}
					onRemove={cartCtx.removeItem.bind(null, item.id)}
				/>
			))}
		</ul>
	);
	return (
		<Modal onClose={onHideCart}>
			{cartItems}
			<div className={classes.total}>
				<span>Total Amount</span>
				<span>{price}</span>
			</div>
			<div className={classes.actions}>
				<button onClick={onHideCart} className={classes['button--alt']}>
					Close
				</button>
				{cartCtx.items.length !== 0 && (
					<button className={classes['button']}>Order</button>
				)}
			</div>
		</Modal>
	);
};

export default Cart;
