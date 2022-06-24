import ProductCard from "../components/Product";
import { useEffect, useState } from "react";
import Axios from 'axios';

export default function Products() {
  const [products, getProducts] = useState(null)

  useEffect(() => {
    const getProductsEffect = () => {
      Axios.get("http://localhost:5000/api/products", { headers: { Accept: "application/json", "Content-Type": "application/json", "Access-Control-Allow-Credentials": true, }, withCredentials: true }) 
        .then((resObject) => { console.log(resObject.data); getProducts(resObject.data) }) 
        .catch((err) => { console.log(err) })}
    getProductsEffect()
  }, [])

  return !products ? null : (
      <div className="bg-white">
        <div className="max-w-xl mx-auto py-16 px-4 sm:py-8 sm:px-6 lg:max-w-7xl lg:px-8">
            <h2 id="products-heading" className="ml-8 mb-12 text-2xl"> Products </h2>

            <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8">
              {products.map((product) => ( <ProductCard product={ product }/> ))}
            </div>
        </div>
      </div>
  )
}