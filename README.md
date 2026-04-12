# ATM System Application

A modern web-based ATM system built with Node.js Express backend and responsive HTML/CSS/JavaScript frontend.

## Features

- 💳 **Deposit Money** - Add funds to your account
- 💰 **Withdraw Money** - Withdraw funds (with balance validation)
- 📋 **Transaction History** - View all transactions with timestamps
- 📱 **Responsive Design** - Works on desktop and mobile devices
- 🎨 **Modern UI** - Beautiful gradient design with smooth animations

## Project Structure

```
ATM/
├── app.js                 # Express server with API endpoints
├── package.json          # Node.js dependencies
├── public/
│   ├── index.html       # Frontend UI
│   ├── style.css        # Styling
│   └── script.js        # Frontend logic
└── README.md            # This file
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Setup

1. **Navigate to project directory**
   ```bash
   cd ATM
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```

4. **Open in browser**
   ```
   http://localhost:5000
   ```

## Development

To run in development mode with auto-reload:

```bash
npm run dev
```

## API Endpoints

### Get Current Balance
```
GET /api/balance
Response: { balance: 1000.00 }
```

### Get All Transactions
```
GET /api/transactions
Response: { transactions: [...] }
```

### Deposit Money
```
POST /api/deposit
Body: { amount: 500 }
Response: { success: true, message: "...", balance: 1500.00 }
```

### Withdraw Money
```
POST /api/withdraw
Body: { amount: 200 }
Response: { success: true, message: "...", balance: 1300.00 }
```

## Technologies Used

- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Styling**: CSS3 Flexbox, Grid, Gradients

## Features Breakdown

### Deposit Flow
- User enters amount
- Validation checks (positive number)
- Updates balance
- Records transaction with timestamp

### Withdraw Flow
- User enters amount
- Validation checks (positive number, sufficient balance)
- Updates balance
- Records transaction with timestamp

### Transaction History
- Displays all transactions in reverse chronological order
- Shows transaction type, amount, and timestamp
- Updates balance after each transaction

## Error Handling

The application validates:
- ✅ Positive amounts only
- ✅ Sufficient balance for withdrawals
- ✅ Valid number inputs
- ✅ Empty/null values

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

### Port already in use
```bash
# Change the port in app.js or use environment variable
PORT=3000 npm start
```

### API connection errors
- Ensure the server is running on the correct port
- Check browser console for error messages
- Verify CORS is enabled

## Future Enhancements

- User authentication
- Database integration
- PIN security
- Account types
- Interest calculations
- Multi-user support
- Admin dashboard

## License

ISC
