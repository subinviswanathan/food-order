import { useReducer } from 'react';
import CartContext from './cart-context';

const CART_ACTION_CONSTANSTS = {
	ADD_TO_CART: 'ADD_TO_CART',
	REMOVE_FROM_CART: 'REMOVE_FROM_CART',
};

const defaultCartState = {
	items: [],
	totalAmount: 0,
};
const cartReducer = (state, action) => {
	// if (action.type === CART_ACTION_CONSTANSTS.ADD_TO_CART) {
	// 	const item = action.payload;
	// 	const totalAmount = state.totalAmount + item.amount * item.price.toFixed(2);
	// 	const existingCartItemIndex = state.items.findIndex(
	// 		meal => meal.id === item.id
	// 	);
	// 	const existingCartItem = state.items[existingCartItemIndex];
	// 	let updatedItems;

	// 	if (existingCartItem) {
	// 		const updatedItem = {
	// 			...existingCartItem,
	// 			amount: existingCartItem.amount + item.amount,
	// 		};
	// 		updatedItems = [...state.items];
	// 		updatedItems[existingCartItemIndex] = updatedItem;
	// 	} else {
	// 		updatedItems = [...state.items, item];
	// 	}

	// 	return {
	// 		...state,
	// 		totalAmount,
	// 		items: updatedItems,
	// 	};
	// }

	// if (action.type === CART_ACTION_CONSTANSTS.REMOVE_FROM_CART) {
	// 	const id = action.payload;
	// 	const items = state.items;

	// 	const existingCartItemIndex = items.findIndex(item => item.id === id);
	// 	const existingCartItem = items[existingCartItemIndex];
	// 	const totalAmount = state.totalAmount - existingCartItem.price;
	// 	let updatedItems;
	// 	if (existingCartItem) {
	// 		if (existingCartItem.amount !== 1) {
	// 			const updatedItem = {
	// 				...existingCartItem,
	// 				amount: existingCartItem.amount - 1,
	// 			};
	// 			updatedItems = [...state.items];
	// 			updatedItems[existingCartItemIndex] = updatedItem;
	// 		} else updatedItems = items.filter(item => item.id !== id);
	// 	}

	// 	return {
	// 		...state,
	// 		items: updatedItems,
	// 		totalAmount,
	// 	};
	// }

	// return defaultCartState;

	switch (action.type) {
		case CART_ACTION_CONSTANSTS.ADD_TO_CART: {
			const item = action.payload;
			const totalAmount =
				state.totalAmount + item.amount * item.price.toFixed(2);
			const existingCartItemIndex = state.items.findIndex(
				meal => meal.id === item.id
			);
			const existingCartItem = state.items[existingCartItemIndex];
			let updatedItems;

			if (existingCartItem) {
				const updatedItem = {
					...existingCartItem,
					amount: existingCartItem.amount + item.amount,
				};
				updatedItems = [...state.items];
				updatedItems[existingCartItemIndex] = updatedItem;
			} else {
				updatedItems = [...state.items, item];
			}

			return {
				...state,
				totalAmount,
				items: updatedItems,
			};
		}

		case CART_ACTION_CONSTANSTS.REMOVE_FROM_CART: {
			const id = action.payload;
			const items = state.items;

			const existingCartItemIndex = items.findIndex(item => item.id === id);
			const existingCartItem = items[existingCartItemIndex];
			const totalAmount = state.totalAmount - existingCartItem.price;
			let updatedItems;
			if (existingCartItem.amount !== 1) {
				const updatedItem = {
					...existingCartItem,
					amount: existingCartItem.amount - 1,
				};
				updatedItems = [...state.items];
				updatedItems[existingCartItemIndex] = updatedItem;
			} else updatedItems = items.filter(item => item.id !== id);

			return {
				...state,
				items: updatedItems,
				totalAmount,
			};
		}

		default:
			return defaultCartState;
	}
};

const CartProvider = ({ children }) => {
	const [cartState, dispatchCartAction] = useReducer(
		cartReducer,
		defaultCartState
	);

	const addItemToCartHandler = item => {
		dispatchCartAction({
			type: CART_ACTION_CONSTANSTS.ADD_TO_CART,
			payload: item,
		});
	};
	const removeItemFromCartHandler = id => {
		dispatchCartAction({
			type: CART_ACTION_CONSTANSTS.REMOVE_FROM_CART,
			payload: id,
		});
	};

	const cartContext = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: addItemToCartHandler,
		removeItem: removeItemFromCartHandler,
	};

	return (
		<CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
	);
};

export default CartProvider;
