import dotenv from 'dotenv';
import { URL } from 'url';
dotenv.config()
const apiKey  = process.env.API_KEY

export const searchRecipes = async(searchTerm:string, page:number) =>{
    if(!apiKey){
        throw new Error ("API Key not found ")
    }
    const url = new URL("https://api.spoonacular.com/recipes/complexSearch");

    const queryParams = {
        apiKey,
        query: searchTerm,
        number:"10",
        offset:(page * 10).toString()
    }
    url.search = new URLSearchParams(queryParams).toString()
    
    try {
        const searchResponse = await fetch(url);
        const resultsJson = await searchResponse.json();
        return resultsJson
    } catch (error)
    {
        console.log(error);
    }
};

export const getRecipesSummary =async(recipeId:string) =>{
    if(!apiKey) throw new Error("API key not found")

    const url = new URL(`https://api.spoonacular.com/recipes/${recipeId}/summary`);
    const params = {
        apiKey,
    }
    url.search = new URLSearchParams(params).toString()
    const response = await fetch(url);
    const json  = await response.json();
    return json
}

export const getFavoriteRecipesByIds = async(ids:string[]) =>{
    if(!apiKey) throw new Error("API key not found")
    const url = new URL("https://api.spoonacular.com/recipes/informationBulk")
    const params = {
        apiKey:apiKey,
        ids:ids.join(",")
    }
    url.search = new URLSearchParams(params).toString()
    const searchResponse = await fetch(url);
    const json = await searchResponse.json();
    
    return {results:json}
}

export const getRecipesByNutrients = async(searchTerms:string,page:number) =>{
    if(!apiKey) throw new Error("API key not found");
    const url = new URL("https://api.spoonacular.com/recipes/findByNutrients");
    const queryParams = {
        apiKey,
        query:searchTerms,
        number: "10",
        offset: (page * 10).toString()
    }
    try {
        url.search = new URLSearchParams(queryParams).toString()
        const searchResponse = await fetch(url)
        const json = await searchResponse.json()
        return {results:json}
    } catch (error) {
        console.log(error)
    }
    
}


























