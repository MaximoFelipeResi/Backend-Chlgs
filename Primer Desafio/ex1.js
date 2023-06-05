class ProductManager {
    constructor() {
      this.products = [];
      this.nextId = 1;
    }
  
    addProduct(title, description, price, thumbnail, code, stock) {

      if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.log('Error: Todos los campos son obligatorios');
        return;
      }
  
      const existingProduct = this.products.find(product => product.code === code);
      if (existingProduct) {
        console.log(`Error: Ya existe un producto con el código ${code}`);
        return;
      }
  
      const newProduct = {
        id: this.nextId,
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        code: code,
        stock: stock
      };
  
      this.products.push(newProduct);
      this.nextId++;
    }
  
    getProducts() {
      return this.products;
    }
  
    getProductById(id) {
      const product = this.products.find(product => product.id === id);
  
      if (product) {
        return product;
      } else {
        console.log('Error: Product not found');
      }
    }
  }
  
  const manager = new ProductManager();
  
  manager.addProduct('Camiseta', 'Camiseta de algodón', 19.99, 'camiseta.jpg', '001', 10);
  manager.addProduct('Pantalón', 'Pantalón vaquero', 29.99, 'pantalon.jpg', '002', 5);
  
  console.log(manager.getProducts());
  
  console.log(manager.getProductById(1));
  
  console.log(manager.getProductById(3));
  
  