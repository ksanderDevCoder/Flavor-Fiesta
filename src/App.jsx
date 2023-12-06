import Cart from "./components/Cart/Cart";
import Checkout from "./components/Cart/Checkout";
import Header from "./components/Header/Header";
import Meals from './components/Meal/Meals'
import { CartContextProvider } from "./context/CartContext";
import { UserProgressContextProvider } from "./context/UserProgressContext";

function App() {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <Header />
        <Meals />
        <Cart />
        <Checkout />
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
