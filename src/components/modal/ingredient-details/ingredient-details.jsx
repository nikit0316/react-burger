import styles from './ingredient-details.module.css'
import {elementPropTypes} from "../../../utils/prop-types";
import {useSelector} from "react-redux";
const IngredientDetails = () => {
    const {modalData: element} = useSelector(state => state.modal)
    return (
        <div className={styles.ingredientModal}>
            <div className={styles.ingredientHeader}>
                <img src={element.image_large} alt="oops"></img>
                <p className="text text_type_main-medium pt-4">{element.name}</p>
                <div className={styles.ingredientNutrition}>
                    <div>
                        <p className="text text_type_main-default text_color_inactive">Калории, ккал</p>
                        <p className="text text_type_digits-default text_color_inactive">{element.calories}</p>
                    </div>
                    <div>
                        <p className="text text_type_main-default text_color_inactive">Белки</p>
                        <p className="text text_type_digits-default text_color_inactive">{element.proteins}</p>
                    </div>
                    <div>
                        <p className="text text_type_main-default text_color_inactive">Жиры</p>
                        <p className="text text_type_digits-default text_color_inactive">{element.fat}</p>
                    </div>
                    <div>
                        <p className="text text_type_main-default text_color_inactive">Углеводы</p>
                        <p className="text text_type_digits-default text_color_inactive">{element.carbohydrates}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

IngredientDetails.propTypes = {
    element: elementPropTypes,
}
export default IngredientDetails;