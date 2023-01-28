import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import { CaloriesInt } from '../models/MainCalculatorInt';
import { caloriesReducer } from '../redux/CaloriesReducer';

export function Calories() {

    const dispatch = useDispatch()
    const calories = useSelector((state:any) => state.calories.calories)
    const calorie = useSelector((state:any) => state.calories.calorie)
    const dishes = useSelector((state:any) => state.calories.dishes)

    const [calories1, setCalories1] = useState(0)

    const [caloriesValues, setCaloriesValues] = useState<CaloriesInt>({
        calories : 0,
        eating: 'Завтрак',
        dish: ''
    })

    function SubmitHandler(event: React.FormEvent) {
        event.preventDefault()
        dispatch({type: "ADD_CALORIES", payload: calories1})
        // dispatch({type: "ADD_DISH", payload: caloriesValues})
        dispatch({type: "ADD_DISHES", payload: caloriesValues})
    }

    function CaloriesPlus() {
        let caloriesSum = 0
        dishes.map((dish: CaloriesInt) => caloriesSum += dish.calories)
        return caloriesSum
    }

    const ccl = 3000
    const vl1 = CaloriesPlus()
    const vl2 = ccl-vl1
    const COLORS = ['rgb(253, 186, 116)', 'rgb(75, 85, 99)'];
    const data = [
        { name: 'Group A', value: vl1 },
        { name: 'Group B', value: vl2 }
    ];

    return (
        <>
        <div>
            <form className="calories_form" action="" onSubmit={SubmitHandler}>
                <select className='select-opt' name="foodvar" id="foodvar"
                onChange={event => setCaloriesValues(prev => ({...prev, eating: event.target.value}))}>
                    <option value={'Завтрак'}>Завтрак</option>
                    <option value={'Обед'}>Обед</option>
                    <option value={'Ужин'}>Ужин</option>
                    <option value={'Перекус'}>Перекус</option>
                </select>
                <input className='inp-text' type="text" name="" id="" placeholder="Описание блюда" 
                value={caloriesValues.dish}
                onChange={event => setCaloriesValues(prev => ({...prev, dish: event.target.value}))}/>
                <input className='inp-text' type="text" name="" id="" placeholder="Количество калорий"
                value={(caloriesValues.calories == 0)? '' : caloriesValues.calories}
                onChange={event => setCaloriesValues(prev => ({...prev, calories: Number(event.target.value)}))} />
                <input className="calories_btn" type="submit" name="" id="" value='Добавить'/>
            </form>
            <div>
                {/* {calorie.map((calorie:Number, index:string) => <p key={index}>{String(calorie)}</p>)} */}
                {dishes && dishes.map((dish: CaloriesInt, index:string) => <p key={index}>{dish.calories} {dish.dish} {dish.eating}</p>)}
            </div>
            <PieChart width={400} height={400}>
                <Pie 
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    label
                    fill="#8884d8"
                    dataKey="value"
                    >
                    {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
            </PieChart>
        </div>
        </>
    )
}