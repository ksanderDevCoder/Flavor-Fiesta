import React, { useContext } from "react";
import logoImg from "../../assets/logo.jpg";
import Button from "../UI/Button";
import CartContext from "../../context/CartContext";
import UserProgressContext from "../../context/UserProgressContext";

const Header = () => {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext)

    const totalCartItems = cartCtx.items.reduce((total, item) => {
        return total + item.quantity;
    }, 0);

    function showCartHandler() {
        userProgressCtx.showCart()
    }

    return (
        <header id="main-header">
            <div id="title">
                <img src={logoImg} alt='Logo' />
                <h1>FlavorFiesta</h1>
            </div>
            <nav>
                <Button textOnly onClick={showCartHandler}>Cart ({totalCartItems})</Button>
            </nav>
        </header>
    );
};

export default Header;
