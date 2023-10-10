'use strict';

import { applyHeaders } from '../helpers/applyHeaders.js';
import { getMockData } from '../helpers/getMockData.js'

export const getProducts = async () => {
  const data = await getMockData()

  return applyHeaders({
    statusCode: 200,
    body: JSON.stringify(data),
  })
};
