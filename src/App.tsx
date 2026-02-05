import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TransactionForm from './components/TransactionForm'

function App() {

  return (
    <>
      <h1 className="text-3xl font-bold underline">
        Mock Transaction
      </h1>
      <TransactionForm />
    </>
  )
}

export default App
