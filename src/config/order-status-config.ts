import { OrderStatus } from "@/types";

type OrderStatusInfo = {
    label: string;
    value: OrderStatus;
    progressValue: number; 
    // Progress value from 0 to 100 for progress bar display.
}

export const ORDER_STATUS : OrderStatusInfo []=[
    {label: "Placed", value: "placed", progressValue:0},
    {
        label: "Awaiting Restaurant Confirmation",
        value: "paid",
        progressValue: 25,
    },
    {
        label: "In progress", value: "inProgress",
        progressValue: 50,
    },
    {
        label: "Out for Delivery", value: "outForDelivery", progressValue: 75,
    },
    {
        label: "Delivered", value: "delivered", progressValue: 100,}
]