import React, { createContext, useReducer } from 'react'
import AppReducer from './AppReducer'
import axios from 'axios'
// initial state
const initialState = {
  transactions: [],
  error: null,
  loading: true,
}

// Global Context
export const GlobalContext = createContext(initialState);

// Provider Component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  // Actions
  const getTransactions = async () => {
    try {
      const res = await axios.get('/api/v1/transactions')
      dispatch({
        type: "GET_TRANSACTIONS",
        payload: res.data.data
      })
    } catch (err) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: err.response.data.error
      })
    }
  }

  const deleteTransaction = async (_id) => {
    try {
      await axios.delete(`/api/v1/transactions/${_id}`)
      dispatch({
        type: "DELETE_TRANSACTION",
        payload: _id
      })
    } catch (err) {
      dispatch({
        type: "DELETE_TRANSACTION",
        payload: err.response.error
      })
    }
  }

  const  addTransaction = async (transaction) => {
    try {
      const res = await axios.post('/api/v1/transactions', transaction, config)
      dispatch({
        type: "ADD_TRANSACTION",
        payload: res.data.data
      })
    } catch (err) {
      dispatch({
        type: "ADD_TRANSACTION",
        payload: err.response.error
      })
    }
  }

  return(
    <GlobalContext.Provider value={{
      transactions: state.transactions,
      error: state.error,
      loading: state.loading,
      deleteTransaction,
      addTransaction,
      getTransactions
    }}>
      {children}
    </GlobalContext.Provider>
  )
}