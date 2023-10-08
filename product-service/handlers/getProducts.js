'use strict';

import { getMockData } from '../helpers.js'

export const getProducts = async () => {
  const data = await getMockData()
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
