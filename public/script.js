const API_BASE_URL = (window.location.protocol === 'http:' || window.location.protocol === 'https:')
    ? `${window.location.origin}/api`
    : 'http://localhost:5000/api';

// Load balance from API
async function loadBalance() {
    try {
        const response = await fetch(`${API_BASE_URL}/balance`);
        const data = await response.json();
        document.getElementById('balanceAmount').textContent = data.balance.toFixed(2);
        return data;
    } catch (error) {
        console.error('Error loading balance:', error);
        return null;
    }
}

function hideBalanceSection() {
    document.getElementById('balanceSection').classList.add('hidden');
}

// Show deposit form
function showDepositForm() {
    hideBalanceSection();
    document.getElementById('depositForm').classList.remove('hidden');
    document.getElementById('withdrawForm').classList.add('hidden');
    document.getElementById('historySection').classList.add('hidden');
    document.getElementById('alertBox').classList.add('hidden');
}

// Show withdraw form
function showWithdrawForm() {
    hideBalanceSection();
    document.getElementById('withdrawForm').classList.remove('hidden');
    document.getElementById('depositForm').classList.add('hidden');
    document.getElementById('historySection').classList.add('hidden');
    document.getElementById('alertBox').classList.add('hidden');
}

// Hide form
function hideForm() {
    document.getElementById('depositForm').classList.add('hidden');
    document.getElementById('withdrawForm').classList.add('hidden');
    document.getElementById('alertBox').classList.add('hidden');
}

// Show balance on demand
async function showBalance() {
    const data = await loadBalance();

    if (data) {
        const balanceSection = document.getElementById('balanceSection');
        balanceSection.classList.remove('hidden');
        showAlert('Current balance updated', 'success');
    }

    document.getElementById('depositForm').classList.add('hidden');
    document.getElementById('withdrawForm').classList.add('hidden');
    document.getElementById('historySection').classList.add('hidden');
}

// Show transactions
async function showTransactions() {
    hideBalanceSection();
    try {
        const response = await fetch(`${API_BASE_URL}/transactions`);
        const data = await response.json();

        const transactionList = document.getElementById('transactionList');

        if (data.transactions.length === 0) {
            transactionList.innerHTML = '<p class="empty-message">No transactions yet.</p>';
        } else {
            transactionList.innerHTML = data.transactions
                .reverse()
                .map(transaction => `
                    <div class="transaction-item">
                        <div class="transaction-type">${transaction.type}</div>
                        <div class="transaction-details">${transaction.time}</div>
                        <div class="transaction-amount">
                            Amount: Rs${transaction.amount.toFixed(2)} | Balance: Rs${transaction.currentBalance.toFixed(2)}
                        </div>
                    </div>
                `)
                .join('');
        }

        document.getElementById('historySection').classList.remove('hidden');
        document.getElementById('depositForm').classList.add('hidden');
        document.getElementById('withdrawForm').classList.add('hidden');
        document.getElementById('alertBox').classList.add('hidden');
    } catch (error) {
        showAlert('Error loading transactions', 'error');
        console.error('Error:', error);
    }
}

// Hide history
function hideHistory() {
    document.getElementById('historySection').classList.add('hidden');
    document.getElementById('alertBox').classList.add('hidden');
}

// Process deposit
async function processDeposit() {
    const amount = document.getElementById('depositAmount').value;

    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
        showAlert('Please enter a valid amount', 'error');
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/deposit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: parseFloat(amount) })
        });

        const data = await response.json();

        if (!response.ok) {
            showAlert(data.message || 'Deposit failed', 'error');
            return;
        }

        showAlert(data.message, 'success');
        document.getElementById('depositAmount').value = '';
        setTimeout(() => hideForm(), 2000);
    } catch (error) {
        showAlert('Error processing deposit', 'error');
        console.error('Error:', error);
    }
}

// Process withdraw
async function processWithdraw() {
    const amount = document.getElementById('withdrawAmount').value;

    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
        showAlert('Please enter a valid amount', 'error');
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/withdraw`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: parseFloat(amount) })
        });

        const data = await response.json();

        if (!response.ok) {
            showAlert(data.message || 'Withdrawal failed', 'error');
            return;
        }

        showAlert(data.message, 'success');
        document.getElementById('withdrawAmount').value = '';
        setTimeout(() => hideForm(), 2000);
    } catch (error) {
        showAlert('Error processing withdrawal', 'error');
        console.error('Error:', error);
    }
}

// Show alert
function showAlert(message, type) {
    const alertBox = document.getElementById('alertBox');
    alertBox.textContent = message;
    alertBox.className = `alert-box alert-${type}`;
    alertBox.classList.remove('hidden');

    if (type === 'success') {
        setTimeout(() => {
            alertBox.classList.add('hidden');
        }, 3000);
    }
}
