import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import UsernameMenu from "./UsernameMenu";
import { Link } from "react-router-dom";


export default function MainNav() {

  const {loginWithRedirect, isAuthenticated} = useAuth0();

  return (
    <span className="flex space-x-2 items-center">
      {isAuthenticated ? (

        <>
          <Link to="/order-status" className="font-bold text-xl hover:text-orange-500">
            Order Status
          </Link>
          <UsernameMenu />
        </>
        


         ) : (
        <Button variant="ghost" className="font-bold text-2xl hover:text-orange-500 hover:bg-white" 
        onClick={async () => await loginWithRedirect()}>
          Sign In
        </Button>
      )
      
      }
    </span>
  
  )
};