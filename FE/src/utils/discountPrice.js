import { formatPrice } from "./formatPrice"

export const discountPrice = (price, discount) => {
    return formatPrice(price * (1 - discount / 100))
}