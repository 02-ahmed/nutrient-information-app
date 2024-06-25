import  { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import Search from './components/Search'
import Nutrients from './components/Nutrients';
import './App.css'

interface Food {
  name: string;
  fat_total_g: number;
  sodium_mg:number;
  cholesterol_mg: number;
  sugar_g:number;
  carbohydrates_total_g:number;
  fiber_g:number;
  potassium_mg:number;
}


const App = () => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('')

  useEffect(() => {
    axios.get<Food[]>("https://nutrition-by-api-ninjas.p.rapidapi.com/v1/nutrition", {
      headers: {
        'x-rapidapi-key':'***REMOVED***',
        'x-rapidapi-host': 'nutrition-by-api-ninjas.p.rapidapi.com'
      },
      params: {
        query: query
      }
    })
    .then((result) => setFoods(result.data))
    .catch((error) => setError(error.message))
  }, [query])

  return (
    <>
      <div>
        <h1 className='text-center'>Nutrient Information</h1> 
      </div>
      {error && <p className='text-danger'>{error}</p>}
      <Search  handleSearch={(data) => {setQuery(data.search)}}/>
      <Nutrients foods={foods}/>
    </>
  )
}

export default App