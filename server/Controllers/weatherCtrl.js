const axios = require('axios');
require('dotenv').config();

var coord = []

function getCoordinate (req, res, next) {
   axios.get(`https://openweathermap.org/data/2.5/weather?lat=38&lon=-84&${process.env.WEATHER_API}`)
   .then(response => {
       console.log('weather resp', response.data.weather[0].main)
       if(response.data.weather[0].main == "Clouds"){
           response.data.weather[0].image = 'https://pixfeeds.com/images/14/388569/1200-497100312-cumulus-clouds.jpg'
       }
       else if(response.data.weather[0].main == "Clear"){
           response.data.weather[0].image = "https://ak9.picdn.net/shutterstock/videos/880219/thumb/1.jpg"
       }
       else if(response.data.weather[0].main == "Rain"){
        response.data.weather[0].image = "https://i.ytimg.com/vi/J5OSRpRyl6g/maxresdefault.jpg"
    }

       coord = response.data
       res.status(200).json(response.data)
   }).catch(err => res.status(500).json(err))
};

const getRoutes = (req, res, next) => {
    req.app
        .get('db')
        .get_routes()
        .then(response => res.status(200).send(response))
        .catch(err => res.status(500).send(err))
};


const addRoute = (req, res, next) => {
    req.app
        .get('db')
        .post_route(req.params.id, req.session.passport.user.id)
        .then(response => 
            res
                .status(200)
                .send(response)
        )
        .catch(e => res.status(500).send(e))
};

const getTable = (req, res, next) => {
    req.app
        .get('db')
        .getCart(req.session.passport.user.id)
        .then(response => res.status(200).send(response))
        .catch(err => res.status(500).send(err))
};

const update = ( req, res, next ) => {
    req.app
        .get('db')
        .update_(req.params.id, req.body.description)
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

const updateSend = ( req, res, next ) => {
    req.app
        .get('db')
        .sent_(req.params.id)
        .then(response => res.status(200).send(response) )
        .catch(err => res.status(500).send(err))
};

const deleteRouteFromJournal = (req, res, next) => {
    req.app
        .get('db')
        .delete_(req.params.id)
        .then(response => res.status(200).send(response) )
        .catch(err => res.status(500).send(err))
};

const createRating = (req, res, next) => {
    console.log('req.params', req.params)
    console.log('req.body', req.body)
    req.app
        .get('db')
        .star(req.params.id, req.body.newRating)
        .then(response => res.status(200).send(response) )
        .catch(err => res.status(500).send(err))
}


module.exports = {
    getCoordinate,
    getRoutes,
    addRoute,
    getTable,
    update,
    deleteRouteFromJournal,
    updateTime,
    updateSend,
    createRating
};