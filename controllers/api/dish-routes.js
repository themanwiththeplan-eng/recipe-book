const router = require('express').Router();
const res = require('express/lib/response');
const { Dish, User } = require('../../models');

router.get('/dishes/:id', (req, res) => {
    try {
        const dbRecipeData = await Dish.findByPk(req.params.id, {
            include: [
                {
                    model: Dish,
                    attributes: [
                        'id',
                        'dishName',
                        'recipe',
                        'ingredients',
                        'country'
                    ]
                }
            ]
        })
        const recipes = dbRecipeData.get({plain: true});
        res.json('recipes', {recipes, loggedin: req.session.loggedin})
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
    
})
