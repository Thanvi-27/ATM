const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let balance = 1000.0;
let transactions = [];

function getFormattedDateTime() {
    const now = new Date();
    const date = now.toLocaleDateString('en-IN');
    const time = now.toLocaleTimeString('en-IN');
    return `${date} ${time}`;
}

function recordTransaction(type, amount, newBalance) {
    const transactionTime = getFormattedDateTime();
    transactions.push({
        type,
        amount,
        time: transactionTime,
        currentBalance: newBalance
    });
}

app.get('/api/balance', (req, res) => {
    res.json({ balance });
});

app.get('/api/transactions', (req, res) => {
    res.json({ transactions });
});

app.post('/api/deposit', (req, res) => {
    const amount = parseFloat(req.body.amount);

    if (isNaN(amount) || amount <= 0) {
        return res.status(400).json({ success: false, message: 'Please enter a valid amount' });
    }

    balance += amount;
    recordTransaction('Deposit', amount, balance);

    res.json({ success: true, message: 'Deposit successful', balance });
});

app.post('/api/withdraw', (req, res) => {
    const amount = parseFloat(req.body.amount);

    if (isNaN(amount) || amount <= 0) {
        return res.status(400).json({ success: false, message: 'Please enter a valid amount' });
    }

    if (amount > balance) {
        return res.status(400).json({ success: false, message: 'Insufficient balance' });
    }

    balance -= amount;
    recordTransaction('Withdrawal', amount, balance);

    res.json({ success: true, message: 'Withdrawal successful', balance });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`ATM API server running at http://localhost:${PORT}`);
});