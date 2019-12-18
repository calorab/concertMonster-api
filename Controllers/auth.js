const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../Models/user');

exports.signup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    
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
        res.status(201).json(result);
    })
    .catch(err => {
        console.log(err);
    })
};

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    User
    .findOne({email: email})
    .then(user => {
        if (!user) {
            res.status(404).json({Message: 'No user with that email found!'});
        }
        loadedUser = user;
        return bcrypt.compare(password, user.password);
    })
    .then(isEqual => {
        if (!isEqual) {
            res.status(403).json({Message: 'Password is incorrect!'});
        }
        const token = jwt.sign(
            {
                email: loadedUser.email, 
                userId: loadedUser._id.toString()
            }, 
            'concertmonsterthinkfulsecret', 
            {expiresIn: '1h'}
        );
        res.status(200).json({message: 'Logged in successfully!', token: token, userId: loadedUser._id.toString()});
    })
    .catch(err => {
        console.log(err);
    });
};