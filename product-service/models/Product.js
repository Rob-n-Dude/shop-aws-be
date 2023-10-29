const PRODUCT_FIELD = {
    TITLE: 'title',
    DESCRIPTION: 'description',
    PRICE: 'price',
}

const PRODUCT_TYPE_FIELD = {
    [PRODUCT_FIELD.TITLE]: 'string',
    [PRODUCT_FIELD.DESCRIPTION]: 'string',
    [PRODUCT_FIELD.PRICE]: 'number',
}

class Product {
    constructor(productData) {
        productData.id && (this.id = productData.id)
        this.title = productData.title
        this.description = productData.description
        this.price = Number(productData.price)
    }

    static isValid (product) {
        console.log('validating Product data:', product)
        return (
            ( 
                PRODUCT_FIELD.DESCRIPTION in product &&
                PRODUCT_FIELD.PRICE in product &&
                PRODUCT_FIELD.TITLE in product
            ) && (
                typeof product[PRODUCT_FIELD.DESCRIPTION] === PRODUCT_TYPE_FIELD[PRODUCT_FIELD.DESCRIPTION] &&
                typeof product[PRODUCT_FIELD.TITLE] === PRODUCT_TYPE_FIELD[PRODUCT_FIELD.TITLE] &&
                typeof product[PRODUCT_FIELD.PRICE] === PRODUCT_TYPE_FIELD[PRODUCT_FIELD.PRICE]
            )
        )
    }
}

const data = {
    id: '697f178a-69a8-4e08-86b1-ec7247d53d3b',
    title: 'custom modified',
    description: '111',
    price: 90
  }

  const productData = new Product(data)

  console.log(Product.isValid(productData))

export {
    Product
}