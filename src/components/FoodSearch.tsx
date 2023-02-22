import axios from "axios"
import { useEffect, useState } from "react"
import { IProductInfoSearchResult, IProductSearchResult } from "../models/ProductSearchResult"
import { SearchetProduct } from "./SearchedProduct"

export function FoodSearch() {


    const apiKey = 'ebc7bffae2434085b102d7c100a3a7c3'
    const defaultProducts = [{
      id: 41293875,
      name: 'banana',
      image: 'qwer',
    },
    {
      id: 412975,
      name: 'banana juice',
      image: 'qwer',
    },
    {
      id: 41229715,
      name: 'apple',
      image: 'qwer',
    },
    {
      id: 4129475,
      name: 'carrot',
      image: 'qwer',
    },
    {
      id: 4129175,
      name: 'parrot',
      image: 'qwer',
    },
    {
      id: 4122975,
      name: 'zernov',
      image: 'qwer',
    },
    {
      id: 4162975,
      name: 'alex',
      image: 'qwer',
    },]
    const [products, setProducts] = useState<IProductSearchResult[]>([])
    const [product, setProduct] = useState()
    const [searchValue, setSearchValue] = useState('')

    async function startSearch() {
      try {
        const response1 = await axios.get<IProductSearchResult[]>('https://api.spoonacular.com/food/ingredients/search?apiKey='+apiKey+'&query='+searchValue+'&number=3')
        const response2 = await axios.get<IProductInfoSearchResult>('https://api.spoonacular.com/food/ingredients/19081/information?amount=1&apiKey='+apiKey)
        setProducts(response1.data)
      } catch (error) {
        console.log(error)
      }
    }

    // useEffect( () => {
    //   startSearch()
    // }, [])

    async function ProductSearch() {
      try {
        const response1 = await axios.get('https://api.spoonacular.com/food/ingredients/search?apiKey='+apiKey+'&query='+searchValue+'&number=10')
        setProducts(response1.data.results)
      } catch (error) {
        console.log(error)
      }
    }

    return (
        <>
        <div>
            <input className="qwer bg-fuchsia-500" placeholder='Enter a product...' value={searchValue} onChange={(event) => setSearchValue(event.target.value)} type="text" />
            <button onClick={ProductSearch}>Search</button>
            {products && products.map(product => <SearchetProduct key={product.id} product={product}></SearchetProduct>)}
        </div>
        </>
    )
}