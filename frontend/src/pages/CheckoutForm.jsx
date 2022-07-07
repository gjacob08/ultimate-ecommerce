import React, { useEffect, useState } from "react";
import {
    PaymentElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [fields, setFields] = useState([
        { name: "name", input: "", error: false }, 
        { name: "phone", input: "", error: false }, 
        { name: "email", input: "", error: false },
        { name: "line1", input: "", error: false },
        { name: "line2", input: "", error: false },
        { name: "city", input: "", error: false },
        { name: "state", input: "", error: false },
        { name: "postal", input: "", error: false }
    ])

    const handleErrors = ( name, status ) => { setFields( prevFields => 
        prevFields.map((field) => field.name === name ? { ...field, error: status } : { ...field }));
    };

    const handleInputs = ( name, i ) => { setFields( prevFields =>
        prevFields.map((field) => field.name === name ? { ...field, input: i.target.value, error: false } : { ...field }));
    };

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

        for ( let index = 0; index < fields.length; index++ ){
            if ( fields[index].input === "" ) handleErrors( fields[index].name, true )
        }

        if ( fields[0].input !== "" && fields[1].input !== "" && fields[2].input !== ""
            && fields[3].input !== "" && fields[4].input !== "" && fields[5].input !== ""
             && fields[6].input !== "" && fields[7].input !== "") {

                setIsLoading(true);

                const { error } = await stripe.confirmPayment({
                    elements,
                    confirmParams: {
                        return_url: "http://localhost:3000",
                        payment_method_data: {
                            billing_details: {
                                name: fields[0].input,
                                phone: fields[1].input,
                                email: fields[2].input,
                                address: {
                                    line1: fields[3].input,
                                    line2: fields[4].input,
                                    city: fields[5].input,
                                    state: fields[6].input,
                                    postal_code: fields[7].input
                                }
                            },
                        },
                    }
                });

                if (error.type === "card_error" || error.type === "validation_error") setMessage(error.message);
                else setMessage("An unexpected error occurred.");

                setIsLoading(false);
             }
    };

    return (
        <form id="payment-form" onSubmit={ handleSubmit }>
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
                                    onChange = { i => handleInputs( "name", i ) }
                                    defaultValue = { fields[0].input }
                                    type="text"
                                    id="input-name"
                                    name="input-name"
                                    autoComplete="name"
                                    className={classNames( fields[0].error ? 'border-red-500 border-2' : 'border-gray-300',
                                                        'block w-full rounded-md shadow-sm focus:ring-indigo-200 focus:border-indigo-200 sm:text-sm')}
                                />
                                { fields[0].error ? <p className="text-sm font-medium text-red-500">Name field is required.</p> : null }
                            </div>
                        </div>
                        <div className="mt-6 w-1/2 pl-2">
                            <label htmlFor="input-phone" className="block text-sm font-medium text-gray-700">
                                Phone
                            </label>
                            <div className="mt-1">
                                <input
                                    onChange = { i => handleInputs( "phone", i ) }
                                    defaultValue = { fields[1].input }
                                    type="text"
                                    id="input-phone"
                                    name="input-phone"
                                    autoComplete="phone"
                                    className={classNames( fields[1].error ? 'border-red-500 border-2' : 'border-gray-300',
                                                        'block w-full rounded-md shadow-sm focus:ring-indigo-200 focus:border-indigo-200 sm:text-sm')}
                                />
                                { fields[1].error ? <p className="text-sm font-medium text-red-500">Phone number is required.</p> : null }
                            </div>
                        </div>
                    </div>
                    <div className="mt-6">
                        <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                            Email address
                        </label>
                        <div className="mt-1">
                            <input
                                onChange = { i => handleInputs( "email", i ) }
                                defaultValue = { fields[2].input }
                                type="email"
                                id="email-address"
                                name="email-address"
                                autoComplete="email"
                                className={classNames( fields[2].error ? 'border-red-500 border-2' : 'border-gray-300',
                                                        'block w-full rounded-md shadow-sm focus:ring-indigo-200 focus:border-indigo-200 sm:text-sm')}
                                />
                                { fields[2].error ? <p className="text-sm font-medium text-red-500">Email Address is required.</p> : null }
                        </div>
                    </div>
                </div>

                <div className="mt-10">
                    <h3 className="text-lg font-medium text-gray-900">Shipping address</h3>

                    <div className="mt-6">
                        <div className="flex w-full">
                            <div className="sm:col-span-3 w-1/2 mr-2">
                                <label htmlFor="address-line1" className="block text-sm font-medium text-gray-700">
                                    Address Line 1
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange = { i => handleInputs( "line1", i ) }
                                        defaultValue = { fields[3].input }
                                        type="text"
                                        id="address-line1"
                                        name="line1"
                                        autoComplete="address-level1"
                                        className={classNames( fields[3].error ? 'border-red-500 border-2' : 'border-gray-300',
                                                        'block w-full rounded-md shadow-sm focus:ring-indigo-200 focus:border-indigo-200 sm:text-sm')}
                                />
                                { fields[3].error ? <p className="text-sm font-medium text-red-500">Address Line 1 is required.</p> : null }
                                </div>
                            </div>
                            <div className="sm:col-span-3 w-1/2 ml-2">
                                <label htmlFor="address-line2" className="block text-sm font-medium text-gray-700">
                                    Address Line 2
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange = { i => handleInputs( "line2", i ) }
                                        defaultValue = { fields[4].input }
                                        type="text"
                                        id="address-line2"
                                        name="line2"
                                        autoComplete="address-level2"
                                        className={classNames( fields[4].error ? 'border-red-500 border-2' : 'border-gray-300',
                                                        'block w-full rounded-md shadow-sm focus:ring-indigo-200 focus:border-indigo-200 sm:text-sm')}
                                />
                                { fields[4].error ? <p className="text-sm font-medium text-red-500">Address Line 2 is required.</p> : null }
                                </div>
                            </div>
                        </div>

                        <div className="flex mt-6">
                            <div>
                                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                    City
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange = { i => handleInputs( "city", i ) }
                                        defaultValue = { fields[5].input }
                                        type="text"
                                        id="city"
                                        name="city"
                                        autoComplete="address-level3"
                                        className={classNames( fields[5].error ? 'border-red-500 border-2' : 'border-gray-300',
                                                        'block w-full rounded-md shadow-sm focus:ring-indigo-200 focus:border-indigo-200 sm:text-sm')}
                                />
                                { fields[5].error ? <p className="text-sm font-medium text-red-500">City is required.</p> : null }
                                </div>
                            </div>
                            <div className="px-4">
                                <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                                    State / Province
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange = { i => handleInputs( "state", i ) }
                                        defaultValue = { fields[6].input }
                                        type="text"
                                        id="region"
                                        name="region"
                                        autoComplete="address-level4"
                                        className={classNames( fields[6].error ? 'border-red-500 border-2' : 'border-gray-300',
                                                        'block w-full rounded-md shadow-sm focus:ring-indigo-200 focus:border-indigo-200 sm:text-sm')}
                                />
                                { fields[6].error ? <p className="text-sm font-medium text-red-500">State field is required.</p> : null }
                                </div>
                            </div>
                            <div>
                                <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                                    Postal code
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange = { i => handleInputs( "postal", i ) }
                                        defaultValue = { fields[7].input }
                                        type="text"
                                        id="postal-code"
                                        name="postal-code"
                                        autoComplete="postal-code"
                                        className={classNames( fields[7].error ? 'border-red-500 border-2' : 'border-gray-300',
                                                        'block w-full rounded-md shadow-sm focus:ring-indigo-200 focus:border-indigo-200 sm:text-sm')}
                                />
                                { fields[7].error ? <p className="text-sm font-medium text-red-500">Postal Code is required.</p> : null }
                                </div>
                            </div>
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
                </div>
            </div>
        </form>
    );
}
