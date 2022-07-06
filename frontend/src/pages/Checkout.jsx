import React, { useState, useEffect } from "react"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import CheckoutForm from "./CheckoutForm"
import { useGlobal } from '../Global'
import Axios from "axios"

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY)

let didCancel = false

export default function Checkout({ user }) {
    const cartItems = useGlobal((state) => state.cartItems )

    const FEE_RATIO = 0.01
    const subTotal = cartItems.reduce((total, item) => total = total + item.price*item.quantity, 0)
    const shippingFee = subTotal * FEE_RATIO

    const [clientSecret, setClientSecret] = useState("")

    useEffect(() => {
        const getClientSecret = () => {
            if ( !didCancel ) {
                console.log("called")
                Axios.post("http://localhost:5000/create-payment-intent", { headers: { Accept: "application/json", "Content-Type": "application/json", "Access-Control-Allow-Credentials": true, }, data: { cartItems }, withCredentials: true })
                    .then((res) => { setClientSecret(res.data.clientSecret) }) 
                    .catch((err) => { console.log(err) })
            }
        }
        getClientSecret()

        // To prevent double sending of create-payment-intent while <React.StrictMode /> is On.
        return () => { didCancel = true }
    }, [cartItems]);

    const appearance = { theme: 'stripe' }
    const options = { clientSecret, appearance }

    return (
        <div className="flex space-between w-full">
            {/* <h1 className="sr-only">Checkout</h1> */}
            <section
                aria-labelledby="payment-and-shipping-heading"
                className="w-1/2 px-10 py-14">

                <h2 id="payment-and-shipping-heading" className="sr-only">
                    Payment and shipping details
                </h2>
                { clientSecret && (
                    <Elements options={options} stripe={stripePromise}>
                        <CheckoutForm />
                    </Elements>
                )}
            </section>

            <section aria-labelledby="summary-heading" className="bg-indigo-900 text-indigo-300 w-1/2 px-10 py-14">
                <div className="max-w-2xl mx-auto px-4 lg:max-w-none lg:px-0">
                    <h2 id="summary-heading" className="">
                        Order summary
                    </h2>

                    <div role="list" className="text-sm font-medium divide-y divide-white divide-opacity-10">
                        {cartItems.map((product) => (
                            <li key={product._id} className="flex items-start py-6 space-x-4">
                                <img
                                    src={product.image}
                                    alt={product.image}
                                    className="flex-none w-20 h-20 rounded-md object-center object-cover"
                                />
                                <div className="flex-auto space-y-1">
                                    <h3 className="text-white">{product.name}</h3>
                                    <p>{product.category}</p>
                                    <p>{product.quantity}</p>
                                </div>
                                <p className="flex-none text-base font-medium text-white">{"$" + product.price*product.quantity}</p>
                            </li>
                        ))}
                    </div>

                    <dl className="text-sm font-medium space-y-6 border-t border-white border-opacity-10 pt-6">
                        <div className="flex items-center justify-between">
                            <dt>Subtotal</dt>
                            <dd>{"$" + subTotal}</dd>
                        </div>

                        <div className="flex items-center justify-between">
                            <dt>Shipping</dt>
                            <dd>{"$" + shippingFee}</dd>
                        </div>

                        <div className="flex items-center justify-between border-t border-white border-opacity-10 text-white pt-6">
                            <dt className="text-base">Total</dt>
                            <dd className="text-base">{"$" + (subTotal + shippingFee).toFixed(2)}
                            </dd>
                        </div>
                    </dl>
                </div>
            </section>
        </div>
    )
}
