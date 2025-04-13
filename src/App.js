import React, { useState } from 'react'
import axios from 'axios'

function App() {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const apiUrl = process.env.REACT_APP_API_URL // 

  const fetchTransactions = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await axios.post(`${apiUrl}/get-transactions`)
      setTransactions(res.data.transactions || [])
    } catch (err) {
      setError('Failed to fetch transactions.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>💰 Budget Tracker</h1>
      <button onClick={fetchTransactions} style={{ padding: '0.5rem 1rem' }}>
        Fetch Transactions
      </button>

      {loading && <p>Loading transactions...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul style={{ marginTop: '1rem' }}>
        {transactions.map((tx, i) => (
          <li key={i}>
            <strong>{tx.description}</strong> — ₱{tx.amount}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
