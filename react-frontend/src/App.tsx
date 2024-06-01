import { useState } from 'react'
import './App.css'
import Button from './components/Button'
import Model from './components/Model';

function App() {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(!open);

  return (
    <>
      <Button text="Open Tasks" handleToggle={toggle} />
      {open && <Model handleToggle={toggle} />}
    </>
  )
}

export default App
