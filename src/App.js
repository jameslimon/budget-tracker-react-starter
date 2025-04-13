import { useState } from 'react'
import axios from 'axios'

function App() {
  const [transactions, setTransactions] = useState([])

  const fetchTransactions = async () => {
    const res = await axios.post('https://replit.com/@jameslimon1/budget-tracker-backend')
    setTransactions(res.data.transactions)
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Budget Tracker</h1>
      <button onClick={fetchTransactions}>Fetch Transactions</button>
      <ul>
        {transactions.map((tx, i) => (
          <li key={i}>
            {tx.description} — ₱{tx.amount}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
