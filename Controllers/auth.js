const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../Models/user');

exports.signup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log('received body: ', email, password);
    User.findOne({email: email})
    .then(user => {
        console.log('For Testing - existing user if null ', user)
        if (user) 
        {
            throw new Error('User with that email already Exists!');  
        }
        
    })
    .catch(err => {
        console.log(err);
        next(err);
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
    console.log('TESTING - received login info: ', req.body);
    User
    .findOne({email: email})
    .then(user => {
        console.log('TESTING USER FOUND? ', user);
        if (!user) {
            throw new Error('No user with that email found!');
        } 
        loadedUser = user;
        console.log('req.body.password:' + password, 'user.password:' + user.password);
        return bcrypt.compare(password, user.password); 
    })
    .then(isEqual => {
        console.log('Is Equal?? ', isEqual);
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