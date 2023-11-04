import { catalogBatchProcess } from '../catalogBatchProcess.js'
import { dbConnector } from '../../db/DBConnector.js'
import { ProductValidator } from '../../validators/ProductValidator.js'

import { SNSClient } from '@aws-sdk/client-sns'

jest.mock('@aws-sdk/client-sns', () => {
  return {
    SNSClient: jest.fn().mockImplementation(() => ({
      send: jest.fn(),
    })),
  }
})

describe('catalogBatchProcess', () => {
  const snsClient = new SNSClient();
  const snsMock = snsClient.send;
  const createItemMock = jest.spyOn(dbConnector, 'createItem').mockImplementation(() => Promise.resolve())

  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('Should return nothing if there are no valid products', async () => {
    const event = {
      Records: [
        { body: JSON.stringify({}) },
        { body: JSON.stringify({}) },
      ],
    }

    await catalogBatchProcess(event)

    expect(createItemMock).toBeCalledTimes(0)
    expect(snsMock).toBeCalledTimes(0)
  })

  it('Should skip invalid products', async () => {
    const event = {
      Records: [
        { body: JSON.stringify({ price: 10, title: 'Valid Product' }) },
        { body: JSON.stringify({ title: 'Invalid Product' }) },
        { body: JSON.stringify({ price: 'Not a number' }) },
        { body: JSON.stringify({ price: 20, title: 'Valid Product 2' }) },
      ],
    }

    const expectedProductsLength = 2

    const isValidMock = jest.spyOn(ProductValidator, 'isValid')

    isValidMock.mockReturnValueOnce(true)
    isValidMock.mockReturnValueOnce(false)
    isValidMock.mockReturnValueOnce(false)
    isValidMock.mockReturnValueOnce(true)

    await catalogBatchProcess(event)

    expect(createItemMock).toBeCalledTimes(expectedProductsLength)
  })
})