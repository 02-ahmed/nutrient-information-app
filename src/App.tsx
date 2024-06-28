import  {  useEffect } from 'react'
import axios, { CanceledError } from 'axios'
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
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setLoading] = useState(false)



  const API_KEY = import.meta.env.VITE_API_KEY

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true)
    axios.get<Food[]>("https://nutrition-by-api-ninjas.p.rapidapi.com/v1/nutrition", {
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': 'nutrition-by-api-ninjas.p.rapidapi.com'
      },
      params: {
        query: query
      },
      signal:controller.signal
    })
    .then((result) => {
      setFoods(result.data);
      setLoading(false)
    })
    .catch((error) => {
      if (error instanceof CanceledError) return
      setError(error.message);
      setLoading(false)
    })
    return () => controller.abort()
  }, [query])

  

  useEffect(() => {
    setHasSearched(false)
  }, [])

  return (
    <>
      <div>
        <h1 className='text-center' >Aduane-Info</h1> 
        {error && <h1 className='text-danger'>{error}</h1>}
      </div>
      {error && <p className='text-danger'>{error}</p>}
      <Search onSearch={() => {setHasSearched(true)}}  handleSearch={(data) => {setQuery(data.search)}}/>
      
      <div className="mb-2">
        {isLoading && <div className="d-flex justify-content-center vh-100">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>}
        {hasSearched && foods.length === 0 ? <h5 className='text-center'>Nothing to show</h5>:""}
        <Nutrients foods={foods}/>
      </div>
      
    </>
  )
}

export default App