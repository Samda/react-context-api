const Transaction = require('../models/Transaction')

// @desc Get all Transactoins
// @route GET /api/v1/transactions
// @access Public
exports.getTransactions = async (req, res, next) => {
  try{
    const transcations = await Transaction.find()

    return res.status(200).jsonp({
      success: true,
      count: transcations.length,
      data: transcations
    })
  }catch(err){
    return res.status(500).jsonp({
      success: false,
      error: 'Server Error'
    })
  }
}

// @desc Add Transactoins
// @route POST /api/v1/transactions
// @access Public
exports.addTransaction = async (req, res, next) => {
  try{
    const { text, amount } = req.body;

    const transaction = await Transaction.create(req.body);

    return res.status(201).jsonp({
      success: true,
      data: transaction
    })
  }catch(err){
    if(err.name === "ValidationError") {
      const messages = Object.values(err.errors).map(val => val.message);

      return res.status(400).jsonp({
        success: false,
        error: messages
      });
    }else{
      return res.status(500).jsonp({
        success: false,
        error: 'Server Error'
      })
    }
  }
}

// @desc Get all Transactoins
// @route DELETE /api/v1/transactions
// @access Public
exports.deleteTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction){
      return res.status(400).jsonp({
        success: false,
        error: "No transaction found"
      })
    }
    await transaction.remove();

    return res.status(200).jsonp({
      success: true,
      data: {}
    })

  } catch (err) {
    return res.status(500).jsonp({
      success: false,
      error: 'Server Error'
    })
  }
}
