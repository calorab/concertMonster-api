const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../Models/user');

exports.signup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log('received body', req.body);
    
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
        console.log('SIGNUP: ', result);
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
            'concertmonsterthinkfulsecret',
            { expiresIn: '1h' }
        );
        console.log(token);
        res.status(200).json({response: data, message: 'NOICE!!', token: token, userId: data._id.toString(), expiresIn: 3600});
    })    
    .catch(err => {
        console.log(err);
    });
};

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    User
    .findOne({email: email})
    .then(user => {
        if (!user) {
            res.status(500).json({message: 'No user with that email found!'});
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
            'concertmonsterthinkfulsecret',
            { expiresIn: '1h' }
        );
        res.status(200).json({token: token, userId: loadedUser._id.toString(), expiresIn: 3600});
    })
    .catch(err => {
        console.log(err);
    });
};