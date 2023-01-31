import styles from './ingredient-details.module.css'
import {useEffect} from "react";
import PropTypes from "prop-types";
import {elementPropTypes} from "../../../utils/prop-types";
const IngredientDetails = (props) => {
    return (
        <div className={styles.ingredientModal}>
            <div className={styles.ingredientHeader}>
                <img src={props.element.image_large} alt="oops"></img>
                <p className="text text_type_main-medium pt-4" style={{textAlign: 'center'}}>{props.element.name}</p>
                <div className={styles.ingredientNutrition}>
                    <div>
                        <p className="text text_type_main-default text_color_inactive">Калории, ккал</p>
                        <p className="text text_type_digits-default text_color_inactive" style={{textAlign: 'center'}}>{props.element.calories}</p>
                    </div>
                    <div>
                        <p className="text text_type_main-default text_color_inactive">Белки</p>
                        <p className="text text_type_digits-default text_color_inactive" style={{textAlign: 'center'}}>{props.element.proteins}</p>
                    </div>
                    <div>
                        <p className="text text_type_main-default text_color_inactive">Жиры</p>
                        <p className="text text_type_digits-default text_color_inactive" style={{textAlign: 'center'}}>{props.element.fat}</p>
                    </div>
                    <div>
                        <p className="text text_type_main-default text_color_inactive">Углеводы</p>
                        <p className="text text_type_digits-default text_color_inactive" style={{textAlign: 'center'}}>{props.element.carbohydrates}</p>
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