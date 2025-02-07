var user = require('../model/usermodel');
var product = require('../model/productmodel');
var jwt = require('jsonwebtoken');

var nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    tls: {
      rejectUnauthorized: false // ...you MUST disable certificate validation here!
    },
    auth: {
      user: 'languagepdf@gmail.com',
      pass: 'uutd sbps rgfw isyw'
    }
  });


exports.insert = async (req,res) => {
    try {

        let OTP = Math.floor((Math.random()*1000000)+1);;

        var mailOptions = {
            from: 'languagepdf@gmail.com',
            to: req.body.email,
            subject: 'Sending Email using Node.js',
            text: 'Your OTP is '+OTP
          };
          
          transporter.sendMail(mailOptions, async function(error, info){
            if (error) {
              console.log(error);
            } else {
                var data = await user.create(req.body);
                    res.status(200).json({
                        status:"success",
                        data
                    })
            }
          });


       
    } catch (error) {
        res.status(200).json({
            status:"error",
            error:error.errmsg
        })
    }
    
}

exports.get_data = async (req,res) => {
    var data = await user.find();
    res.status(200).json({
        status:"success",
        data
    })
}

exports.update_data = async (req,res) => {
    var id = req.params.id;
    var data = await user.findByIdAndUpdate(id,req.body);
    res.status(200).json({
        status:"success"
    })
}

exports.delete_data = async (req,res) => {
    var id = req.params.id;
    var data = await user.findByIdAndDelete(id);
    res.status(200).json({
        status:"success"
    })
}

exports.login = async (req,res) => {

    var data = await user.find({email:req.body.email});

    if(data.length==1){

        bcrypt.compare(req.body.password,data[0].password, async function(err, result) {
            if(result == true){
                var token = await jwt.sign({ id:data[0].id }, 'cdmi');
                res.status(200).json({
                    status:"Login Success",
                    token
                })
            }
            else
            {
                res.status(200).json({
                    status:"check your email and password"
                })
            }
        });
    }
    else
    {
        res.status(200).json({
            status:"check your email and password1"
        })
    }
}

exports.insert_p = async (req,res) => {
    var data = await product.create(req.body);
    res.status(200).json({
        status:"success",
        data
    })
}

exports.select_p = async (req,res) => {
    var data = await product.find().populate("user_id");
    res.status(200).json({
        status:"success",
        data
    })
}