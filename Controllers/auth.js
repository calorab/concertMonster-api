const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../Models/user');

exports.signup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log('received body', req.body);
    User.findOne({email: email})
    .then(user => {
        if (user.email) 
        {
            throw new Error('Email already Exists!');
        }
    })
    .catch(err => {
        console.log(err);
        return err;
    });

    bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
            const user = new User({
                email: email,
                password: hashedPassword
            });
            return user.save();
    })
    .then(result => {
        data = result;
        return data;
    })
    .then(data => {
        console.log('RIGHT BEFORE TOKEN ', req.body, 'DATA: ', data);
        const token = jwt.sign(
            {
                email: data.email,
                userId: data._id
            },
            'concertmonsterthinkfulsecret'
        );
        console.log('THE TOKEN ', token);
        res.status(200).json({response: data, token: token, userId: data._id.toString()});
    })    
    .catch(err => {
        console.log(err);
        next(err);
    });
};

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    User
    .findOne({email: email})
    .then(user => {
        console.log('USER FOUND??? ', user)
        if (!user) {
            throw new Error('No user with that email found!');
        } 
        loadedUser = user;
        return bcrypt.compare(password, user.password); 
    })
    .then(isEqual => {
        if (!isEqual) {
            res.status(403).json({message: 'Password is incorrect!'});
        }
        const token = jwt.sign(
            {
              email: loadedUser.email,
              userId: loadedUser._id.toString()
            },
            'concertmonsterthinkfulsecret'
        );
        res.status(200).json({token: token, userId: loadedUser._id.toString()});
    })
    .catch(err => {
        console.log('the error: ', err);
        next(err);
    });
};