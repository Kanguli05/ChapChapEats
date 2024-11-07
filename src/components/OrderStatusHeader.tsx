import { Order } from "@/types";
import { Progress } from "./ui/progress";

type Props = {
    order: Order;
}

const OrderStatusHeader = ({order}: Props) => {

    const getExpectedDelivery = () => {
        const created = new Date(order.createdAt);

        created.setMinutes(created.getMinutes() + order.restaurant.estimatedDeliveryTime);

        const hours = created.getHours();
        const minutes = created.getMinutes();

        const paddedMinutes = minutes < 10? `0${minutes}`: minutes;

        return `${hours}:${paddedMinutes}` // 12.05
    }

    return (
        <>
        {/* Order status header goes here */}
            <h1 className="text-3xl font-bold tracking-tighter flex flex-col gap-5 md:flex-row md:justify-between">
                <span>Order status: {order.status}</span>
                <span>Expected by: {getExpectedDelivery()}</span>
            </h1>
            <Progress className="animate-pulse" value={50}/>
        
        </>
    )
}

export default OrderStatusHeader;