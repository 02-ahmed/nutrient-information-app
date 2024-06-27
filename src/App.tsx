import  {  useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import Search from './components/Search'
import Nutrients from './components/Nutrients';
import './App.css';


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
  const [query, setQuery] = useState('');


  const API_KEY = import.meta.env.VITE_API_KEY

  useEffect(() => {
    axios.get<Food[]>("https://nutrition-by-api-ninjas.p.rapidapi.com/v1/nutrition", {
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': 'nutrition-by-api-ninjas.p.rapidapi.com'
      },
      params: {
        query: query
      }
    })
    .then((result) => setFoods(result.data))
    .catch((error) => setError(error.message))
  }, [query])

  useEffect(() => {
    console.log(API_KEY)
  });

  const foodDisplayed:Food[] = foods.length > 0? foods: [{name:"No food found", fat_total_g: 0, sodium_mg:0,
    cholesterol_mg: 0,
    sugar_g:0,
    carbohydrates_total_g:0,
    fiber_g:0,
    potassium_mg:0 }]

  return (
    <>
      <div>
        <h1 className='text-center' >Aduane-Info</h1> 
        {error && <h1 className='text-danger'>{error}</h1>}
      </div>
      {error && <p className='text-danger'>{error}</p>}
      <Search  handleSearch={(data) => {setQuery(data.search)}}/>
      <div className="mb-2">
        <Nutrients foods={foodDisplayed}/>
      </div>
      
    </>
  )
}

export default App