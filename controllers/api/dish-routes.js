const router = require('express').Router();
const res = require('express/lib/response');
const { Dish, User } = require('../../models');

router.get('/', (req, res) => {
    try{
        const recipeData = await Dish.findAll({
            include: [
                {
                    model: Dish,
                    attributes: [
                        'dishName',
                        'country'
                    ]
                }
            ]
        })
        const recipes = recipeData.map(recipe => recipe.get({plain: true}))
        res.json('recipe', {
            recipes,
            loggedIn: req.session.loggedIn
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})

router.get('/:id', (req, res) => {
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
        res.json('recipes', {recipes, loggedIn: req.session.loggedIn})
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
    
})
