import { useEffect, useState } from "react";
import "./index.css";
import { orderService } from "../../services/order";

export default function OrderList() {
  const [orderList, setOrderList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      const data = await orderService.getOrderList();
      setIsLoading(false);
      setOrderList(data);
    };
    fetch();
  }, []);
  console.log(orderList);
  return (
    <div>
      {isLoading ? (
        <div>...Loading</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Order ID</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      )}
    </div>
  );
}
