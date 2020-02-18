import React, { useState } from 'react'

const Product = (product) => (
  <li>
    <h3>{product.id}</h3>
    <p>{product.name}</p>
    <p>{product.price}</p>
  </li>
)

// You can switch between fetching from an API and simplying mocking the request to play around with the app.

const defaultFetchProducts = (page) => fetch(`http://localhost/products?page=${page}`).then(response => response.json())

/*
const defaultFetchProducts = (page) => ({
  products: [{
    id: `dummy-id-1`,
    name: 'dummy-product',
    price: '10 £',
  }]
})
*/

export const ProductList = ({ fetchProducts = defaultFetchProducts }) => {
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)
  const loadProducts = async () => {
    const response = await fetchProducts(page)
    if (response) {
      const newProducts = response.products
      setProducts(products.concat(newProducts))
      setPage(page + 1)
    }
  }
  return (
    <>
      <ul>
        {products.map(product => <Product {...product} />)}
      </ul>
      <button onClick={loadProducts}>
       Load more!
      </button>
    </>
  )
}

export default ProductList
