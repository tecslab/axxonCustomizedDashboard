import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  useEffect(()=>{
    navigate("/dashboard/leads");
  },[])

  return (
    <>
    </>
  )
}

export default App