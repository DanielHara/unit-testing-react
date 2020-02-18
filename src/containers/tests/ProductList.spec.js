import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import ProductList from '../ProductList'
import Bluebird from 'bluebird'
import { act } from 'react-dom/test-utils'

it('should render a button to load products', async () => {
  const fetchProducts = jest.fn().mockImplementation((page) => Promise.resolve({
    products: [{
      id: `dummy-id-${page}`,
      name: 'dummy-product',
      price: '10 £'
    }]
  }))

  const { getByText } = render(<ProductList fetchProducts={fetchProducts} />)

  const loadMoreButton = getByText('Load more!')

  // click the first time
  fireEvent.click(loadMoreButton)
  await act(() => Bluebird.delay(500))

  // expect one product
  expect(getByText('dummy-id-1')).toBeTruthy()
  expect(fetchProducts).toHaveBeenCalledTimes(1)
  expect(fetchProducts).toHaveBeenCalledWith(1)

  // click the second time
  fireEvent.click(loadMoreButton)
  await act(() => Bluebird.delay(500))

  // expect two products
  expect(getByText('dummy-id-1')).toBeTruthy()
  expect(fetchProducts).toHaveBeenCalledTimes(2)
  expect(fetchProducts).toHaveBeenCalledWith(2)
})
