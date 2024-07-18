// import { MouseEventHandler } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { Recipe } from "../types";

// import RecipeModal from "./RecipeModel";

interface Props {
  recipe: Recipe;
  onClick: () => void;
  isFavourite: boolean;
  onFavouriteButtonClick: (recipe: Recipe) => void;
}
const RecipeCard = ({
  recipe,
  onClick,
  onFavouriteButtonClick,
  isFavourite,
}: Props) => {
  return (
    <div className="recipe-card" onClick={onClick} key={recipe.title}>
      <img src={recipe.image}></img>
      <div className="recipe-card-title">
        <span
          onClick={(event) => {
            event.stopPropagation();
            onFavouriteButtonClick(recipe);
          }}
        >
          {isFavourite ? (
            <AiFillHeart size={25} color="red" />
          ) : (
            <AiOutlineHeart size={25} />
          )}
        </span>

        <h3>{recipe.title}</h3>
      </div>
    </div>
  );
};

export default RecipeCard;
