import { Link } from "react-router-dom"

const ProductCard = ({ product }) => {
    return (
        <Link key={ product._id } to={`/products/${product._id}`} className="group shadow-xl rounded-lg">
        <div className="w-full aspect-w-1 aspect-h-1 rounded-lg overflow-hidden sm:aspect-w-2 sm:aspect-h-3">
            <img src={ product.image } alt={ product.name }
            className="w-full h-full object-center object-cover group-hover:opacity-75" />
        </div>
        <div className="px-4 mt-4 flex items-center justify-between text-base font-medium text-gray-900">
            <h3>{ product.name }</h3>
            <p>{"$" + product.price }</p>
        </div>
        <p className="px-4 mt-2 mb-4 text-sm italic text-gray-500">{ product.description }</p>
        {/* <div className="flex justify-center">
            <button className="my-4 py-2 px-8 shadow-md rounded-lg bg-green-600 text-white font-bold hover:bg-green-400">Add to cart</button>
        </div> */}
        </Link>
    );
  };
  
  export default ProductCard;