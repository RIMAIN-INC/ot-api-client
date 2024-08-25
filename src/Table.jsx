import React from 'react'
import './Table.css'
import  carImg from './assets/car_img.jpg'
import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { handleDelete } from './HandleDelete';
import {handleUpdate} from './HandleUpdate';


export default function Table() {

    // const [carId, setCarId] = useState(null);
    const [cars, setCars] = useState([]);
    const navigate = useNavigate();
    // const handleDelete = HandleDelete(carId);

    useEffect( () => {
      getAllCars();
  }, []);


    const getAllCars = async() => {
        const accessToken = localStorage.getItem('accessToken');
        console.log("access: ", accessToken);
        const url= import.meta.env.VITE_ROOT_URL+"/cars"
        const options = {
            method: "GET",
            headers: {
                'Content-type': "application/json",
                'Authorization': `Bearer ${accessToken}`,
            },
        }
        fetch(url,options)
        .then(response => {
            if(!response.ok){
                alert("status code 401: unauthorized")
                navigate("/sign-in")
                throw new Error("Bad request (400)");
            }
            return response.json();
        })
        .then((data) => {
            console.log('data',data);
            setCars(data)
            
        })
        .catch(error => console.log("Could not fetch data", error))
    }

    const getForm = () => {
      navigate("/home/add-form");
    }

    const updateForm = (value) => {
      const id = value;
      console.log(id);
      localStorage.setItem("id", id);
      navigate(`/home/update-form/${id}`);
    }


    const displayValues = () => {
            return cars.map((car) => (
            <tr key={car.id} name="allRows" className="border-b border-dashed last:border-b-0">
                <td className="p-3 pl-0">
                <div className="flex items-center">
                    <div className="relative inline-block shrink-0 rounded-2xl me-3">
                    <img src={carImg} className="w-[50px] h-[50px] inline-block shrink-0 rounded-2xl" alt=""/>
                    </div>
                    <div className="flex flex-col justify-start">
                    <a href="#"  value={car.id} className="mb-1 font-semibold transition-colors duration-200 ease-in-out text-lg/normal text-secondary-inverse hover:text-primary">{car.model}</a>
                    </div>
                </div>
                </td>
                <td className="pr-0 text-start">
                <span className="font-semibold text-light-inverse text-md/normal">{car.colour}</span>
                </td>
                <td className="pr-0 text-start">
                <span className="font-semibold text-light-inverse text-md/normal">{car.type}</span>
                </td>
                <td className="pr-0 text-start">
                <span className="font-semibold text-light-inverse text-md/normal">{car.year}</span>
                </td>
                <td className="pr-0 text-start">
                <span className="font-semibold text-light-inverse text-md/normal">
                <button name="btnUpdate" onClick={updateForm.bind(null, car.id)} className="bg-tableButton text-white font-semibold py-2 px-4 rounded-md hover:bg-customSalmon transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400">Update</button></span>
                </td>
                <td className="pr-0 text-start">
                <span className="font-semibold text-light-inverse text-md/normal">
                  <button name="btnDelete"
                   onClick={handleDelete.bind(null, car.id)} 
                   className="bg-buttonHover text-white font-semibold py-2 px-4 rounded-md hover:bg-customSalmon transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                  Delete
                  </button>
                  </span>
                </td>
            </tr>
            )

            )
        }


    
  return (
    <>
    <div className="flex flex-wrap -mx-3 mb-5">
    <div className="w-full max-w-full px-3 mb-6  mx-auto">
      <div className="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-white m-5">
        <div className="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30">
          {/* <!-- card header --> */}
          <div className="px-9 pt-5 flex justify-between items-stretch flex-wrap min-h-[70px] pb-0 bg-transparent">
            <h3 className="flex flex-col items-start justify-center m-2 ml-0 font-medium text-xl/tight text-dark">
              <span className="mr-3 font-semibold text-dark">Cars - Rest API</span>
              <span className="mt-1 font-medium text-secondary-dark text-lg/normal">list of car and models</span>
            </h3>
            <div className="relative flex flex-wrap items-center my-2">
              <a href="javascript:void(0)" className="inline-block text-[.925rem] font-medium leading-normal text-center align-middle cursor-pointer rounded-2xl transition-colors duration-150 ease-in-out text-light-inverse bg-light-dark border-light shadow-none border-0 py-2 px-5 hover:bg-secondary active:bg-light focus:bg-light"> See other projects(fruits) </a>
            </div>
          </div>
          {/* <!-- end card header --> */}
          {/* <!-- card body  --> */}
          <div className="flex-auto block py-8 pt-6 px-9">
            <div className="overflow-x-auto">
              <table className="w-full my-0 align-middle text-dark border-neutral-200">
                <button name="btnForm" className="bg-customSalmon text-white font-semibold py-2 px-4 rounded-md hover:bg-customSalmon transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400" onClick={getForm}>add Car</button>
                <thead className="align-bottom">
                  <tr className="font-semibold text-[0.95rem] text-secondary-dark">
                    <th className="pb-3 text-start min-w-[175px]">Image</th>
                    <th className="pb-3 text-end min-w-[100px]">Color</th>
                    <th className="pb-3 text-end min-w-[100px]">Model</th>
                    <th className="pb-3 pr-12 text-end min-w-[100px]">Year</th>
                    <th className="pb-3 text-end min-w-[50px]">Update</th>
                    <th className="pb-3 text-end min-w-[50px]">Delete</th>
                  </tr>
                </thead>
                <tbody>
                    {displayValues()}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="flex flex-wrap -mx-3 mb-5">
    <div className="w-full max-w-full sm:w-3/4 mx-auto text-center">
      <p className="text-sm text-slate-500 py-1"> Dashboard By OrangeTech</p>
    </div>
  </div>
    
    </>

  )
}
