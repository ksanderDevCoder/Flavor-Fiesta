import React, { useContext } from "react";
import Modal from "../Modal/Modal";
import CartContext from "../../context/CartContext";
import { currencyFormatter } from "../../util/formatting";
import Button from "../UI/Button";
import UserProgressContext from "../../context/UserProgressContext";
import CartItem from "./CartItem";

const Cart = () => {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const cartTotal = cartCtx.items.reduce((totalPrice, item) => {
        return totalPrice + item.quantity * item.price;
    }, 0);

    const closeCartHandler = () => {
        userProgressCtx.hideCart();
    };

    const goToCheckoutHandler = () => {
        userProgressCtx.showCheckout();
    }

    return (
        <Modal className="cart" open={userProgressCtx.progress === "cart"} onClose={userProgressCtx.progress === 'cart' ? closeCartHandler : null}>
            <h2>Your Cart</h2>
            <ul>
                {cartCtx.items.map((item) => (
                    <CartItem
                        key={item.id}
                        name={item.name}
                        quantity={item.quantity}
                        price={item.price}
                        onIncrease={() => {
                            cartCtx.addItem(item);
                        }}
                        onDecrease={() => {
                            cartCtx.removeItem(item.id);
                        }}
                    />
                ))}
            </ul>
            {cartCtx.items.length === 0 ? (<p>Your cart is empty.</p>) : (<p className="cart-total">{currencyFormatter.format(cartTotal)}</p>)}
            <p className="modal-actions">
                <Button textOnly onClick={closeCartHandler}>
                    Close
                </Button>
                {cartCtx.items.length > 0 && <Button onClick={goToCheckoutHandler}>Go to checkout</Button>}
            </p>
        </Modal>
    );
};

export default Cart;
