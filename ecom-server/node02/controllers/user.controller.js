const User = require('./../models/user');
const Order = require('./../models/order');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');

exports.index = async(req, res) =>{
    try{
      const result = await User.find()
      res.json({
        success:true,
        users:result
      })
    } catch(err){
      res.status(500).json({
        success:false,
        message: err
      })
    }
  };

exports.register = async(req,res)=>{
  let {name,
    email,
    password,
    address,
    city,
    country,
    phone,
    isAdmin } = req.body;

    const user = new User({
      name,email,password : bycrypt.hashSync(password, 10),address,city,country,phone,isAdmin
    })

  try{
    const result = await user.save()
    res.status(201).json({
      success:true,
      user :result
    })

  } catch(err){
    res.status(500).json({
      success:false,
      message: err
    })

  } 
}

exports.login = async(req,res) =>{
  const { email, password} = req.body
  const user = await User.findOne({ email: email},'name email password isAdmin')

  if(!user){
    return res.status(404).json({
      success:false,
      message:'email or password is wrong!'
    })
  }

  if(user && bycrypt.compareSync(password, user.password)){
    const secret = process.env.SECRET_KEY
    const token = jwt.sign({
        userId: user._id,
        username: user.name,
        isAdmin : user.isAdmin
      },
      secret,
      {expiresIn:'1h' }
    )
    return res.status(200).json({
      success:true,
      message:"User is autentified",
      user : user.name,
      token
    })
  }

  res.status(400).json({
    success: false,
    message:'email or password is wrong!'
  })
}

exports.getOrders = async(req, res, next) => {
  // console.log("Before debugger");
  // debugger;
  let {id} = req.params

  try{
      const orders= await Order.find({user : id},'-user')
                               .populate('user', 'name')
                               .populate({ path: 'orderItems', populate: {
                                path: 'product', select: 'title description', populate: {
                                    path: 'category',
                                    select: 'label'
                                }
                               }})

      // let total = 0
      // orders.forEach(order =>{
      //   total += order.total
      // })
      
      const total = orders.reduce((cumul,order) => cumul + order.total, 0)
      res.json( { 
          success: true,
          orders:orders,
          total:total
       });
      
      
  }
  catch(err){
      return res.status(500).json({
          success: false,
          error:err
      })
  }

  // console.log("After debugger");
  
  next();
  
};

