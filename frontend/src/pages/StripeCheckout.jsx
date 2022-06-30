import React, { useEffect, useState } from "react";
import Axios from 'axios';

// STRIPE IMPORTS
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { useGlobal } from '../Global';

const stripePromise = loadStripe( process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY );

export default function Checkout() {
    const cartItems = useGlobal((state) => state.cartItems)
    const [clientSecret, setClientSecret] = useState("");
    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        Axios.post("http://localhost:5000/create-payment-intent", { headers: { Accept: "application/json", "Content-Type": "application/json", "Access-Control-Allow-Credentials": true, }, body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }), withCredentials: true }) 
        .then((res) => {
            setClientSecret( res.data.clientSecret )
        })
        .catch((err) => { console.log(err) })
        }
    , []);
    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };
    return (
        <div className="flex space-between w-full">
            {/* Background color split screen for large screens */}
            {/* <div className="hidden lg:block fixed top-0 left-0 w-6/12 h-full bg-white" aria-hidden="true" />
            <div className="hidden lg:block fixed top-0 right-0 w-6/12 h-full bg-green-900" aria-hidden="true" /> */}
            {/* <div className="relative grid grid-cols-1 gap-x-16 max-w-7xl mx-auto lg:px-8 lg:grid-cols-2 lg:pt-16"> */}
                {/* <h1 className="sr-only">Checkout</h1> */}
                <section
                    aria-labelledby="payment-and-shipping-heading"
                    className="w-1/2 px-10 py-14">
                    <h2 id="payment-and-shipping-heading" className="sr-only">
                        Payment and shipping details
                    </h2>
                    {/* <form> */}
                        <div className="max-w-2xl mx-auto px-4 lg:max-w-none lg:px-0">
                            <div>
                                <h3 id="contact-info-heading" className="text-lg font-medium text-gray-900">
                                    Contact information
                                </h3>
                                <div className="mt-6">
                                    <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                                        Email address
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="email"
                                            id="email-address"
                                            name="email-address"
                                            autoComplete="email"
                                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-10">
                                <h3 className="text-lg font-medium text-gray-900">Shipping address</h3>
                                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
                                    <div className="sm:col-span-3">
                                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                            Address
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                type="text"
                                                id="address"
                                                name="address"
                                                autoComplete="street-address"
                                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                            City
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                type="text"
                                                id="city"
                                                name="city"
                                                autoComplete="address-level2"
                                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                                            State / Province
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                type="text"
                                                id="region"
                                                name="region"
                                                autoComplete="address-level1"
                                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                                            Postal code
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                type="text"
                                                id="postal-code"
                                                name="postal-code"
                                                autoComplete="postal-code"
                                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-10">
                                <h3 className="text-lg font-medium text-gray-900">Billing information</h3>
                                <div className="mt-6 flex items-center">
                                    <input
                                        id="same-as-shipping"
                                        name="same-as-shipping"
                                        type="checkbox"
                                        defaultChecked
                                        className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <div className="ml-2">
                                        <label htmlFor="same-as-shipping" className="text-sm font-medium text-gray-900">
                                            Same as shipping information
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-10">
                                <h3 className="text-lg font-medium text-gray-900">Payment details</h3>
                                { clientSecret && (
                                    <Elements options={ options } stripe={ stripePromise }>
                                        <CheckoutForm />
                                    </Elements>
                                )}
                                {/* <div className="mt-6 grid grid-cols-3 sm:grid-cols-4 gap-y-6 gap-x-4">
                                    <div className="col-span-3 sm:col-span-4">
                                        <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">
                                            Card number
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                type="text"
                                                id="card-number"
                                                name="card-number"
                                                autoComplete="cc-number"
                                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-2 sm:col-span-3">
                                        <label htmlFor="expiration-date" className="block text-sm font-medium text-gray-700">
                                            Expiration date (MM/YY)
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                type="text"
                                                name="expiration-date"
                                                id="expiration-date"
                                                autoComplete="cc-exp"
                                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">
                                            CVC
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                type="text"
                                                name="cvc"
                                                id="cvc"
                                                autoComplete="csc"
                                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    {/* </form> */}
                </section>
                <section
                    aria-labelledby="summary-heading"
                    className="bg-indigo-900 text-indigo-300 w-1/2 px-10 py-14">
                    <div className="max-w-2xl mx-auto px-4 lg:max-w-none lg:px-0">
                        <h2 id="summary-heading" className="">
                            Order summary
                        </h2>
                        {/* <dl>
                            <dt className="text-sm font-medium">Amount due</dt>
                            <dd className="mt-1 text-3xl font-extrabold text-white">$232.00</dd>
                        </dl> */}
                        <ul role="list" className="text-sm font-medium divide-y divide-white divide-opacity-10">
                            {cartItems.map((product) => (
                                <li key={product.id} className="flex items-start py-6 space-x-4">
                                    <img
                                        src={product.image}
                                        alt={product.image}
                                        className="flex-none w-20 h-20 rounded-md object-center object-cover"
                                    />
                                    <div className="flex-auto space-y-1">
                                        <h3 className="text-white">{product.name}</h3>
                                        <p>{product.category}</p>
                                        <p>Quantity: 1</p>
                                    </div>
                                    <p className="flex-none text-base font-medium text-white">{"$" + product.price}</p>
                                </li>
                            ))}
                        </ul>
                        <dl className="text-sm font-medium space-y-6 border-t border-white border-opacity-10 pt-6">
                            <div className="flex items-center justify-between">
                                <dt>Subtotal</dt>
                                <dd>{"$" + cartItems.reduce((total, item) => total = total + item.price, 0)}</dd>
                            </div>
                            <div className="flex items-center justify-between">
                                <dt>Shipping</dt>
                                <dd>{"$" + (cartItems.reduce((total, item) => total = total + item.price, 0)*0.08)}</dd>
                            </div>
                            {/* <div className="flex items-center justify-between">
                                <dt>Taxes</dt>
                                <dd>$47.60</dd>
                            </div> */}
                            <div className="flex items-center justify-between border-t border-white border-opacity-10 text-white pt-6">
                                <dt className="text-base">Total</dt>
                                <dd className="text-base">{"$" +
                                (cartItems.reduce((total, item) => total = total + item.price, 0) +
                                (cartItems.reduce((total, item) => total = total + item.price, 0)*0.08))}
                                </dd>
                            </div>
                        </dl>
                    </div>
                </section>
            {/* </div> */}
        </div>
    )
}