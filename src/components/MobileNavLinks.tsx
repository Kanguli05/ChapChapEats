import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";


export default function MobileNavLinks() {
    const { logout } = useAuth0();
  return (
    <>
        <Link to="/order-status" className="flex bg-white items-center text-xl font-bold hover:text-orange-500">
            <span>Order Status</span>
        </Link>

        <Link to="/manage-restaurant" className="flex bg-white items-center text-xl font-bold hover:text-orange-500">
            <span>My Restaurant</span>
        </Link>
        
        <Link to="/user-profile" className="flex bg-white items-center text-xl font-bold hover:text-orange-500">
            <span>User Profile</span>
        </Link>
        <Button onClick={() => logout()} className="flex items-center px-3 font-bold hover:text-orange-500">
            Log Out
        </Button>
    </>    
  )
}