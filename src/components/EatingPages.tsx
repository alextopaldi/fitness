import { CaloriesInt } from "../models/MainCalculatorInt";

interface Props {
    dish: CaloriesInt
}

export function EatingPages({dish} : Props) {
    return(
        <div>
            <p>{dish.dish} - <b>{dish.calories} кал.</b></p>
        </div>
    )
}