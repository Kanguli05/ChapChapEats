import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import LoadingButton from "./LoadingButton";
import { useLocation } from "react-router-dom";


export default function CheckoutButton() {

    const { isAuthenticated, isLoading: isAuthLoading, loginWithRedirect } = useAuth0();

    const { pathname } = useLocation();



    const onLogin = async () => {
      await loginWithRedirect({
        appState: {
          returnTo: pathname
        }
      });
    }

    if (!isAuthenticated) {
      return <Button onClick={onLogin} className="bg-orange-500 font-semibold text-  flex-1">Sign In to Checkout</Button>
    }

    if (isAuthLoading) {
      return <LoadingButton />;
    }


  
}
