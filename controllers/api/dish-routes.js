const router = require('express').Router();
const res = require('express/lib/response');
const { Dish, User } = require('../../models');

router.get('/:num', (req, res) => {
    const dbData = {
        dishName: req.body.dishName,
        recipe: req.body.recipe,
        ingredients: req.body.ingredients,
        country: req.body.ingredients
    }
})

router.post('/', (req, res) => {
    const dbUserData = User.create({
        googleId: req.body.googleId,
        displayName: req.body.displayName,
    })
    req.session.save(() => {
        req.session.loggedIn = true;

        res.status(200).json(dbUserData);
    })
})

router.post('/login', (req, res) => {
    where:{
        googleId: req.body.googleId
    }
})

if(!dbUserData) {
    res.status(400)
    .json({message: 'Not a valid user. Please try again.'})
    return;
}