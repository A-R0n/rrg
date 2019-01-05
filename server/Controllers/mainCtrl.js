const axios = require('axios');
require('dotenv').config();

var coord = []

function getCoordinate (req, res, next) {
   axios.get(`https://openweathermap.org/data/2.5/weather?lat=38&lon=-84&${process.env.WEATHER_API}`)
   .then(response => {
       console.log('weather resp', response.data.weather)
       if(response.data.weather[0].main == "Clouds"){
           response.data.weather[0].image = 'https://image.flaticon.com/icons/svg/131/131043.svg'
       }
       else if(response.data.weather[0].main == "Clear"){
           response.data.weather[0].image = "https://image.flaticon.com/icons/svg/1163/1163661.svg"
       }
       else if(response.data.weather[0].main == "Rain"){
        response.data.weather[0].image = "https://image.flaticon.com/icons/svg/704/704832.svg"
        }
        else if(response.data.weather[0].main == "Mist"){
        response.data.weather[0].image = "https://c.pxhere.com/photos/85/d1/photo-33709.jpg!d"
        }
        else if(response.data.weather[0].main == "Drizzle"){
            response.data.weather[0].image = "https://image.flaticon.com/icons/svg/1281/1281211.svg"
            }
        else if(response.data.weather[0].main == "Snow"){
            response.data.weather[0].image = "https://image.flaticon.com/icons/svg/642/642000.svg"
            }
        

       coord = response.data
       res.status(200).json(response.data)
   }).catch(err => res.status(500).json(err))
};

const addImage = (req, res, next) => {
    const {imageUrl} = req.body
    req.app
        .get('db')
        .add_image([imageUrl, req.user.id])
        .then(response => res.status(200).send(response))
        .catch(err => res.status(500).send(err))
};

const routePic = (req, res, next) => {
    console.log('yes, so our test is hitting the route pic upload', req.params)
    const {imageUrl} = req.body
    req.app
        .get('db')
        .changeRoutePic([req.params.id, req.params.userid, imageUrl])
        .then(response => res.status(200).send(response))
        .catch(err => {
            res.status(500).send(err)})
        
};

const getRoutePic = (req, res, next) => {
    console.log('fjaslfsjef yessssss eflijwefiew', req.params)
    const {imageUrl} = req.body
    req.app
        .get('db')
        .changeRoutePic([req.params.id, req.params.userid, imageUrl])
        .then(response => res.status(200).send(response))
        .catch(err => {
            res.status(500).send(err)})
        
};

const deleteRouteFromJournal = (req, res, next) => {
    req.app
        .get('db')
        .delete_(req.params.id)
        .then(response => res.status(200).send(response) )
        .catch(err => res.status(500).send(err))
};

const getRoutes = (req, res, next) => {
    req.app
        .get('db')
        .get_routes()
        .then(response => res.status(200).send(response))
        .catch(err => res.status(500).send(err))
};

const getUser = (req, res, next) => {
    req.app
        .get('db')
        .get_user(req.user.id)
        .then(response => res.status(200).send(response))
        .catch(err => res.status(500).send(err))
};

const getTable = (req, res, next) => {
    req.app
        .get('db')
        .getCart([req.session.passport.user.id])
        .then(response => res.status(200).send(response))
        .catch(err => res.status(500).send(err))
};

const getEveryonesDescription = (req, res, next) => {
    req.app
        .get('db')
        .getEveryonesCart()
        .then(response => res.status(200).send(response))
        .catch(err => res.status(500).send(err))
};

const addRoute = (req, res, next) => {
    req.app
        .get('db')
        .post_route([req.params.id, req.session.passport.user.id])
        .then(response => 
            res
                .status(200)
                .send(response)
        )
        .catch(e => res.status(500).send(e))
};


const iGotIt = (req, res, next) => {
    req.app
        .get('db')
        .sent_(req.params.id)
        .then(response => res.status(200).send(response) )
        .catch(err => res.status(500).send(err))
}

const createRating = (req, res, next) => {
    req.app
        .get('db')
        .star(req.params.id, req.body.newRating, req.user.id)
        .then(response => res.status(200).send(response) )
        .catch(err => res.status(500).send(err))
}

const update = ( req, res, next ) => {
    req.app
        .get('db')
        .update_([req.params.id, req.body.description, req.session.passport.user.id])
        .then(response => res.status(200).send(response) )
        .catch(err => res.status(500).send(err))
};

const updateTime = ( req, res, next ) => {
    req.app
        .get('db')
        .update_time(req.params.id)
        .then(response => res.status(200).send(response) )
        .catch(err => res.status(500).send(err))
};

const createProfile = (req, res, next) => {
    const {userName, biography, location, image_} = req.body.val
    req.app
        .get('db')
        .updateProfile([userName, location, biography, image_, req.user.id])
        .then(response => res.status(200).send(response) )
        .catch(err => {
            res.status(500).send(err)})
}

module.exports = {
    getCoordinate,
    getRoutes,
    addRoute,
    getTable,
    update,
    deleteRouteFromJournal,
    updateTime,
    createRating,
    iGotIt,
    getEveryonesDescription,
    createProfile,
    getUser,
    addImage,
    routePic,
    getRoutePic
};