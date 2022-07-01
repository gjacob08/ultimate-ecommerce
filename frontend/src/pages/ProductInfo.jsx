import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import Axios from 'axios';

import { useGlobal } from '../Global';

export default function ProductInfo() {

    const addItem = useGlobal((state) => state.addItem)
    const add = () => { 
        if ( quantity <= 0 ) setQuantity(1)
        // if ( cartItems.includes( productInfo._id ) ) productInfo.quantity = productInfo.quantity + quantity
        else productInfo.quantity = quantity
        
        addItem( productInfo ) 
    }
    
    let { productId } = useParams();
    let [quantity, setQuantity] = useState(1);
    const [productInfo, setProductInfo] = useState(null);
    // const cartItems = useGlobal((state) => state.cartItems)

    useEffect(() => {
        const getProductInfoEffect = () => {
            Axios.get("http://localhost:5000/api/products/" + productId, { headers: { Accept: "application/json", "Content-Type": "application/json", "Access-Control-Allow-Credentials": true, }, withCredentials: true })
                .then((resObject) => { setProductInfo(resObject.data) })
                .catch((err) => { console.log(err) })
        }
        getProductInfoEffect()
    }, [productId])

    return !productInfo ? null : (
        <div className="bg-white">
            <div className="max-w-xl mx-auto py-16 px-4 sm:py-8 sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 id="products-heading" className="ml-8 text-2xl"> {productInfo.category} </h2>

                <div className="bg-white">
                    <div className="pt-2 pb-16 sm:pb-24">
                        <div className="mt-8 max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                            <div className="lg:grid lg:grid-cols-12 lg:auto-rows-min lg:gap-x-8">
                                <div className="lg:col-start-8 lg:col-span-5">
                                    <div className="flex justify-between">
                                        <h1 className="text-xl font-medium text-gray-900">{productInfo.name}</h1>
                                        <p className="text-xl font-medium text-gray-900">{"$" + productInfo.price}</p>
                                    </div>
                                </div>

                                {/* Image gallery */}
                                <div className="mt-8 lg:mt-0 lg:col-start-1 lg:col-span-7 lg:row-start-1 lg:row-span-3">
                                    <h2 className="sr-only">Images</h2>

                                    <img className='rounded-lg' src={ productInfo.image } alt={ productInfo.image }></img>
                                </div>

                                <div className="mt-2 lg:col-span-5">
                                    {/* Product details */}
                                    <div className="mt-10">
                                        <h2 className="text-sm font-medium text-gray-900">Description</h2>

                                        <div className="prose prose-sm text-gray-500"
                                            dangerouslySetInnerHTML={{ __html: productInfo.description }} />
                                    </div>
                                    <div className='mt-4 flex items-center'>
                                        <label htmlFor="qty">Quantity:</label>
                                        <input className="ml-2 rounded-lg w-2/12" onChange={(i) => { setQuantity(i.target.value) }} type="text" name="quantity" defaultValue={1} id="quantity" />
                                    </div>
                                    <Link
                                        onClick={ add }
                                        to={"../products"}
                                        className="mt-8 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                        Add to cart
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
