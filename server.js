const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: '🚀 Barossa Connect Backend is running!',
    timestamp: new Date().toISOString()
  });
});

// Calculate delivery fare
app.post('/api/delivery/calculate-fare', async (req, res) => {
  try {
    const { pickupAddress, deliveryAddress, deliveryDate } = req.body;
    
    // Simple fare calculation
    const BASE_RATE = 12.99;
    const SURGE_FEE = 10.00;
    
    // Check surge pricing
    const now = new Date();
    const isSameDay = deliveryDate === now.toISOString().split('T')[0];
    const currentHour = now.getHours();
    const isAfterCutoff = currentHour > 13;
    const surgeFee = (isSameDay && isAfterCutoff) ? SURGE_FEE : 0;
    const totalFare = BASE_RATE + surgeFee;
    
    res.json({
      success: true,
      fare: {
        baseRate: BASE_RATE,
        additionalFare: 0,
        surgeFee: surgeFee,
        totalFare: totalFare,
        distance: 8.5
      },
      distance: 8.5
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to calculate fare'
    });
  }
});

// Create order
app.post('/api/orders', async (req, res) => {
  try {
    const orderData = req.body;
    const orderNumber = `BC-${Date.now()}`;
    const referenceNumber = `BC-REF-${Date.now()}`;
    
    const orderResponse = {
      id: 'order-' + Date.now(),
      orderNumber: orderNumber,
      referenceNumber: referenceNumber,
      ...orderData,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    res.json({
      success: true,
      message: 'Order created successfully!',
      order: orderResponse
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create order'
    });
  }
});

// Get orders
app.get('/api/orders', async (req, res) => {
  try {
    res.json({
      success: true,
      orders: []
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders'
    });
  }
});

// Address autocomplete
app.get('/api/delivery/autocomplete', async (req, res) => {
  try {
    const { query } = req.query;
    
    const mockResults = [
      {
        formatted: `${query}, Barossa Valley SA, Australia`,
        address: query,
        city: 'Barossa Valley',
        state: 'SA'
      }
    ];
    
    res.json({
      success: true,
      results: mockResults
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Autocomplete failed'
    });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Barossa Connect Backend running on port ${PORT}`);
});