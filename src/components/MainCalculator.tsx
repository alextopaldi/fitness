import React, { useState } from "react"
import { MainCalculatorInt, MainCalculatorResultsInt } from "../models/MainCalculatorInt"

export function MainCalculactor() {

    const [formValues, setFormValues] = useState<MainCalculatorInt>({
      sex: '',
      age: 0,
      height: 0,
      weight: 0,
      fat: 0,
      activity: 1.2,
      wish: 1.2
    })

    const [res, setRes] = useState<MainCalculatorResultsInt>({
      middle: 0,
      miffin: 0,
      harris: 0
    })

    const [resVision, setResVision] = useState(false)

    function SubmitHandler(event: React.FormEvent) {
      event.preventDefault()
      setResVision(true)
      if (formValues.sex == 'male') {
        let ccal1 = Math.round((10*formValues.weight + 6.25*formValues.height - 5*formValues.age + 5)*formValues.activity)
        setRes(prev => ({...prev, middle: ccal1}))
        let ccal2 = Math.round((10*formValues.weight + 6.25*formValues.height - 5*formValues.age + 5)*formValues.activity*formValues.wish)
        setRes(prev => ({...prev, miffin: ccal2}))
        let ccal3 = Math.round((13.397*formValues.weight + 4.779*formValues.height - 5.667*formValues.age + 88.362)*formValues.activity*formValues.wish)
        setRes(prev => ({...prev, harris: ccal3}))
      }
      else if (formValues.sex == 'female') {
        let ccal1 = Math.round((10*formValues.weight + 6.25*formValues.height - 5*formValues.age - 161)*formValues.activity)
        setRes(prev => ({...prev, middle: ccal1}))
        let ccal2 = Math.round((10*formValues.weight + 6.25*formValues.height - 5*formValues.age - 161)*formValues.activity*formValues.wish)
        setRes(prev => ({...prev, miffin: ccal2}))
        let ccal3 = Math.round((9.247*formValues.weight + 3.098*formValues.height - 4.33*formValues.age + 447.593)*formValues.activity*formValues.wish)
        setRes(prev => ({...prev, harris: ccal3}))
      }
      else {

      }
    }

    return (
      <>
        <div className="main_calculator">
          <form action="" className='calc' onSubmit={SubmitHandler}>
            <div>
              <label htmlFor="sexMale" className='form-check-label inline-block'>
                <input value={'male'} onChange={event => setFormValues(prev =>  ({ ...prev, sex: event.target.value}))}
                className='form-check-input  appearance-none rounded-full h-4 w-4 border border-orange-300 bg-gray-700 checked:bg-orange-300 checked:border-orange-300 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mx-2 cursor-pointer' type="radio" name="sex"  id="sexMale"></input>
                Мужской
              </label>
              <label htmlFor="sexFemale" className='form-check-label inline-block'>
                <input value={'female'} onChange={event => setFormValues(prev =>  ({ ...prev, sex: event.target.value}))}
                className='form-check-input appearance-none rounded-full h-4 w-4 border border-orange-300  bg-gray-700 checked:bg-orange-300 checked:border-orange-300 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mx-2 cursor-pointer' type="radio" name="sex"  id="sexFemale"></input>
                Женский
              </label>
            </div>
            <label htmlFor="age">
              Возраст:
              <input className='inp-text' type="text" id='age' value={formValues?.age} onChange={event => setFormValues(prev =>  ({ ...prev, age: Number(event.target.value)}))}/>
            </label>
            <label htmlFor="height">
              Рост:
              <input className='inp-text' type="text" id='height' value={formValues?.height} onChange={event => setFormValues(prev =>  ({ ...prev, height: Number(event.target.value)}))}/>
            </label>
            <label htmlFor="weight">
              Текущий вес:
              <input className='inp-text' type="text" id='weight' value={formValues?.weight} onChange={event => setFormValues(prev =>  ({ ...prev, weight: Number(event.target.value)}))} />
            </label>
            <label htmlFor="fat">
              Процент жира:
              <input className='inp-text' type="text" id='fat' value={formValues?.fat} onChange={event => setFormValues(prev =>  ({ ...prev, fat: Number(event.target.value)}))} />
            </label>
            <label htmlFor="activity">
              Уровень физических нагрузок:
              <select onChange={event => setFormValues(prev =>  ({ ...prev, activity: Number(event.target.value)}))} className='select-opt' name="activity" id="activity">
                <option value={1.2}>Минимум нагрузки</option>
                <option value={1.38}>Легкая нагрузка</option>
                <option value={1.46}>Умеренная нагрузка</option>
                <option value={1.55}>Интенсивная нагрузка</option>
                <option value={1.9}>Экстримальная нагрузка</option>
              </select>
            </label>
            <label htmlFor="wish">
              Вы добиваетесь:
              <select onChange={event => setFormValues(prev =>  ({ ...prev, wish: Number(event.target.value)}))} className='select-opt' name="wish" id="wish">
                <option value={1.2}>Набора массы</option>
                <option value={0.85}>Похудения</option>
              </select>
            </label>
            <input className="main_calc_btn" type="submit" value="Рассчитать" />
          </form>
        </div>
        {resVision && <div className="main_calc_results">
          <p>Для поддержания веса: <b>{res.middle}</b></p>
          <p>Формула Миффлина-Сан Жеора: <b>{res.miffin}</b></p>
          <p>Формула Харриса-Бенедикта: <b>{res.harris}</b></p>
        </div>}
      </>
    )
}