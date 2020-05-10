const Recipe = require('../models/recipe')

exports.insertRecipe = (req, res, next) => {
    const url = `${req.protocol}://${req.get('host')}`

    const recipe = new Recipe({
        name: req.body.name,
        description: req.body.description,
        // imagePath: `${url}/images/${req.file.filename}`,
        // creator: req.userData.userId
    })

    recipe.save().then(
        createdRecipe => {
            res.status(201).json({
                message: 'Recipe received successfully',
                recipe: {
                    _id: createdRecipe._id,
                    ...createdRecipe,
                },
            })
        },
        error => {
            console.log(error)
            res.status(500).json({
                message: 'Creating a recipe failed',
            })
        }
    )
}

exports.updateRecipe = (req, res, next) => {
    //   let imagePath = req.body.imagePath;
    //   if (req.file) {
    //     const url = `${req.protocol}://${req.get('host')}`;
    //     imagePath = `${url}/images/${req.file.filename}`;
    //   }

    const recipe = new Recipe({
        _id: req.params.id,
        name: req.body.name,
        description: req.body.description,
        // ingredients: req.body.ingredients,
        // imagePath,
        // creator: req.userData.userId
    })

    Recipe.updateOne(
        //   { _id: req.params.id, creator: req.userData.userId },
        { _id: req.params.id },
        recipe
    ).then(
        result => {
            if (result.n > 0) {
                res.status(200).json({
                    message: 'Update successful',
                })
            } else {
                res.status(401).json({
                    message: 'Not authorized',
                })
            }
        },
        error => {
            res.status(500).json({
                message: "Couldn't update recipe",
            })
        }
    )
}

exports.getAllRecipes = (req, res, next) => {
    const pageSize = +req.query.pagesize
    const currentPage = +req.query.page
    const recipeQuery = Recipe.find()
    let fetchedRecipes

    if (pageSize && currentPage) {
        recipeQuery.skip(pageSize * (currentPage - 1)).limit(pageSize)
    }

    recipeQuery
        .then(documents => {
            fetchedRecipes = documents
            return Recipe.count()
        })
        .then(
            count => {
                res.status(200).json({
                    message: 'Recipes fetched successfully',
                    recipes: fetchedRecipes,
                    maxRecipes: count,
                })
            },
            error => {
                res.status(500).json({
                    message: "Couldn't get recipes",
                })
            }
        )
}

exports.getRecipe = (req, res, next) => {
    Recipe.findById(req.params.id).then(
        recipe => {
            if (recipe) {
                res.status(200).json(recipe)
            } else {
                res.status(404).json({
                    message: 'Recipe not found',
                })
            }
        },
        error => {
            res.status(500).json({
                message: "Couldn't fetch recipe",
            })
        }
    )
}

exports.deleteRecipe = (req, res, next) => {
    //   Recipe.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then(
    Recipe.deleteOne({ _id: req.params.id }).then(
        result => {
            if (result.deletedCount > 0) {
                res.status(200).json({
                    message: 'Recipe deleted!',
                })
            } else {
                res.status(401).json({
                    message: 'Not authorized',
                })
            }
        },
        error => {
            res.status(500).json({
                message: "Couldn't delete recipe",
            })
        }
    )
}
