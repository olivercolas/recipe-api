const express = require('express')
const router = express.Router()
// const checkAuth = require('../middleware/check-auth');
// const extractFile = require('../middleware/file-storage');
const RecipesController = require('../controllers/recipes')

// router.post('', checkAuth, extractFile, RecipesController.insertRecipe);
router.post('', RecipesController.insertRecipe)
// router.put('/:id', checkAuth, extractFile, RecipesController.updateRecipe);
router.put('/:id', RecipesController.updateRecipe)
router.get('', RecipesController.getAllRecipes)
router.get('/:id', RecipesController.getRecipe)
// router.delete('/:id', checkAuth, RecipesController.deleteRecipe);
router.delete('/:id', RecipesController.deleteRecipe)

module.exports = router
