import PaymentSuccess from './PaymentSuccessModal'
import { SearchIcon } from '@heroicons/react/solid'
import { useGlobal } from '../Global'

import { useEffect } from 'react'
import { ShoppingCartIcon } from '@heroicons/react/outline'

import Axios from "axios"

let mountedOnce = false

export default function TopBar() {
  const userToken = useGlobal((state) => state.userToken)

  const toggleCart = useGlobal((state) => state.toggleCart)
  const cartItems = useGlobal((state) => state.cartItems)

  const togglePaymentSuccessModal = useGlobal((state) => state.togglePaymentSuccessModal )
  const emptyCart = useGlobal((state) => state.emptyCart )

  const receipt = {
    payment_intent: "",
    payment_intent_client_secret: "",
    redirect_status: "",
  }

  useEffect(() => {
      if ( !mountedOnce ) {
        receipt.payment_intent = new URLSearchParams(window.location.search).get("payment_intent")
        receipt.payment_intent_client_secret = new URLSearchParams(window.location.search).get("payment_intent_client_secret")
        receipt.redirect_status = new URLSearchParams(window.location.search).get("redirect_status")

        if ( receipt.redirect_status === "succeeded" ) {
          for ( let item of cartItems ) {
            Axios.get("http://localhost:5000/api/products/" + item._id, { headers: { Accept: "application/json", "Content-Type": "application/json", "Access-Control-Allow-Credentials": true, }, withCredentials: true })
                  .then((resObject) => { let countInStock = resObject.data.countInStock - item.quantity
                                        Axios.post("http://localhost:5000/api/products/" + item._id, { headers: { Accept: "application/json", "Content-Type": "application/json", "Access-Control-Allow-Credentials": true, }, data: { countInStock }, withCredentials: true })
                                          .then((resObject) => { console.log("Updated Stocks") })
                                        })
                  .catch((err) => { console.log(err) })
          }

          Axios.get("http://localhost:5000/api/users/login/success", { headers: { Authorization: `Bearer ${userToken}`, Accept: "application/json", "Content-Type": "application/json", "Access-Control-Allow-Credentials": true, }, withCredentials: true })
            .then((resObject) => { const user = resObject.data
                                  Axios.get("https://api.stripe.com/v1/payment_intents/" + receipt.payment_intent, { headers: { Authorization: `Bearer ${process.env.REACT_APP_STRIPE_SECRET_KEY}`, Accept: "application/json", "Content-Type": "application/json", "Access-Control-Allow-Credentials": true }, withCredentials: true })
                                    .then((transaction_record) => {
                                                  Axios.post("http://localhost:5000/api/orders", { headers: { Accept: "application/json", "Content-Type": "application/json", "Access-Control-Allow-Credentials": true, }, data: { user, cartItems, receipt, transaction_record }, withCredentials: true })
                                                    .then((res) => console.log("Order Saved.") ) 
                                                })  })
            .catch((err) => { console.log(err) })
          emptyCart()
          togglePaymentSuccessModal(true)
        } 
      }
      return () => mountedOnce = true
  }, []);

  return (
    <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
      <div className="flex-1 px-4 flex justify-between">
        <div className="flex-1 flex">
          <form className="w-full flex md:ml-0" action="#" method="GET">
            <label htmlFor="search-field" className="sr-only">
              Search
            </label>
            <div className="relative w-full text-gray-400 focus-within:text-gray-600">
              <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5" aria-hidden="true" />
              </div>
              <input
                id="search-field"
                className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
                placeholder="Search"
                type="search"
                name="search"
              />
            </div>
          </form>
        </div>
        <div className="ml-4 flex items-center md:ml-6">
          <button
            onClick={ toggleCart }
            className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">View notifications</span>
            <PaymentSuccess />
            <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  )
}