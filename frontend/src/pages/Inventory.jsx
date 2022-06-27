import ImportProductModal from "../components/ImportProductModal"
import UpdateProductModal from "../components/UpdateProductModal"
import { useEffect, useState } from "react"
import Axios from "axios"

import { useGlobal } from '../Global'

export default function Inventory() {
    const toggleImportProductModal = useGlobal((state) => state.toggleImportProductModal)
    const toggleUpdateProductModal = useGlobal((state) => state.toggleUpdateProductModal)
    const setProductUpdateId = useGlobal((state) => state.setProductUpdateId)

    // const openUpdateProductModal = (id) => {
    //     toggleUpdateProductModal
    //     setProductUpdateId(id)
    // }

    const [products, getProducts] = useState(null)

    useEffect(() => {
      const getProductsEffect = () => {
        Axios.get("http://localhost:5000/api/products", { headers: { Accept: "application/json", "Content-Type": "application/json", "Access-Control-Allow-Credentials": true, }, withCredentials: true }) 
          .then((resObject) => { getProducts(resObject.data) }) 
          .catch((err) => { console.log(err) })}
      getProductsEffect()
    }, [])

    return !products ? null : (
        <div className="bg-white">
            <div className="max-w-xl mx-auto py-16 px-4 sm:py-8 sm:px-6 lg:max-w-7xl lg:px-2">
                <h2 id="products-heading" className="ml-8 text-2xl"> Inventory </h2>
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="sm:flex sm:items-center">
                        <div className="sm:flex-auto">
                            <p className="mt-2 text-sm text-gray-700">
                                A list of all the products currently in store.
                            </p>
                        </div>
                        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                            <button
                                onClick={ toggleImportProductModal }
                                className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 sm:w-auto"
                            >
                                Add Product
                            </button>
                        </div>
                    </div>
                    <div className="mt-8 flex flex-col">
                        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-300">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                    Image
                                                </th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    Product Name
                                                </th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-center text-sm font-semibold text-gray-900">
                                                    Tag
                                                </th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-center text-sm font-semibold text-gray-900">
                                                    Quantity
                                                </th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-center text-sm font-semibold text-gray-900">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                            {products.map((product) => (
                                                <tr key={product._id}>
                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                                        <div className="flex items-center">
                                                            <div className="h-10 w-10 flex-shrink-0">
                                                                <img className="h-10 w-10 rounded-full" src={product.image} alt="" />
                                                            </div>
                                                            <div className="ml-4">
                                                                {/* <div className="font-medium text-gray-900">{product.name}</div> */}
                                                                {/* <div className="text-gray-500">{product.email}</div> */}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                        <div className="text-gray-900">{product.name}</div>
                                                        {/* <div className="text-gray-500">{product.department}</div> */}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500">
                                                        <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                                            { product.category }
                                                        </span>
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-500">{product.countInStock}</td>
                                                    <td className="relative flex justify-center whitespace-nowrap py-4 text-right text-sm font-medium">
                                                        <button href="#" onClick={ () => { setProductUpdateId( product._id ); toggleUpdateProductModal() } } className="mx-1 text-indigo-600 hover:text-indigo-900">
                                                            Edit<span className="sr-only">, {product.name}</span>
                                                        </button>
                                                        <button href="#" className="mx-1 text-indigo-600 hover:text-indigo-900">
                                                            Delete<span className="sr-only">, {product.name}</span>
                                                        </button>
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
            </div>
            <ImportProductModal />
            <UpdateProductModal />
        </div>
    )
}
