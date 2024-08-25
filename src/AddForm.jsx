import React from 'react'
import NavBar from './NavBar'
import {useState} from 'react'
import {createToast} from './Toast'


export default function addForm() {

    const [model, setModel] = useState('');
    const [colour, setColour] = useState('');
    const [type, setType] = useState('');
    const [year, setYear] = useState('');

    const accessToken = localStorage.getItem('accessToken');
    
    const handleForm = async(data) => {
        const url = import.meta.env.VITE_ROOT_URL + "/cars";
        const options = {
            method: "POST",
            headers: {
                "Content-type": "Application/json",
                "Authorization": `Bearer ${accessToken}`,
            },
            body: JSON.stringify(data, ["type", "model", "colour", "year"])
        }

        fetch(url,options)
        .then(response => {
            if(!response.ok){
                throw new Error("Internal Server Error");
            }
            return response.json();
        }).then(() => {
            createToast('Submit');
        }).catch(error => console.log("Could not post", error))
        
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        const data = {
            "type": type,
            "model": model,
            "colour": colour,
            "year":year
        }
        console.log(data);
        await handleForm(data);
    }

  return (
    <>
    <NavBar />

    <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white p-8 rounded shadow-md max-w-md w-full mx-auto">
            <h2 className="text-2xl font-semibold mb-4">add Car</h2>

            <form  onSubmit={handleSubmit} >
            
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label for="colour" className="block text-sm font-medium text-gray-700">Colour</label>
                        <input type="text" id="colour" value={colour}  onChange={(e) => setColour(e.target.value)} name="colour" className="mt-1 p-2 w-full border rounded-md"/>
                    </div>
                    <div>
                        <label for="year" className="block text-sm font-medium text-gray-700">Year</label>
                        <input type="number"  id="year" name="year" value={year}  onChange={(e) => setYear(e.target.value)}className="mt-1 p-2 w-full border rounded-md"/>
                    </div>
                </div>

            
                <div className="mt-4">
                    <label for="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input type="text" id="name"  name="name" value={model} onChange={(e) => setModel(e.target.value)} autoComplete='none' className="mt-1 p-2 w-full border rounded-md"/>
                </div>

            
                <div className="mt-4">
                    <label for="model" className="block text-sm font-medium text-gray-700">model</label>
                    <input type="text" id="model" name="model"  value={type} onChange={(e) => setType(e.target.value)}className="mt-1 p-2 w-full border rounded-md"/>
                </div>

            
                <div className="mt-6">
                    <button type="submit" name="btnSet" className="w-full p-3 bg-customSalmon text-white rounded-md hover:bg-customHover">Add New Car</button>
                </div>
            </form>
        </div>
    </div>
    </>

  )
}
