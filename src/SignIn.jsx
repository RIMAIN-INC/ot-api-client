import React from 'react'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'



export default function SignIn() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    const signUserIn = async(data) => {
        const url = import.meta.env.VITE_ROOT_URL +"/secured/sign-in";
        const options = {
            method: "POST",
            headers: {
                "Content-type": "Application/json",
            },
            body: JSON.stringify(data)
        }
        fetch(url,options)
        .then(response => {
            if(!response.ok){
                console.log(response.status)
                alert("Wrong email or password");
                throw new Error("Login unsuccessful");
            }
            return response.json();
        }).then((data) => {
            const accessToken = data.accessToken;
            localStorage.setItem("accessToken", accessToken);
            
            Cookies.set('accessToken',accessToken, {secure:true, sameSite: 'strict'} );
            const token = Cookies.get('accessToken');

            console.log(token);
        }).then(() => navigate("/home"))
         .catch(error => console.log("Fetch problem", error));
    
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(email,password);
        const data = {
            "email": email,
            "password": password,
        };
        await signUserIn(data);
        
    }


  return (
    <>
        <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
        <h1 className="text-4xl font-medium"></h1>
        <p className="text-slate-500">Hi, Welcome back 👋</p>

        <form action=""  onSubmit={handleSubmit} className="my-10">
            <div className="flex flex-col space-y-5">
                <label for="email">
                    <p className="font-medium text-slate-700 pb-2">Email address</p>
                    <input id="email"   value={email} onChange={(e) => setEmail(e.target.value)} name="email" type="email" className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Enter email address"/>
                </label>
                <label for="password">
                    <p className="font-medium text-slate-700 pb-2">Password</p>
                    <input id="password"  value={password} onChange={(e) => setPassword(e.target.value)} name="password" type="password" className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Enter your password"/>
                </label>
                <button name="btnLogin" className="w-full py-3 font-medium text-white bg-customSalmon hover:bg-customHover rounded-lg border-customSalmon hover:shadow inline-flex space-x-2 items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    <span>login</span>
                </button>
                <p className="text-center">Not registered yet? <a  onClick={() => navigate("/")} className="text-indigo-600 font-medium inline-flex space-x-1 items-center"><span>Register now </span><span><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg></span></a></p>
            </div>
        </form>
        </div>
    </>
  )
}
