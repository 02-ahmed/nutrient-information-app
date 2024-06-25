/* import React from 'react'; */
import {z} from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm} from 'react-hook-form'

interface Props {
  /* query:(e:React.ChangeEvent<HTMLInputElement>) => void; */
  handleSearch: (data:SearchFormData) => void;
};

const schema = z.object({
  search: z.string().min(3, {message:'Search must be at least 3 characters'})
})

type SearchFormData = z.infer<typeof schema>

const Search = ({ handleSearch}:Props) => {
  const {register, handleSubmit, formState:{errors, isValid}} = useForm<SearchFormData>({resolver:zodResolver(schema)});

  /* const onSubmit = (data: FieldValues) => {
    console.log(data);
    handleSearch
  } */
  return (
    <>
      <form onSubmit={handleSubmit((data) => {
        handleSearch(data)
      })}>
        <div className='container mb-3 mt-5'>
          <div className='row justify-content-center'>
            <div className="col-md-6">
            <label htmlFor="search" className='form-label'>Search for any food and receive nutritional values</label>
              <div className="d-flex align-items-center">
                <input {...register('search')} type="text" id="search" className='form-control'/>
                <button className='btn btn-primary ms-2' disabled={!isValid}>Search</button>
              </div>
              {errors.search && <p className='text-danger'>Must be 3 characters or more</p>}
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default Search