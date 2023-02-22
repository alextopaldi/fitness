import { ReactNode, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import { CaloriesInt } from '../models/MainCalculatorInt';
import { caloriesReducer } from '../redux/CaloriesReducer';
import { EatingPages } from './EatingPages';
import {faChevronDown, faXmark, faChevronUp} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export function Calories() {

    const dispatch = useDispatch()
    const dishes = useSelector((state:any) => state.calories.dishes)
    // const [calories1, setCalories1] = useState(0)

    const [dishVision, setDishVision] = useState({
        breakfast: false,
        lanch: false,
        dinner: false,
        snack: false
    })

    const [dishCalories, setDishCalories] = useState({
        breakfast: 0,
        lanch: 0,
        dinner: 0,
        snack: 0
    })

    const [dishPercent, setDishPercent] = useState({
        breakfast: 0,
        lanch: 0,
        dinner: 0,
        snack: 0
    })

    const iconDish1 = dishVision.breakfast? faChevronUp : faChevronDown
    const iconDish2 = dishVision.lanch? faChevronUp : faChevronDown
    const iconDish3 = dishVision.dinner? faChevronUp : faChevronDown
    const iconDish4 = dishVision.snack? faChevronUp : faChevronDown

    const [caloriesValues, setCaloriesValues] = useState<CaloriesInt>({
        calories : 0,
        eating: 'Завтрак',
        dish: ''
    })

    function SubmitHandler(event: React.FormEvent) {
        event.preventDefault()
        // dispatch({type: "ADD_CALORIES", payload: calories1})
        dispatch({type: "ADD_DISHES", payload: caloriesValues})
        switch(caloriesValues.eating){
            case 'Завтрак':
                setDishCalories(prev => ({...prev, breakfast: prev.breakfast + caloriesValues.calories}))
                break
            case 'Обед':
                setDishCalories(prev => ({...prev, lanch: prev.lanch + caloriesValues.calories}))
                break
            case 'Ужин':
                setDishCalories(prev => ({...prev, dinner: prev.dinner + caloriesValues.calories}))
                break
            case 'Перекус/Другое':
                setDishCalories(prev => ({...prev, snack: prev.snack + caloriesValues.calories}))
                break
        } 
    }

    useEffect(() => {
        setDishPercent(prev => ({...prev, breakfast: Math.round(dishCalories.breakfast/ccl*100)}))
    }, [dishCalories.breakfast])

    useEffect(() => {
        setDishPercent(prev => ({...prev, lanch: Math.round(dishCalories.lanch/ccl*100)}))
    }, [dishCalories.lanch])

    useEffect(() => {
        setDishPercent(prev => ({...prev, dinner: Math.round(dishCalories.dinner/ccl*100)}))
    }, [dishCalories.dinner])

    useEffect(() => {
        setDishPercent(prev => ({...prev, snack: Math.round(dishCalories.snack/ccl*100)}))
    }, [dishCalories.snack])

    function CaloriesPlus() {
        let caloriesSum = 0
        dishes.map((dish: CaloriesInt) => caloriesSum += dish.calories)
        return caloriesSum
        
    }

    function DishesFilter(eating : string) {
        return dishes.filter((dish: CaloriesInt) => dish.eating === eating)
    }

    function DishesVision(eating: string) {
        switch(eating) {
            case 'breakfast':
                setDishVision(prev => ({...prev, breakfast: !prev.breakfast}))
                break
            case 'lanch':
                setDishVision(prev => ({...prev, lanch: !prev.lanch}))
                break
            case 'dinner':
                setDishVision(prev => ({...prev, dinner: !prev.dinner}))
                break
            case 'snack':
                setDishVision(prev => ({...prev, snack: !prev.snack}))
                break
        }
    }

    const ccl = 3000
    const vl1 = CaloriesPlus() > ccl? ccl: CaloriesPlus()
    const vl2 = ccl-vl1
    const COLORS = ['rgb(253, 186, 116)', 'rgb(75, 85, 99)'];
    const data = [
        { name: 'Group A', value: vl1 },
        { name: 'Group B', value: vl2 }
    ];

    const video = require('../media/gym.mp4')

    return (
        <>
        
        <div className='background'>
        <video className='gym-video' src={video} autoPlay loop muted></video>
            <div className='wrapper'>
                <div className='calories_content'>
                    <div className='form_chart'>
                        <form className="calories_form" action="" onSubmit={SubmitHandler}>
                            <select className='select-opt' name="foodvar" id="foodvar"
                            onChange={event => setCaloriesValues(prev => ({...prev, eating: event.target.value}))}>
                                <option value={'Завтрак'}>Завтрак</option>
                                <option value={'Обед'}>Обед</option>
                                <option value={'Ужин'}>Ужин</option>
                                <option value={'Перекус/Другое'}>Перекус/Другое</option>
                            </select>
                            <input className='inp-text' type="text" name="" id="" placeholder="Описание блюда" 
                            value={caloriesValues.dish}
                            onChange={event => setCaloriesValues(prev => ({...prev, dish: event.target.value}))}/>
                            <input className='inp-text' type="text" name="" id="" placeholder="Количество калорий"
                            value={(caloriesValues.calories == 0)? '' : caloriesValues.calories}
                            onChange={event => setCaloriesValues(prev => ({...prev, calories: Number(event.target.value)}))} />
                            <input className="calories_btn" type="submit" name="" id="" value='Добавить'/>
                        </form>
                        <div className='chart'>
                            {/* <ResponsiveContainer width="100%" height="100%"> */}
                                <PieChart width={350} height={350}>
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
                            {/* </ResponsiveContainer> */}
                            <div className='calories_results'>
                                <p>Калорий употреблено: <b>{CaloriesPlus()}</b></p>
                                <p>Осталось: <b>{ccl - CaloriesPlus()}</b></p>
                            </div>
                        </div>
                    </div>
                    <div className='calories_dishes'>
                        <div className='calories_dish'>
                            <div className='dish_value'>
                                <p>Завтрак - <b>{dishCalories.breakfast} кал.</b> {dishPercent.breakfast}%</p>
                                <FontAwesomeIcon onClick={() => DishesVision('breakfast')} className="h-[20px] text-white cursor-pointer" icon={iconDish1}/>
                            </div>
                            {dishVision.breakfast && DishesFilter('Завтрак').map((dish: CaloriesInt, index:string) => dish.calories != 0 && <EatingPages key={index} dish={dish}></EatingPages>)}
                        </div>
                        <div className='calories_dish'>
                            <div className='dish_value'>
                                <p>Обед - <b>{dishCalories.lanch} кал.</b> {dishPercent.lanch}%</p>
                                <FontAwesomeIcon onClick={() => DishesVision('lanch')} className="h-[20px] text-white cursor-pointer" icon={iconDish2}/>
                            </div>
                            {dishVision.lanch && DishesFilter('Обед').map((dish: CaloriesInt, index:string) => dish.calories != 0 && <EatingPages key={index} dish={dish}></EatingPages>)}
                        </div>
                        <div className='calories_dish'>
                            <div className='dish_value'>
                                <p>Ужин - <b>{dishCalories.dinner} кал.</b> {dishPercent.dinner}%</p>
                                <FontAwesomeIcon onClick={() => DishesVision('dinner')} className="h-[20px] text-white cursor-pointer" icon={iconDish3}/>
                            </div>
                            {dishVision.dinner && DishesFilter('Ужин').map((dish: CaloriesInt, index:string) => dish.calories != 0 && <EatingPages key={index} dish={dish}></EatingPages>)}
                        </div>
                        <div className='calories_dish'>
                            <div className='dish_value'>
                                <p>Перекус/другое - <b>{dishCalories.snack} кал.</b> {dishPercent.snack}%</p>
                                <FontAwesomeIcon onClick={() => DishesVision('snack')} className="h-[20px] text-white cursor-pointer" icon={iconDish4}/>
                            </div>
                            {dishVision.snack && DishesFilter('Перекус/Другое').map((dish: CaloriesInt, index:string) => dish.calories != 0 && <EatingPages key={index} dish={dish}></EatingPages>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}