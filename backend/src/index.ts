import express from 'express';
import cors from 'cors';
import * as RecipeAPI from "./recipe-api"
import  {PrismaClient}  from '@prisma/client'
import dotenv from 'dotenv';

 const prisma = new PrismaClient()
dotenv.config()
const app = express();

app.use(express.json()); 
app.use(cors())

const PORT = process.env.PORT
 
app.get("/api/recipes/search/",async(req,res) =>{
    const searchTerm = req.query.searchTerm as string;
    const page = parseInt(req.query.page as string);
    const results =await RecipeAPI.searchRecipes(searchTerm,page);

    return res.json(results); 
});
app.get("/api/recipes/:recipeId/summary", async(req,res)=>{
    const recipeId = req.params.recipeId;
    const results = await RecipeAPI.getRecipesSummary(recipeId)
    return res.json(results)
});
app.post("/api/recipes/favourite/",async(req,res) =>{
    const recipeId = req.body.recipeId
    try {
         const favoriteRecipe = await prisma.favouriteRecipes.create({
            data: {recipeId:recipeId}
         })
         return res.status(201).json(favoriteRecipe)
    } catch (error) {
        console.log(error)
        return res.status(500).json({erorr:"Oops, something went wrong"})
    }
});

app.get("/api/recipes/favourite/", async(req,res) =>{
    try {
        const recipes = await prisma.favouriteRecipes.findMany();
        const recipeIds =recipes.map((recipe) =>recipe.recipeId.toString()); 
        const favorites = await RecipeAPI.getFavoriteRecipesByIds(recipeIds);
        
        return res.json(favorites);

    } catch (error) {
        console.log(error)
    }
});

app.delete("/api/recipes/favourite/", async(req,res) =>{
    const recipeId = parseInt(req.body.recipeId)
    try {
        await prisma.favouriteRecipes.delete({
            where:{
                recipeId:recipeId
            }
            
        })
        return res.status(204)
    } catch (error) {
        console.log(error)
        return res.status(500).json({erorr:"Oops, something went wrong"})
    }
})

app.get("/", (req,res) =>{
    res.send("home page")
});

app.listen(PORT, ()=>{console.log(`Server running on : http://localhost:${PORT} 🚀🚀`)})
