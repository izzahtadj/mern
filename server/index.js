const express = require('express')
const app = express()
const cors = require('cors')
const User = require('./models/user.model')
const Product = require('./models/product.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const dbconnection = require ('./db')
const nodemailer = require('nodemailer')
const { getDefaultSettings } = require('http2')

//database connection
dbconnection()

//middlewares
app.use(cors())
app.use(express.json())

//register new user
app.post('/api/register', async (req, res) => {
    console.log(req.body)
    try {
        const newPassword = await bcrypt.hash(req.body.password, 10)
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: newPassword,
            role: req.body.role,
            userstatus: req.body.userstatus,
        })
        res.json({ status: 'ok' })
    } catch (err){
        console.log(err)
        res.json({ status: 'error', error: 'Duplicate email' })
    }
})

app.post('/api/updateuser', async (req, res) => {
    const user = await User.findOne({ 
        email: req.body.email,
    })

    if(!user) { 
        return { status: 'error', error: 'No user with that email' } 
    }

    try {
        await User.updateOne({
            name: req.body.name,
            email: req.body.email,
            role: req.body.role,
            userstatus: req.body.userstatus,
        })
        res.json({ status: 'Data Changed' })
    } catch (err){
        console.log(err)
        res.json({ status: 'error', error: 'Could not update' })
    }


})

app.post('/api/addproduct', async (req, res) => {
    console.log(req.body)
    try {
        await Product.create({
            productname: req.body.productname,
            productcat: req.body.productcat,
            productsubcat: req.body.productsubcat,
            productprice: req.body.productprice,
            productqty: req.body.productqty,
            productdesc: req.body.productdesc,
        })
        res.json({ status: 'ok' })
    } catch (err){
        console.log(err)
        res.json({ status: 'error', error: err })
    }
})

app.post('/api/login', async (req, res) => {
        const user = await User.findOne({ 
            email: req.body.email,
        })

        if(!user) { 
            return { status: 'error', error: 'Invalid login' } 
        }

        const isPasswordValid = await bcrypt.compare(
            req.body.password, 
            user.password
        )

        if(isPasswordValid) {
            const token = jwt.sign(
                {
                    name: user.name,
                    email: user.email,
                    userstatus: user.userstatus,
                },
                'secret123'
            )
            return res.json({ status: 'ok', user: token })
        } else {
            return res.json({ status: 'error', user: false })
        }
})

app.get('/api/quote', async (req, res) => {

    const token = req.headers['x-access-token']

    try {
    const decoded = jwt.verify(token, 'secret123')
    const email = decoded.email
    const user = await User.findOne({ email:email })
    return res.json ({ status: 'ok', quote: user.quote })
    } catch(error) {
        console.log(error)
        res.json({ status: 'error', error: 'Invalid token' })
    }
})

app.post('/api/quote', async (req, res) => {

    const token = req.headers['x-access-token']

    try {
    const decoded = jwt.verify(token, 'secret123')
    const email = decoded.email
    await User.updateOne(
        { email:email },
        { $set: { quote: req.body.quote } 
    })

    return res.json({ status: 'ok' })
    } catch(error) {
        console.log(error)
        res.json({ status: 'error', error: 'Invalid token' })
    }
})

app.listen(1337, () => {
    console.log('Server started on 1337')
})

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
})

app.get('/api/get-user', async (req,res) => {
    const allUser = await User.find({})
    try{
        res.status(200).json({
            status : 'Success',
            data : {
                allUser
            }
        })
    }catch(err){
        res.status(500).json({
            status: 'Failed',
            message : err
        })
    }
})

app.get('/api/get-product', async (req,res) => {
    const allProduct = await Product.find({})
    try{
        res.status(200).json({
            status : 'Success',
            data : {
                allProduct
            }
        })
    }catch(err){
        res.status(500).json({
            status: 'Failed',
            message : err
        })
    }
})

//forgotpass n sendemel
app.post('/api/forgotpassword', async (req, res) => {
    console.log(req.body)
    const { name, email, message } = req.body;

    //checking if email exist in the database
    const user = await User.findOne({ 
        email: req.body.email,
    })

        //  things to do if the user does not exist
        if (!user){
            return res
                .status(404)
                .json({ message: "Email does not exist.", status: "error" });
        } 

            //   generate a random token for the client
            //   converting the token to a hexstring
            const generatedToken = crypto.randomBytes(32).toString('hex');
            //  set the token and expiring period for the token to the client schema
            //  user.password = req.body.password;
            console.log(generatedToken);

            await User.updateOne(
                { email: req.body.email },
                { $set: 
                { 
                    updatedAt: Date.now(),
                    resetToken: generatedToken,
                    expireToken: Date.now() + 1800000
                } 
            })

            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                requireTLS: true,
                auth: {
                  user: "dummyMongo98@gmail.com", // MAKE SURE THIS EMAIL IS YOUR GMAIL FOR WHICH YOU GENERATED APP PASSWORD
                  pass: "xtohkcyrwddqgxpg", // MAKE SURE THIS PASSWORD IS YOUR GMAIL APP PASSWORD WHICH YOU GENERATED EARLIER
                },
                tls: {
                  ciphers: "SSLv3",
                },
              });

              const emailData = {
                from: "noreply@gmail.com", // MAKE SURE THIS EMAIL IS YOUR GMAIL FOR WHICH YOU GENERATED APP PASSWORD
                to: req.body.email, // WHO SHOULD BE RECEIVING THIS EMAIL? IT SHOULD BE YOUR GMAIL
                subject: "Website Contact Form",
                text: `Email received from contact from \n Sender name: '${name}' \n Sender email: ${email} \n Sender message: ${message}`,
                html: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                'http://' + 'localhost:3000' + '/resetpassword/' + generatedToken + '\n\n' +
                '\nIf you did not request this, please ignore this email and your password will remain unchanged.\n',
              };

              console.log('sending mail');

              transporter.sendMail(emailData)
                .then((info) => {
                console.log(`Message sent: ${info.response}`);
                return res.json({
                success: true,
                });
            })
                .catch((err) => console.log(`Problem sending email: ${err}`));
})

app.get('/api/resetpassword/:resetToken', async (req, res) => {
    const user = await User.findOne({
        resetToken: req.params.token,
        expireToken: { $gt: Date.now() },
    })
})

app.post('/api/changepassword:resetToken', async (req, res) => {

    const token = req.headers['x-access-token']

    try {
    const decoded = jwt.verify(token, 'secret123')
    const email = decoded.email
    await User.updateOne(
        { email:email },
        { $set: { quote: req.body.quote } 
    })

    return res.json({ status: 'ok' })
    } catch(error) {
        console.log(error)
        res.json({ status: 'error', error: 'Invalid token' })
    }
})


//delete user
app.get('/api/deleteUser/:id', async (req, res) => {
    const id = req.params.id
    await User.findByIdAndRemove(id).exec()
    res.send('Deleted')
})

//update user
app.patch('/api/updateUser/:id', async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
        runValidators: true
    })
    try{
        res.status(200).json({
            status: 'Success',
            data: {
                user
            }
        })
    } catch (err){
        console.log(err)
    }
})

//delete product
app.get('/api/deleteProduct/:id', async (req, res) => {
    const id = req.params.id
    await User.findByIdAndRemove(id).exec()
    res.send('Deleted')
})

