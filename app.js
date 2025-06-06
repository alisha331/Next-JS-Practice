const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


/* ====================================== Product CURD APIs ============================================== */
// products data
let products = [
    {
      id: 1,
      name: 'Men\'s Casual T-Shirt',
      price: 25,
      description: 'Comfortable cotton t-shirt available in multiple colors',
      category: 'Apparel',
      stock: 100,
      rating: 4.2
    },
    {
      id: 2,
      name: 'Women\'s Denim Jacket',
      price: 60,
      description: 'Classic denim jacket with button closure and pockets',
      category: 'Apparel',
      stock: 50,
      rating: 4.6
    },
    {
      id: 3,
      name: 'Unisex Hoodie',
      price: 40,
      description: 'Soft fleece hoodie with front pocket and adjustable hood',
      category: 'Apparel',
      stock: 75,
      rating: 4.5
    },
    {
      id: 4,
      name: 'Sports Running Shoes',
      price: 80,
      description: 'Lightweight and breathable running shoes for all terrains',
      category: 'Apparel',
      stock: 30,
      rating: 4.7
    },
    {
      id: 5,
      name: 'Women\'s Yoga Pants',
      price: 35,
      description: 'Stretchable and comfortable yoga pants for active wear',
      category: 'Apparel',
      stock: 60,
      rating: 4.4
    }
  ];  

// GET all products
app.get('/products', (req, res) => {
    res.json(products);
    res.render('product', { products });
});

// GET product by ID
app.get('/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).send('Product not found');

  res.json(product);
  //res.render('productDetail', { product });
});

app.get('/addProduct', (req, res) => {
    res.render('addProduct');
});  

// POST create new product
app.post('/products', (req, res) => {
  const { name, price, description, category, stock, rating } = req.body;
  const newProduct = {
    id: products.length + 1,
    name,
    price,
    description,
    category,
    stock,
    rating
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
  //res.status(201).render('product', { products });
});

// DELETE product by ID
app.delete('/products/:id', (req, res) => {
    const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
    if (productIndex === -1) return res.status(404).send('Product not found');
  
    products.splice(productIndex, 1);
    res.status(200).json({ message: 'Product deleted successfully' });
    //res.sendStatus(204);
    //res.status(204).render('product', { products });
});
  
// PUT update product by ID
app.put('/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).send('Product not found');

  const { name, price } = req.body;
  product.name = name || product.name;
  product.price = price || product.price;

  res.json(product);
});
/* ====================================== Product CURD APIs End ============================================== */

/* ====================================== Categories CURD APIs ============================================== */
let categories = [
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Apparel' },
    { id: 3, name: 'Books' }
  ];
  
  // GET all categories
  app.get('/categories', (req, res) => {
    res.json(categories);
  });
  
  // POST add a new category
  app.post('/categories', (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: 'Category name is required' });
  
    const newCategory = {
      id: categories.length + 1,
      name
    };
    categories.push(newCategory);
    res.status(201).json(newCategory);
  });
  
  // PUT update a category
  app.put('/categories/:id', (req, res) => {
    const category = categories.find(c => c.id === parseInt(req.params.id));
    if (!category) return res.status(404).json({ message: 'Category not found' });
  
    const { name } = req.body;
    if (name) category.name = name;
  
    res.json(category);
  });
  
  // DELETE a category
  app.delete('/categories/:id', (req, res) => {
    const index = categories.findIndex(c => c.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: 'Category not found' });
  
    categories.splice(index, 1);
    res.json({ message: 'Category deleted successfully' });
  });
/* ====================================== Categories CURD APIs End ============================================== */

let users = [
  { id: 1, email: "alisha@example.com", name: "Alisha" },
  { id: 2, email: "rohini@example.com", name: "Rohini" },
  { id: 3, email: "john.doe@example.com", name: "John Doe" }
];

// Register POST API
app.post('/register', (req, res) => {
  const { email, password } = req.body;
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: 'User already exists' });
  }

  users.push({ email, password });
  //carts[email] = [];
  res.status(201).json({ message: 'Registered successfully' });
});


// Login POST API
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  res.json({ message: 'Login successful' });
});


/* ====================================== Cart APIs ============================================== */
let carts = {
  "alisha@example.com": [1, 2] 
};

// Cart detail GET API
app.get('/cart', (req, res) => {
  const { email } = req.body;
  if (!email || !carts[email]) {
    return res.status(404).json({ message: 'Cart not found' });
  }

  const userCart = carts[email].map(id => products.find(p => p.id === id));
  res.json(userCart);
});


//Add product to cart (POST)
app.post('/cart', (req, res) => {
  const { email, productId } = req.body;
  if (!users.find(u => u.email === email)) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (!products.find(p => p.id === productId)) {
    return res.status(404).json({ message: 'Product not found' });
  }

  carts[email].push(productId);
  res.status(200).json({ message: 'Product added to cart' });
});

/* ====================================== Cart APIs End ============================================== */
  

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
