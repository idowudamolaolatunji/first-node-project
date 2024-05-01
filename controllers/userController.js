const app = require('../app');
const User = require('../model/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Wallet = require('../model/walletModel');


exports.userSignup = async function(req, res) {
    try {

        const isExisting = await User.findOne({ email: req.body.email });
        if(isExisting) {
            return res.json({
                message: 'Email already exist!'
            })
        }

        const plainPassword = req.body.password;
        const salt = 12;
        const hashedPassword = bcrypt.hashSync(plainPassword, salt);

        const user = await User.create({
            email: req.body.email,
            fullName: req.body.fullName,
            image: req.body.image,
            role: req.body.role,
            password: hashedPassword
        });

        await Wallet.create({
            user: user._id
        })

        res.status(201).json({
            status: 'success',
            message: 'Signup successful!',
            data: {
                user
            }
        })

    } catch(err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }
}


exports.userLogin = async function(req, res) {
    try {

    // take the req body
    const email = req.body.email;
    const pasword = req.body.password;

    console.log('Hi 1')

    // find an account with the email
    const userAccount = await User.findOne({ email });
    if(!userAccount) {
        return res.json({ message: 'Account does not exist'})
    }
    console.log(userAccount)

    // check email and compare the password
    if(userAccount.email !== email || !(await bcrypt.compare(pasword, userAccount.password))) {
        return res.json({
            message: 'Email or password incorrect'
        })
    }

    console.log('Hi 2')

    // grant a token
    // payload(id), secretString, options Object
    const token = jwt.sign({ id: userAccount._id }, 'app__very__secret__and__ultra__long__string', {
        expiresIn: '30d'
    })

    console.log('Hi 3')

    res.status(200).json({
        status: 'success',
        message: 'User logged in successfully',
        data: {
            user: userAccount
        },
        token
    })


    } catch(err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }
}



exports.getUserWallet = async function(req, res) {
    try {

        const user = await User.findById(req.user._id);

        if(!user) {
            return res.json({
                message: 'User does not exist'
            })
        }

        const wallet = await Wallet.findOne({ user: user._id });

        res.status(200).json({
            status: 'success',
            data: {
                wallet
            }
        })

    } catch(err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }
}