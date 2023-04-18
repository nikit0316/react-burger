import styles from './ingredient-details.module.css'
import {elementPropTypes} from "../../../utils/prop-types";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useGetIngredientsQuery} from "../../../services/reducers/ingredientAPI";
const IngredientDetails = () => {
    const {ingredientData: element} = useSelector(state => state.modal)
    const {id} = useParams()
    const [el, setEl] = useState('')
    const {data: ingredients,isLoading} = useGetIngredientsQuery('');
    useEffect(() => {
        if (!isLoading) {
            setEl(element.length === 0 ? ingredients.data[ingredients.data.findIndex(x => x._id === id)] : element)
        }
    },[isLoading])
    return (
    <div className={styles.ingredientModal}>
        {!isLoading && el &&
            <div className={styles.ingredientHeader}>
            <img src={el.image_large} alt="oops"></img>
            <p className="text text_type_main-medium pt-4">{el.name}</p>
            <div className={styles.ingredientNutrition}>
                <div>
                    <p className="text text_type_main-default text_color_inactive">Калории, ккал</p>
                    <p className="text text_type_digits-default text_color_inactive">{el.calories}</p>
                </div>
                <div>
                    <p className="text text_type_main-default text_color_inactive">Белки</p>
                    <p className="text text_type_digits-default text_color_inactive">{el.proteins}</p>
                </div>
                <div>
                    <p className="text text_type_main-default text_color_inactive">Жиры</p>
                    <p className="text text_type_digits-default text_color_inactive">{el.fat}</p>
                </div>
                <div>
                    <p className="text text_type_main-default text_color_inactive">Углеводы</p>
                    <p className="text text_type_digits-default text_color_inactive">{el.carbohydrates}</p>
                </div>
            </div>
        </div>
        }
    </div>
    )
}

IngredientDetails.propTypes = {
    element: elementPropTypes,
}
export default IngredientDetails;