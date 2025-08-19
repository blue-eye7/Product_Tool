import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Components/Home.jsx'
import Login from './Components/Login.jsx'
import Category from './Components/Category.jsx'
import Updateproduct from './Components/Updateproduct.jsx'
import Addproduct from './Components/Addproduct.jsx'

createRoot(document.getElementById('root')).render(



  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path='login' element={<Login/>}></Route>
      <Route path='category' element={<Category/>}></Route>
      <Route path='updateproduct/:id' element={<Updateproduct/>}></Route>
      <Route path='addproducts' element={<Addproduct/>}></Route>


    </Routes>
  
  
  </BrowserRouter>
)
