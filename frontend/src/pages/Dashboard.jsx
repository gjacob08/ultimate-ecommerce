import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const transactions = [
  {
    id: "AAPS0L",
    company: "Chase & Co.",
    share: "CAC",
    commission: "+$4.37",
    price: "$3,509.00",
    quantity: "12.00",
    netAmount: "$4,397.00",
  },
  // More transactions...
];

export default function Dashboard() {
  const [orders, getOrders] = useState(null)

  useEffect(() => {
    const getOrdersEffect = () => {
      axios.get("http://localhost:5000/api/orders", { headers: { Accept: "application/json", "Content-Type": "application/json", "Access-Control-Allow-Credentials": true, }, withCredentials: true }) 
        .then((resObject) => { getOrders(resObject.data) }) 
        .catch((err) => { console.log(err) })}
    getOrdersEffect()
  }, [])


  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h2 id="products-heading" className="mt-8 ml-8 mb-2 text-2xl">Transactions</h2>
          <p className="mt-2 text-sm text-gray-700">
            A table of transactions made from this app to the Stripe Website.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="text-center whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Receipt Tracking No.
                    </th>
                    <th scope="col" className="text-center whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Customer Name
                    </th>
                    <th scope="col" className="text-center whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Amount
                    </th>
                    <th scope="col" className="text-center whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Paid
                    </th>
                    <th scope="col" className="text-center whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Delivered
                    </th>
                    <th scope="col" className="text-center whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Contact
                    </th>
                    <th scope="col" className="text-center whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Postal Code
                    </th>
                    <th scope="col" className="text-center whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Country
                    </th>
                    <th scope="col" className="relative whitespace-nowrap py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {orders?.reverse().map((order) => (
                    <tr key={order._id}>
                      <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">
                        {order._id}
                      </td>
                      <td className="text-center whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">
                        {order.user.name}
                      </td>
                      <td className="text-center whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">
                        {"$" + order.totalPrice.toFixed(2)}
                      </td>
                      <td className="text-center whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                        { order.isPaid ? <div className="p-1 rounded-md text-black bg-green-300">Paid</div> : <div className="p-1 rounded-md text-black bg-red-300">Not Paid</div> }
                      </td>
                      <td className="text-center whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                        { order.isDelivered ? <div className="p-1 rounded-md text-black bg-green-300">Delivered</div> : <div className="p-1 rounded-md text-black bg-yellow-300">Not Delivered</div>}
                      </td>
                      <td className="text-center whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                        {"0" + order.user.phone}
                      </td>
                      <td className="text-center whitespace-nowrap px-2 py-2 text-sm text-gray-900">
                        {order.shippingAddress.postal}
                      </td>
                      <td className="text-center whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                        {order.shippingAddress.country}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
