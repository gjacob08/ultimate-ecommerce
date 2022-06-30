import React, { useEffect, useState } from "react";
import {
    PaymentElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";

export default function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [inputName, setinputName] = useState(null);
    const [inputEmail, setinputEmail] = useState(null);
    const [inputPhone, setinputPhone] = useState(null);
    
    const [inputLine1, setinputLine1] = useState(null);
    const [inputLine2, setinputLine2] = useState(null);
    const [inputCity, setinputCity] = useState(null);
    const [inputState, setinputState] = useState(null);
    const [inputPostal, setinputPostal] = useState(null);

    useEffect(() => {
        if (!stripe) return

        const clientSecret = new URLSearchParams(window.location.search).get("payment_intent_client_secret");
        if (!clientSecret) return

        stripe.retrievePaymentIntent(clientSecret)
            .then(({ paymentIntent }) => {
                switch (paymentIntent.status) {
                    case "succeeded":
                        setMessage("Payment succeeded!");
                        break;
                    case "processing":
                        setMessage("Your payment is processing.");
                        break;
                    case "requires_payment_method":
                        setMessage("Your payment was not successful, please try again.");
                        break;
                    default:
                        setMessage("Something went wrong.");
                        break;
                }
            });
    }, [stripe]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Stripe.js has not yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        if (!stripe || !elements) return

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: "http://localhost:3000",
                payment_method_data: {
                    billing_details: {
                        name: 'Wesley',
                        email: 'wesleymelencion@gmail.com',
                        phone: 9123456789,
                        address: {
                            city: "Santa Rosa",
                            line1: "867-B, Lucero Street",
                            line2: "Barangay Malusak",
                            postal_code: 4026,
                            state: "Laguna"
                        }
                    }
                },
            }
        });

        if (error.type === "card_error" || error.type === "validation_error") setMessage(error.message);
        else setMessage("An unexpected error occurred.");

        setIsLoading(false);
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <div className="max-w-2xl mx-auto px-4 lg:max-w-none lg:px-0">
                <div>
                    <h3 id="contact-info-heading" className="text-lg font-medium text-gray-900">
                        Contact information
                    </h3>

                    <div className="flex">
                        <div className="mt-6 w-1/2 pr-2">
                            <label htmlFor="input-name" className="block text-sm font-medium text-gray-700">
                                Name
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    id="input-name"
                                    name="input-name"
                                    autoComplete="text"
                                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>
                        <div className="mt-6 w-1/2 pl-2">
                            <label htmlFor="input-phone" className="block text-sm font-medium text-gray-700">
                                Phone
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    id="input-phone"
                                    name="input-phone"
                                    autoComplete="text"
                                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>
                    </div>
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
                    <PaymentElement id="payment-element" />
                    <div className="mt-10 flex justify-end pt-6 border-t border-gray-200">
                        <button
                            disabled={isLoading || !stripe || !elements} id="submit"
                            className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500">
                            <span id="button-text">
                                {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
                            </span>
                        </button>
                    </div>
                    {/* Show any error or success messages */}
                    {message && <div id="payment-message">{message}</div>}
                </div>
            </div>
        </form>
    );
}