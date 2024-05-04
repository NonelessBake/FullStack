import React, { useEffect, useState } from "react";
import { orderService } from "../../../services/order";
import OrderItem from "./OrderItem/OrderItem";

function OrderList() {
  const [orderList, setOrderList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      const { data } = await orderService.getOrderList();
      setIsLoading(false);
      setOrderList(data.data);
    };
    fetch();
  }, []);
  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {orderList.map((item) => (
            <React.Fragment key={item._id}>
              <OrderItem order={item} />
            </React.Fragment>
          ))}
        </>
      )}
    </div>
  );
}
export { OrderList };
