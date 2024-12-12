import React, { useEffect, useState } from 'react'

const Meal = () => {
    //2 step
    const [mealdata, setMealData] = useState([])
    const [country, setCountry] = useState('indian')
    const [inputdata, setInputData] = useState('')

    //1 step-> API SE Data fetch kiya ki cansole me usseffect ke help se -->next me data ko render karne ke liye ussestate ka use karenge
    useEffect(() => {
        const fetchDataFromAPI = async () => {
            const api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`)

            const data = await api.json()
            console.log(data.meals)

            //3 step
            //ise fetched data ko usestate ki madad se khali mealdata ko bhardenge  ab render karne ke liye map use karenge
            setMealData(data.meals)
        }
        fetchDataFromAPI()
    }, [country])

  //    for search bar search
    const submitHandler = async(e) =>{
        e.preventDefault()
        const api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputdata}`)

            const data = await api.json()
            console.log("search data = " ,data.meals)

            //3 step
            //ise fetched data ko usestate ki madad se khali mealdata ko bhardenge  ab render karne ke liye map use karenge
            setMealData(data.meals)
            setInputData('') // foe clear after submittinf
    }

    return (
        <>
            {/* searchbar */}

            <form onSubmit={submitHandler} class="max-w-md mx-auto mt-6">
                <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div class="relative">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input value={inputdata} onChange={(e)=>setInputData(e.target.value)}  type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Dishes, Food..." required />
                    <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                </div>
            </form>

            {/* filter by this */}
            <div className="my-10 mx-auto max-w-[1000px]">
                <div className="text-center font-extrabold">
                    <button
                        onClick={() => setCountry('indian')}
                        type="button"
                        className="px-4 py-2 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded mx-3"
                    >
                        Indian
                    </button>
                    <button
                        onClick={() => setCountry('canadian')}
                        type="button"
                        className="px-4 py-2 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded mx-3"
                    >
                        Canadian
                    </button>
                    <button
                        onClick={() => setCountry('american')}
                        type="button"
                        className="px-4 py-2 border border-gray-300 text-gray-300 hover:bg-gray-300 hover:text-black rounded mx-3"
                    >
                        American
                    </button>
                    <button
                        onClick={() => setCountry('thai')}
                        type="button"
                        className="px-4 py-2 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white rounded mx-3"
                    >
                        Thai
                    </button>
                    <button
                        onClick={() => setCountry('british')}
                        type="button"
                        className="px-4 py-2 border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black rounded mx-3"
                    >
                        British
                    </button>
                    <button
                        onClick={() => setCountry('russian')}
                        type="button"
                        className="px-4 py-2 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white rounded mx-3"
                    >
                        Russian
                    </button>
                </div>
            </div>


            {/* all */}

            <div className="flex flex-wrap justify-center gap-8">
                {mealdata.map((data) => (
                    <div
                        key={data.idMeal}
                        className="w-[250px] p-4 text-center"
                    >
                        {/* Image */}
                        <div className="flex justify-center">
                            <img
                                src={data.strMealThumb}
                                alt={data.strMeal}
                                className="w-[250px] h-[300px] rounded-xl border-2 border-blue-500"
                            />

                        </div>
                        <h3 className="mt-4 font-bold text-lg">{data.strMeal}</h3>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Meal