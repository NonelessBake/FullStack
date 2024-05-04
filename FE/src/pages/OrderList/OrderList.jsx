import { useEffect, useState } from "react";
import "./index.css";
import { orderService } from "../../services/order";
import { Link } from "react-router-dom";

export default function OrderList() {
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
    <div className="order-list">
      {isLoading ? (
        <div>...Loading</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Order ID</th>
              <th>Product Name</th>
              <th>Total Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orderList.map((order, index) => (
              <tr key={order._id}>
                <td className="order-stt" style={{ textAlign: "center" }}>
                  {index + 1}
                </td>
                <td className="order-id">{order._id}</td>
                <td className="order-product">
                  {order.orderList.map((item, index) => (
                    <div className="order-item" key={item.productId._id}>
                      <div>
                        <Link to={`/shop/${item.productId._id}`}>
                          <img
                            src={item.productId.imageUrl[0]}
                            alt={item.productId.productName}
                          />
                        </Link>
                      </div>
                      <div className="order-info">
                        <p>
                          <Link to={`/shop/${item.productId._id}`}>
                            {item.productId.productName}
                          </Link>
                        </p>
                        <p>Quantity: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </td>
                <td className="order-total" style={{ textAlign: "center" }}>
                  {order.subTotal}
                </td>
                <td className="order-status">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
