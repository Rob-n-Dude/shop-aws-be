'use strict';

import { dbConnector } from '../db/DBConnector.js';
import { applyHeaders } from '../helpers/applyHeaders.js';

export const getProducts = async () => {
  console.log('Receive get all products request')

  const data = await dbConnector.getAll()

  return applyHeaders({
    statusCode: 200,
    body: JSON.stringify(data),
  })
};
