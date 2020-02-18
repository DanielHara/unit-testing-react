import React, { useState } from 'react';

const Product = (product) => (
  <div>
    <div>{product.id}</div>
    <div>{product.name}</div>
    <div>{product.price}</div>
  </div>
)

// You can switch between fetching from an API and simplying mocking the request to play around with the app.

const fetchProducts = (page) => fetch(`http://localhost/products?page=${page}`).then(response => response.json()).catch((error) => console.log(error))

/*
const fetchProducts = (page) => ({
  products: [{
    id: `dummy-id-1`,
    name: 'dummy-product',
    price: '10 £',
  }]
})
*/

export const ProductList = () => {
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)
  const loadProducts = async () => {
    const response = await fetchProducts(page)
    if(response) {
      const newProducts = response.products
      setProducts(products.concat(newProducts))
      setPage(page + 1)
    }
  }
  return <div>
    <button onClick={loadProducts}>
       Load more!
    </button>
    {products.map(product => <Product {...product} />)}
  </div>
}

export default ProductList;
