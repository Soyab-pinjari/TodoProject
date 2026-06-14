import { useState } from 'react'
import Todo from './components/Todo'
import { Route, Routes } from 'react-router'
import Login from './Forms/Login'
import Registration from './Forms/Registration'



function App() {

  return (
    <>
  
  <Routes>
    <Route path='/' element={<Login/>}></Route>
     <Route path='/login' element={<Login/>}></Route>
      <Route path='/register' element={<Registration/>}></Route>
      <Route path='/todo' element={<Todo/>}></Route>
  </Routes>
  
    </>
  )
}

export default App
