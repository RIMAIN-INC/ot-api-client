import React from 'react'
import {useState, useEffect} from 'react'
import {handleUpdate} from './HandleUpdate'
import NavBar from './NavBar';
import {useParams} from 'react-router-dom'

export default function UpdateForm() {
  
    const [model, setModel] = useState('');
    const [colour, setColour] = useState('');
    const [year, setYear] = useState('');
    const [type, setType] = useState('');
    const {id} = useParams()

    useEffect(() => {
        const url = import.meta.env.VITE_ROOT_URL+`/cars/${id}`;
        const accessToken = localStorage.getItem('accessToken');
        console.log(url)
        const options = {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
        }
        fetch(url,options)
        .then(response => {
            if(!response.ok){
                throw new Error("Bad Request")
            }
            return response.json();
        })
        .then(data => {
            setModel(data.model)
            setYear(data.year)
            setColour(data.colour)
            setType(data.type)
        })
    }, [id]);

    
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            "type":type,
            "model":model,
            "colour": colour,
            "year": year
        }
        const id = localStorage.getItem("id");
        console.log(id)
        handleUpdate(id,data);
    }
  
    return (
    <>
        <NavBar />
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white p-8 rounded shadow-md max-w-md w-full mx-auto">
                <h2 className="text-2xl font-semibold mb-4">Update Car</h2>

                <form  onSubmit={handleSubmit} >
                
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label for="colour" className="block text-sm font-medium text-gray-700">Colour</label>
                            <input type="text" id="colour" value={colour}  onChange={(e) => setColour(e.target.value)} name="colour" className="mt-1 p-2 w-full border rounded-md"/>
                        </div>
                        <div>
                            <label for="year" className="block text-sm font-medium text-gray-700">Year</label>
                            <input type="number" id="year" name="year" value={year}  onChange={(e) => setYear(e.target.value)}className="mt-1 p-2 w-full border rounded-md"/>
                        </div>
                    </div>

                
                    <div className="mt-4">
                        <label for="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input type="text" id="name" name="name" value={model} onChange={(e) => setModel(e.target.value)} autoComplete='none' className="mt-1 p-2 w-full border rounded-md"/>
                    </div>

                
                    <div className="mt-4">
                        <label for="model" className="block text-sm font-medium text-gray-700">model</label>
                        <input type="text" id="model" name="model"  value={type} onChange={(e) => setType(e.target.value)}className="mt-1 p-2 w-full border rounded-md"/>
                    </div>

                
                    <div className="mt-6">
                        <button type="submit" className="w-full p-3 bg-customSalmon text-white rounded-md hover:bg-customHover">Add New Car</button>
                    </div>
                </form>
            </div>
        </div>
    </>
  )
}
