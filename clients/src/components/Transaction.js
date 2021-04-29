import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'
import { numberWithCommas } from '../utils/format'

export const Transaction = ({transaction}) => {

  const { deleteTransaction } = useContext(GlobalContext)
  const { text, amount, _id } = transaction
  const money = amount < 0 ? `- $ ${Math.abs(amount)}` : `+ $ ${amount}`

  return (
    <li className={amount < 0 ? 'minus' : 'plus'}>
      {text} <span>{numberWithCommas(money)}</span>
        <button
        onClick={() => {deleteTransaction(_id)}}
           className="delete-btn">x</button>
    </li>
  )
}

export default Transaction