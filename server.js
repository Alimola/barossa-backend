const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🚀 Barossa Connect Backend is running!',
    timestamp: new Date().toISOString()
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: '✅ Server is healthy!',
    timestamp: new Date().toISOString()
  });
});

// Simple fare calculation
app.post('/api/delivery/calculate-fare', (req, res) => {
  try {
    const baseRate = 12.99;
    const totalFare = baseRate;
    
    res.json({
      success: true,
      fare: {
        baseRate: baseRate,
        additionalFare: 0,
        surgeFee: 0,
        totalFare: totalFare
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Calculation failed'
    });
  }
});

// Create order
app.post('/api/orders', (req, res) => {
  try {
    const orderNumber = `BC-${Date.now()}`;
    
    res.json({
      success: true,
      message: 'Order created!',
      order: {
        orderNumber: orderNumber,
        status: 'pending'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Order failed'
    });
  }
});

// Get orders
app.get('/api/orders', (req, res) => {
  res.json({
    success: true,
    orders: []
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on port ${PORT}`);
});
