import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import LoadingButton from "./LoadingButton";
import { useLocation } from "react-router-dom";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import UserProfileForm, { UserFormData } from "@/forms/user-profile-form/UserProfileForm";
import { useGetMyUser } from "@/api/MyUserApi";

type Props = {
  onCheckOut: (userFormData: UserFormData) => void;
  disabled: boolean;
  isLoading: boolean;
}


export default function CheckoutButton ({ onCheckOut, disabled, isLoading }: Props) {

    const { isAuthenticated, isLoading: isAuthLoading, loginWithRedirect } = useAuth0();
    
    const { pathname } = useLocation();

    const { currentUser, isLoading: isGetUserLoading} = useGetMyUser();


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

    if (isAuthLoading || !currentUser || isLoading) {
      return <LoadingButton />;
    }


    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button disabled={disabled} className="bg-orange-500 flex-1">
            Go to CheckOut
          </Button>        
        </DialogTrigger>
        <DialogContent className="max-w-[425px] md:min-w-[700px] bg-gray-50">
          <UserProfileForm currentUser={currentUser} onSave={onCheckOut} isLoading={isGetUserLoading} title="Confirm Delivery Details" buttonText="Continue to Payment "/>
        </DialogContent>
      </Dialog>
    );

  
}
