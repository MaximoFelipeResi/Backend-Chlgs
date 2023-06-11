const fs = require('fs');

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  addProduct(product) {
    const products = this.getProductsFromStorage();
    product.id = this.generateProductId();
    products.push(product);
    this.saveProductsToStorage(products);
    return product.id;
  }

  getProducts() {
    return this.getProductsFromStorage();
  }

  getProductById(id) {
    const products = this.getProductsFromStorage();
    return products.find(product => product.id === id);
  }

  updateProduct(id, updatedFields) {
    const products = this.getProductsFromStorage();
    const productIndex = products.findIndex(product => product.id === id);
    if (productIndex !== -1) {
      const updatedProduct = { ...products[productIndex], ...updatedFields };
      products[productIndex] = updatedProduct;
      this.saveProductsToStorage(products);
      return true;
    }
    return false;
  }

  deleteProduct(id) {
    const products = this.getProductsFromStorage();
    const productIndex = products.findIndex(product => product.id === id);
    if (productIndex !== -1) {
      products.splice(productIndex, 1);
      this.saveProductsToStorage(products);
      return true;
    }
    return false;
  }

  generateProductId() {
    const products = this.getProductsFromStorage();
    const lastProduct = products[products.length - 1];
    return lastProduct ? lastProduct.id + 1 : 1;
  }

  getProductsFromStorage() {
    if (!fs.existsSync(this.path)) {
      return [];
    }

    const fileContents = fs.readFileSync(this.path, 'utf-8');
    return JSON.parse(fileContents);
  }

  saveProductsToStorage(products) {
    fs.writeFileSync(this.path, JSON.stringify(products, null, 2));
  }
}

const productManager = new ProductManager('products.json');

const product1 = {
  title: 'Product 1',
  description: 'Description of Product 1',
  price: 9.99,
  thumbnail: 'path/to/product1.jpg',
  code: 'P1',
  stock: 10
};

const product2 = {
  title: 'Product 2',
  description: 'Description of Product 2',
  price: 19.99,
  thumbnail: 'path/to/product2.jpg',
  code: 'P2',
  stock: 5
};

const productId1 = productManager.addProduct(product1);
console.log('Added product with ID:', productId1);

const productId2 = productManager.addProduct(product2);
console.log('Added product with ID:', productId2);

const allProducts = productManager.getProducts();
console.log('All products:', allProducts);

const foundProduct = productManager.getProductById(productId1);
console.log('Found product:', foundProduct);

const updatedFields = {
  title: 'Updated Product',
  price: 29.99
};

const isUpdated = productManager.updateProduct(productId1, updatedFields);
console.log('Is product updated?', isUpdated);

const isDeleted = productManager.deleteProduct(productId2);
console.log('Is product deleted?', isDeleted);

const remainingProducts = productManager.getProducts();
console.log('Remaining products:', remainingProducts);
