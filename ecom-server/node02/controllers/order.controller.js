const Order = require('../models/order');
const Product = require('../models/product');
const OrderItem = require('./../models/order-item')

const mongoose = require('mongoose');

exports.index = async (req, res, next) => {

    try {
        
       const myOrders = await Order.find()
                                   .populate('user', 'name email')
                                   .populate({ path: 'orderItems', populate: {
                                    path: 'product', select: 'title description', populate: {
                                        path: 'category',
                                        select: 'label'
                                    }
                                   }})
       res.json({
        success: true,
        orders: myOrders
       })

    } catch (error) {
        res.status(500).json({ success: false });
    }

}

exports.store = async (req, res) => {
   
    let {  shippingAddress, invoiceAddress, city, country, phone, items } = req.body
    
    let total = 0
    
    const user = "645cd987ca22a402998a60a2"

    const orderItemsIds = await Promise.all(items.map(async item => {
        const {price} = await Product.findById(item.product, 'price')
        
        const newItem = {
            ...item,
            price
        }
        total += (item.quantity * price)
       const myOrderItem = await OrderItem.create(newItem)
       return myOrderItem._id
    }))
    const myOrder = new Order({shippingAddress, invoiceAddress, city, country, phone, orderItems: orderItemsIds, user, total})

    myOrder.save()
             .then(insertedOrder => {
                res.status(201).json({
                    order: insertedOrder,
                    success: true
                })
             })
             .catch(err => {
                res.status(500).json({
                    error: err,
                    success: false
                })
             })

}

exports.patchOrder = async (req, res, next) => {
    let {id} = req.params;
    if(!mongoose.isValidObjectId(id)){
        return res.status(404).json({
            success: false,
            message:'id is not valid'
        })
    }
    try {
        const orders = await Order.findOneAndReplace({'_id':id},req.body,{new:true});
        if(!orders){
            return res.status(404).json({success: false, message:"Order not found"})
        }
        res.json({ 
            orders,
            success: true,
         });
    } catch (error) {
        res.status(500).json({ success: false});
    }
};

exports.destroy = async (req, res, next) => {
    let {id} = req.params;
  
    if(!mongoose.isValidObjectId(id)){
      return res.status(400).json({
        success:false,
        message:`The order with id = ${id} has been deleted`
      })
    }
    try {
      const orders = await Order.findOneAndDelete({'_id':id},req.body);
      if(!Order){
        return res.status(404).json({
          success: false,
          message: `no order found with id = ${id}`,
        })
      }
      res.json({ orders, success:true });
  
    } catch(error){
      res.status(500).json({ success:false })
    }
  
  }
  