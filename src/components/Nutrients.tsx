/* import React from 'react' */

interface Food {
  name: string;
  fat_total_g: number;
  sodium_mg:number;
  cholesterol_mg: number;
  sugar_g: number;
  carbohydrates_total_g:number;
  fiber_g:number;
  potassium_mg:number;
}

interface Props {
  foods: Food[]
}

const Nutrients = ({foods}:Props) => {
  return (
    <>
      <div className="container d-flex justify-content-center align-items-center">
        <div className="card col-12 col-md-6">
          {foods.map((food, index) => (
              <div key={index} className="card col-md-12 col-12 m-12">
                <div className="card-header text-center">
                  <h5>{food.name.toUpperCase()}</h5>
                </div>
                <div className="card-body">
                  <p>Cholestrol: {food.cholesterol_mg} mg</p>
                  <p>Fat: {food.fat_total_g} g</p>
                  <p>Sodium: {food.sodium_mg} mg</p>
                  <p>Sugar: {food.sugar_g} g</p>
                  <p>Carbohydrates: {food.carbohydrates_total_g} g</p>
                  <p>Fiber: {food.fiber_g} g</p>
                  <p>Potassium: {food.potassium_mg} mg</p>
                </div>
              </div>
            ))}
          
        </div>
      </div>
    </>
  )
}

export default Nutrients