import React from 'react';
import { Route, Routes } from 'react-router-dom';

// import TimeLine File 
import Timeline from './Pages/Timeline';
import UpdateYourStatusForm from './Pages/UpdateYourStatusForm';
import NewProjectForm from './Pages/NewProjectForm';

const App = () => {

  return (

    <Routes>
      <Route path='/' element={<Timeline/>}/>
      <Route path='/new-project' element={<NewProjectForm/>}/>
      <Route path='/update-your-status' element={<UpdateYourStatusForm/>}/>
    </Routes>
  )
}

export default App