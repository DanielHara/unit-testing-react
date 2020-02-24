import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import nock from 'nock'
import ProductList from '../ProductList'
import Bluebird from 'bluebird'
import { act } from 'react-dom/test-utils'

it('should render a button to load products', async () => {
  const scope = nock('http://localhost')
    .get('/products')
    .query({ page: 1 })
    .reply(200, {
      products: [{
        id: 'dummy-id-1',
        name: 'dummy-product-1',
        price: '10 £'
      }]
    })
    .get('/products')
    .query({ page: 2 })
    .reply(200, {
      products: [{
        id: 'dummy-id-2',
        name: 'dummy-product-2',
        price: '20 £'
      }]
    })

  const { getByText } = render(<ProductList />)

  const loadMoreButton = getByText('Load more!')

  fireEvent.click(loadMoreButton)
  await act(() => Bluebird.delay(500))

  // expect one product
  expect(getByText('dummy-id-1')).toBeTruthy()

  fireEvent.click(loadMoreButton)
  await act(() => Bluebird.delay(500))

  // expect two products
  expect(getByText('dummy-id-1')).toBeTruthy()
  expect(getByText('dummy-id-2')).toBeTruthy()

  scope.done()
})
