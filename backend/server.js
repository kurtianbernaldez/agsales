const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Route imports
const inventoryRoutes = require('./routes/inventoryRoutes');
const itemTypeRoutes = require('./routes/itemTypeRoutes');
const itemVariantRoutes = require('./routes/itemVariantRoutes');
// const customerRoutes = require('./routes/customerRoutes');
// const expenseRoutes = require('./routes/expenseRoutes');
// Add more as needed...

// Use routes
app.use('/api/inventory', inventoryRoutes);
app.use('/api/itemType', itemTypeRoutes);
app.use('/api/itemVariant', itemVariantRoutes);
// app.use('/api/customers', customerRoutes);
// app.use('/api/expenses', expenseRoutes);
// etc...

// Root endpoint (optional)
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
