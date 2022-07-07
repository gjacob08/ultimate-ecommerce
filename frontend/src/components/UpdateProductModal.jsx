/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import CategorySelector from "./CategorySelector"
import Axios from "axios"

import { useGlobal } from '../Global'

export default function UpdateProductModal() {
  const toggleUpdateProductModal = useGlobal((state) => state.toggleUpdateProductModal )
  const updateProductModalOpen = useGlobal((state) => state.updateProductModalOpen )

  const productId = useGlobal((state) => state.productUpdateId )

  const [product, setProduct] = useState(null);

    useEffect(() => {
        const getProductInfoEffect = () => {
            Axios.get("http://localhost:5000/api/products/" + productId, { headers: { Accept: "application/json", "Content-Type": "application/json", "Access-Control-Allow-Credentials": true, }, withCredentials: true })
                .then((resObject) => { setProduct(resObject.data) })
                .catch((err) => { console.log(err) })
        }
        getProductInfoEffect()
    }, [productId])

  return !product ? null : (
    <Transition.Root show={ updateProductModalOpen } as={ Fragment }>
      <Dialog as="div" className="relative z-10" onClose={ toggleUpdateProductModal }>
        <Transition.Child
          as={ Fragment }
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={ Fragment }
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-2xl sm:w-full sm:p-6">
                <div>
                  <div className="mt-3 text-center sm:mt-1">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                      Product Details Form
                    </Dialog.Title>
                    <div className="mt-4">
                    <iframe name="dummyframe" id="dummyframe" className='sr-only'></iframe>
                      <form className="space-y-6" target="dummyframe" action={"http://localhost:5000/api/products/" + product._id} method="POST">
                        <div className="block sm:flex">
                          <div className='w-full'>
                            <div className='block sm:flex justify-between'>
                              <div className='w-2/3'>
                                <label htmlFor="productname" className="block text-sm font-medium text-gray-700">
                                  Product Name
                                </label>
                                <div className="mt-1 mx-2">
                                  <input
                                    id="productname"
                                    key={ product._id }
                                    defaultValue={ product.name }
                                    name="name"
                                    type="text"
                                    required
                                    className="appearance-none w-full block px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                  />
                                </div>
                              </div>
                              <div className='w-1/3'>
                                <label htmlFor="productcateory" className="block text-sm font-medium text-gray-700">
                                  Category
                                </label>
                                <div className="mt-1 mx-2">
                                    <CategorySelector selections={ [{name: "Keyboard"}, {name: "Mouse"}, {name: "Headset"}, {name: "RAM"}, {name: "Cooling Fan"}] }/>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='w-full'>
                          <label htmlFor="productdescription" className="block text-sm font-medium text-gray-700">
                            Product Description
                          </label>
                          <div className="mt-1 mx-2">
                            <textarea
                              id="productdescription"
                              key={ product._id }
                              defaultValue={ product.description }
                              name="description"
                              required
                              className="appearance-none w-full block px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              rows="6" cols="50"
                            />
                          </div>
                        </div>
                        <div className='w-full'>
                          <label htmlFor="productimage" className="block text-sm font-medium text-gray-700">
                            Image Link
                          </label>
                          <div className="mt-1 mx-2">
                            <input
                              id="productimage"
                              key={ product._id }
                              defaultValue={ product.image }
                              name="image"
                              type="text"
                              required
                              className="appearance-none w-full block px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                          </div>
                        </div>
                        <div className='w-full'>
                          <div className='block sm:flex justify-between'>
                            <div className='w-1/2'>
                              <label htmlFor="productprice" className="block text-sm font-medium text-gray-700">
                                Price
                              </label>
                              <div className="mt-1 mx-2">
                                <input
                                  id="productprice"
                                  key={ product._id }
                                  defaultValue={ product.price }
                                  name="price"
                                  type="text"
                                  required
                                  className="appearance-none w-full block px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                              </div>
                            </div>
                            <div className='w-1/2'>
                              <label htmlFor="productstocks" className="block text-sm font-medium text-gray-700">
                                Stocks
                              </label>
                              <div className="mt-1 mx-2">
                                <input
                                  id="productstocks"
                                  key={ product._id }
                                  defaultValue={ product.countInStock }
                                  name="countInStock"
                                  type="text"
                                  required
                                  className="appearance-none w-full block px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <button
                            onClick={() => { toggleUpdateProductModal(); window.location = "/inventory" }}
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Update Product Details
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
