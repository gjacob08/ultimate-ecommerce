import PaymentSuccess from './PaymentSuccessModal'
import { SearchIcon } from '@heroicons/react/solid'
import { useGlobal } from '../Global'

import { useEffect } from 'react'
import { ShoppingCartIcon } from '@heroicons/react/outline'

export default function TopBar() {
  const toggleCart = useGlobal((state) => state.toggleCart)

  const togglePaymentSuccessModal = useGlobal((state) => state.togglePaymentSuccessModal )
  const emptyCart = useGlobal((state) => state.emptyCart )

  const receipt = {
    payment_intent: "",
    payment_intent_client_secret: "",
    redirect_status: "",
  }

  useEffect(() => {
      receipt.payment_intent = window.location.search.split("&")[0].split("?")[1];
      receipt.payment_intent_client_secret = window.location.search.split("&")[1];
      receipt.redirect_status = window.location.search.split("=")[3];

      if ( receipt.redirect_status === "succeeded" ) {
          emptyCart()
          togglePaymentSuccessModal(true)
      }
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