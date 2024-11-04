import { useGetRestaurant } from "@/api/RestaurantApi";
import MenuItem from "@/components/MenuItem";
import OrderSummary from "@/components/OrderSummary";
import RestaurantInfo from "@/components/RestaurantInfo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardFooter } from "@/components/ui/card";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { MenuItem as MenuItemType} from "@/types";
import CheckoutButton from "@/components/CheckoutButton";


export type CartItem = {
    _id: string;
    name: string;
    price: number;
    quantity: number;
}

export default function DetailPage() {

    const { restaurantId } = useParams();
    const { restaurant, isLoading } = useGetRestaurant(restaurantId);

    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        const storedCartItems = sessionStorage.getItem(`cartItema-${restaurantId}`);
        return storedCartItems ? JSON.parse(storedCartItems) : [];
    });

    const addToCart = (menuItem: MenuItemType) => {
        setCartItems((prevCartItems) => {
            // Check if item already exists in cart
            // If yes, increment quantity
            // If no, add new item to cart
            const existingItem = prevCartItems.find((cartItem) => cartItem._id === menuItem._id);
            // Update cartItems array and return new array
            let updatedCartItems;

            if (existingItem) {
                updatedCartItems = prevCartItems.map((cartItem) => 
                    cartItem._id === menuItem._id? {...cartItem, quantity: cartItem.quantity + 1 } : cartItem
                );
            } else {
                updatedCartItems = [
                    ...prevCartItems, {
                        _id: menuItem._id,
                        name: menuItem.name,
                        price: menuItem.price,
                        quantity: 1,
                    }
                ]
            }

            sessionStorage.setItem(`cartItema-${restaurantId}`, JSON.stringify(updatedCartItems));

            return updatedCartItems;
        
    })};


    const removeFromCart = (cartItem: CartItem) => {
        setCartItems((prevCartItems) => {
            const updatedCartItems = prevCartItems.filter((item) => 
                cartItem._id!== item._id

            );

            sessionStorage.setItem(`cartItema-${restaurantId}`, JSON.stringify(updatedCartItems));

            return updatedCartItems;
        })
    }
            
        
    

    

    if(isLoading || !restaurant) {
        return "Loading...";
    }



  return (
    <div className="flex flex-col gap-10">
        <AspectRatio ratio={16 / 5}>
            <img className="object-cover w-full h-full rounded-md" src={restaurant.lastUpdated} alt="" />
        </AspectRatio>

        <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
            <div className="flex flex-col gap-4">
                <RestaurantInfo restaurant={restaurant} />
                <span className="text-2xl font-bold tracking-tight">Menu</span>

                {restaurant.menuItems.map((menuItem) => (
                    <MenuItem menuItem={menuItem} addToCart={() =>addToCart(menuItem)}/>
                ))}
            </div>

            <div>
                <Card>
                    <OrderSummary restaurant={restaurant} cartItems={cartItems} removeFromCart={removeFromCart}/>
                    <CardFooter>
                        <CheckoutButton />
                    </CardFooter>
                </Card>
            </div>
        </div>
    </div>
  )
};