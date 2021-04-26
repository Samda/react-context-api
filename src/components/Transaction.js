import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'

export const Transaction = ({transaction}) => {

  const { deleteTransaction } = useContext(GlobalContext)
  const { text, amount, id } = transaction
  const money = amount < 0 ? `- $ ${Math.abs(amount)}` : `+ $ ${amount}`

  return (
    <li className={amount < 0 ? 'minus' : 'plus'}>
      {text} <span>{money}</span>
        <button
        onClick={() => {deleteTransaction(id)}}
           className="delete-btn">x</button>
    </li>
  )
}

export default Transaction