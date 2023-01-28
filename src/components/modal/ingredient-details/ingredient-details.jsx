import styles from './ingredient-details.module.css'
import {useEffect} from "react";
import PropTypes from "prop-types";

const elementPropTypes = PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
})
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
    props: PropTypes.instanceOf(elementPropTypes)
}
export default IngredientDetails;