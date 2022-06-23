const ProductCard = ({ product }) => {
    return (
        <a key={product._id} href={product.href} className="group">
        <div className="w-full aspect-w-1 aspect-h-1 rounded-lg overflow-hidden sm:aspect-w-2 sm:aspect-h-3">
            <img src={product.image} alt={product.name}
            className="w-full h-full object-center object-cover group-hover:opacity-75" />
        </div>
        <div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
            <h3>{product.name}</h3>
            <p>{"$"+product.price}</p>
        </div>
        <p className="mt-1 text-sm italic text-gray-500">{product.description}</p>
        </a>
    );
  };
  
  export default ProductCard;