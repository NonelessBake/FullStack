import "./index.css";
import FormCheckout from "../../components/FormCheckout/FormCheckout";
export default function CheckoutInfo(newProps) {
  const { disabled } = newProps;
  return <div>{<FormCheckout disabled={disabled} />}</div>;
}
