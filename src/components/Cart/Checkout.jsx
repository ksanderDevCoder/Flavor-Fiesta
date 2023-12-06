import React, { useContext } from "react";
import Modal from "../Modal/Modal";
import CartContext from "../../context/CartContext";
import { currencyFormatter } from "../../util/formatting";
import Button from "../UI/Button";
import UserProgressContext from "../../context/UserProgressContext";
import Input from "../UI/Input";
import useHttp from "../../hooks/useHttp";
import Error from "../Error";

const requestConfig = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
};

const Checkout = () => {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);
    const {
        data,
        isLoading: isSending,
        error,
        sendRequest,
        clearData
    } = useHttp("http://localhost:3000/orders", requestConfig);

    const cartTotal = cartCtx.items.reduce((totalPrice, item) => {
        return totalPrice + item.quantity * item.price;
    }, 0);

    function onCloseHandler() {
        userProgressCtx.hideCheckout();
    }

    function onFinishHandler() {
        userProgressCtx.hideCheckout();
        cartCtx.clearCart();
        clearData()
    }

    function onSubmitHandler(event) {
        event.preventDefault();

        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());

        sendRequest(
            JSON.stringify({
                order: {
                    items: cartCtx.items,
                    customer: customerData,
                },
            })
        );
    }

    let actions = (
        <>
            <Button type="button" textOnly onClick={onCloseHandler}>
                Close
            </Button>
            <Button type="submit">Submit Order</Button>
        </>
    );

    if (isSending) {
        actions = <span>Sending order data...</span>;
    }

    if (data && !error) {
        return (
            <Modal
                open={userProgressCtx.progress === "checkout"}
                onClose={onCloseHandler}
            >
                <h2>Success!</h2>
                <p>Your order was submitted successfully</p>
                <p className="modal-actions">
                    <Button onClick={onFinishHandler}>Okay</Button>
                </p>
            </Modal>
        );
    }

    return (
        <Modal
            open={userProgressCtx.progress === "checkout"}
            onClose={onCloseHandler}
        >
            <form onSubmit={onSubmitHandler}>
                <h2>Checkout</h2>
                <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

                <Input label="Full Name" type="text" id="name" />
                <Input label="E-mail" type="email" id="email" />
                <Input label="Street Address" type="text" id="street" />
                <div className="control-row">
                    <Input label="Postal Code" type="text" id="postal-code" />
                    <Input label="City" type="text" id="city" />
                </div>
                {error && <Error title="Failed to submit order" message={error} />}
                <p className="modal-actions">{actions}</p>
            </form>
        </Modal>
    );
};

export default Checkout;
