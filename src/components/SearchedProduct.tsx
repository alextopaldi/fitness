import axios from "axios"
import { useState } from "react"
import { IProductInfoSearchResult, IProductSearchResult } from "../models/ProductSearchResult"

interface SearchetProductProps {
    product : IProductSearchResult
}

export function SearchetProduct({product} : SearchetProductProps)  {

    const apiKey = 'ebc7bffae2434085b102d7c100a3a7c3'
    const [productInfo, setProductInfo] = useState<IProductInfoSearchResult>()
    const [loading, setLoading] = useState(false)
    async function FetchProductInfo() {
        setLoading(true)
        const response = await axios.get<IProductInfoSearchResult>('https://api.spoonacular.com/food/ingredients/'+product.id+'/information?amount=1&apiKey='+apiKey)
        setProductInfo(response.data)
        setLoading(false)
    }

    function CaloriesPerHundred() {
        let calories = productInfo?.nutrition.nutrients.find(item => item.name=='Calories')?.amount
        let weight = productInfo?.nutrition.weightPerServing.amount
        if (calories && weight) {
            return Math.floor(calories/weight*100)
        }
        return 'error'
    }

    return (
        <div>
            <p>{product.name}</p>
            <button onClick={FetchProductInfo}>Information</button>
            {loading && <div>Loading...</div>}
            {productInfo && 
            <div>
                <p>{CaloriesPerHundred()}</p>
            </div>}
        </div>
    )
}