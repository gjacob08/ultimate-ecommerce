import ImportProductModal from "../components/ImportProductModal"
import UpdateProductModal from "../components/UpdateProductModal"
import { Fragment, useEffect, useState } from "react"
import { useGlobal } from '../Global'
import Axios from "axios"

import { Listbox, Transition } from '@headlessui/react'
import { 
    CheckIcon, 
    SelectorIcon, 
    PencilAltIcon, 
    TrashIcon 
} from '@heroicons/react/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

let categories = ["All"]

export default function Inventory() {
    const toggleImportProductModal = useGlobal((state) => state.toggleImportProductModal )
    const toggleUpdateProductModal = useGlobal((state) => state.toggleUpdateProductModal )
    const setProductUpdateId = useGlobal((state) => state.setProductUpdateId )

    const [products, setProducts] = useState(null)
    const [selectedSortCategory, setSelectedSortCategory] = useState(categories[0])

    useEffect(() => {
      const getProductsEffect = () => {
          Axios.get("http://localhost:5000/api/products", { headers: { Accept: "application/json", "Content-Type": "application/json", "Access-Control-Allow-Credentials": true, }, withCredentials: true }) 
          .then((resObject) => { 
              // resObject.data.sort((a, b) => (a["category"] > b["category"]) ? 1:-1)
            categories = ["All"]
            for ( let data of resObject.data ) if ( !categories.includes( data.category ) ) categories.push( data.category ) 
            categories.push(resObject.data.category)
            let filteredProducts
            ( selectedSortCategory === "All" ? filteredProducts = resObject.data  : filteredProducts = resObject.data.filter( product => product.category.includes( selectedSortCategory ) ) )
            setProducts( filteredProducts )
        }) 
          .catch((err) => { console.log(err) })}
      getProductsEffect()
    }, [selectedSortCategory])

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
                            <div className="flex items-center">
                                <p className="mr-4">Sort by Category:</p>
                                <Listbox value={ selectedSortCategory } onChange={ setSelectedSortCategory }>
                                    {({ open }) => (
                                    <>
                                        <div className="mt-1 relative">
                                            <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                            <span className="block truncate">{ selectedSortCategory }</span>
                                            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                            </span>
                                            </Listbox.Button>
                                            <Transition
                                            show={open}
                                            as={Fragment}
                                            leave="transition ease-in duration-100"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                            >
                                            <Listbox.Options className="absolute z-10 mt-1 w-max bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                                {categories.map(( category ) => (
                                                <Listbox.Option
                                                    key={ category }
                                                    className={({ active }) =>
                                                    classNames(
                                                        active ? 'pl-8 text-white bg-indigo-600' : 'pl-8 text-gray-900',
                                                        'cursor-default select-none relative py-2 pl-4 pr-4'
                                                    )
                                                    }
                                                    value={ category }
                                                >
                                                    {({ selected, active }) => (
                                                    <>
                                                        <span className={ classNames( selected ? 'font-semibold' : 'font-normal', 'block truncate' ) }>
                                                        { category }
                                                        </span>
                                                        { selected ? (
                                                        <span
                                                            className={classNames(
                                                            active ? 'mr-8 text-white' : 'mr-8 text-indigo-600',
                                                            'absolute inset-y-0 left-0 flex items-center pl-1.5'
                                                            )}
                                                        >
                                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                        </span>
                                                        ) : null}
                                                    </>
                                                    )}
                                                </Listbox.Option>
                                                ))}
                                            </Listbox.Options>
                                            </Transition>
                                        </div>
                                    </>
                                )}
                                </Listbox>
                                <button
                                    onClick={ toggleImportProductModal }
                                    className="inline-flex ml-4 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 sm:w-auto"
                                >
                                    Add Product
                                </button>
                            </div>
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
                                                    Category
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
                                                        </div>
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                        <div className="text-gray-900">{product.name}</div>
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500">
                                                        <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                                            { product.category }
                                                        </span>
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-500">{product.countInStock}</td>
                                                    <td className="relative flex justify-center whitespace-nowrap py-4 text-right text-sm font-medium">
                                                        <button onClick={ () => { setProductUpdateId( product._id ); toggleUpdateProductModal() } } className="mx-1 text-green-600 hover:text-green-900">
                                                            <PencilAltIcon className="h-6 w-6" /><span className="sr-only">, { product.name }</span>
                                                        </button>
                                                        <a href={ "http://localhost:5000/api/products/delete/" + product._id } className="mx-1 text-red-600 hover:text-red-900">
                                                            <TrashIcon className="h-6 w-6" /><span className="sr-only">, { product.name }</span>
                                                        </a>
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
