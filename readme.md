# Get started
Git clone this project and run:
```
npm i && npm run dev
```
The app will be available at `localhost:3000` by default, you can change the port by setting the `PORT` environment variable

# Recipes
The following route will return all recipes:
`localhost:3000/api/recipes`

For a specific recipe:
`localhost:3000/api/recipes/<recipe_id>`

# Environment Variables
This project is build using MongoDB Atlas. You will need to create an account and create a user for your database. Those user credentials will need to be entered in an .env file at the root of this directory. 

E.G.
```
# .env file
MONGO_ATLAS_USERNAME=<your_username>
MONGO_ATLAS_PW=<your_password>
```