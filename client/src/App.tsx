import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Favorites from "./pages/Favorites";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import PaymentSuccess from "./pages/PaymentSuccess";
import OrderConfirmation from "./pages/OrderConfirmation";
import Profile from "./pages/Profile";
import AccountMenu from "./pages/AccountMenu";
import Orders from "./pages/Orders";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/products/:brandSlug" component={Products} />
      <Route path="/products/:brandSlug/:categorySlug" component={Products} />
      <Route path="/products/:brandSlug/:categorySlug/product/:id" component={ProductDetail} />
      <Route path="/products/:brandSlug/product/:id" component={ProductDetail} />
      <Route path="/product/:id" component={ProductDetail} />
      <Route path="/favorites" component={Favorites} />
      <Route path="/profile" component={Profile} />
      <Route path="/account" component={AccountMenu} />
      <Route path="/account/orders" component={Orders} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/payment" component={Payment} />
      <Route path="/payment/success" component={PaymentSuccess} />
      <Route path="/order-confirmation/:orderNumber" component={OrderConfirmation} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light" switchable>
        <FavoritesProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </FavoritesProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
