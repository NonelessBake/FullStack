import "./index.css";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { userService } from "../../services/user";

export default function FormCheckout() {
  const { userInfo } = useSelector((state) => state.auth);
  const { id } = useParams();
  const [info, setInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { isLogin } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin) {
      if (id !== userInfo._id) {
        alert("You need to login to access");
        navigate("");
      }
      const fetch = async () => {
        setIsLoading(true);
        const data = await userService.getUserInfo(userInfo._id);
        setInfo(data.data[0]);
        setIsLoading(false);
      };
      fetch();
    }
  }, [navigate, isLogin]);
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };
  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const data = await userService.updateInfo(userInfo._id, info);
      setInfo(data.data);
      alert("Update successful");
    } catch (err) {
      alert(err.message);
    }
    setIsLoading(false);
  };
  return (
    <>
      {isLoading ? (
        <>Loading...</>
      ) : (
        <form className="checkout" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="firstName" name="firstName">
              First Name:{" "}
            </label>
            <input
              onChange={handleOnChange}
              value={info.firstName}
              type="text"
              name="firstName"
            />
          </div>
          <div>
            <label htmlFor="lastName" name="lastName">
              Last Name:{" "}
            </label>
            <input
              onChange={handleOnChange}
              value={info.lastName}
              type="text"
              name="lastName"
            />
          </div>
          <div className="phone-number">
            <label htmlFor="phoneNumber" name="phoneNumber">
              Phone:{" "}
            </label>
            <input
              onChange={handleOnChange}
              value={info.phoneNumber}
              type="number"
              name="phoneNumber"
            />
          </div>
          <div className="address">
            <label htmlFor="address" name="address">
              Address:{" "}
            </label>
            <input
              onChange={handleOnChange}
              value={info.address}
              type="text"
              name="address"
            />
          </div>
          <div className="city">
            <label htmlFor="city" name="city">
              City:{" "}
            </label>
            <input
              onChange={handleOnChange}
              value={info.city}
              type="text"
              name="city"
            />
          </div>
          <div className="submit">
            <button>Save change</button>
          </div>
        </form>
      )}
    </>
  );
}
