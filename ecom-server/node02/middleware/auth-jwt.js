const { expressjwt : jwt} = require('express-jwt');

const authJwt = () => {
    secret = process.env.SECRET_KEY
    return jwt({
        secret,
        algorithms: ['HS256']

    })
    .unless({
        path: [
        { url:/^\/images\/.*/},
        { url: "/api/v1/users/login", methods : ['POST']},
        { url: "/api/v1/users/register"},
        { url: "/api/v1/products", methods: ['GET']}, 
        { url: "/api/v1/orders", methods: ['POST']},
        { url: /^\/api\/v1\/products\/.*/ , methods: ['GET']}
        
        ]
    })  
    
}

module.exports = authJwt