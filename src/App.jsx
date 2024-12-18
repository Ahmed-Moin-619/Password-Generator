import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [length, setlength] = useState(6)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  //useRef Hooks
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) {
      str += "0123456789"
    }
    if (charAllowed) {
      str += "!@#$%^&*-_+=[]{}~`"
    }
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipBoard = useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 100)
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    passwordGenerator()
  },[length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <>
      <section className="password-gen">
        <div className="generator">
          <h1 className='text-center mb-3 text-light'>Password Generator</h1>
          <div className="input input-group">
            <input type="text" className="form-control" placeholder="Password"
              value={password}
              ref={passwordRef}
            />
            <button className='btn btn-primary'
            onClick={copyPasswordToClipBoard}
            >Copy</button>
          </div>

          <div className="bottom mt-3">
            <div className="length me-3">
              <input type="range" min={6} max={100} value={length}
                onChange={(e) => setlength(e.target.value)}
                className='me-3'
              />
              <label className='text-light'>Length : {length}</label>
            </div>

            <div className="checkbox me-3">
              <input type="checkbox" className='me-2' defaultChecked={numberAllowed}
                id='numberInput'
                onChange={(e) => {
                  setNumberAllowed((prev) => !prev)
                }}
        
              />
              <label className='text-light'> Numbers</label>
            </div>

            <div className="character">
              <input type="checkbox" className='me-2' defaultChecked={charAllowed}
                id='characterInput'
                onChange={(e) => {
                  setCharAllowed((prev) => !prev)
                }}
              />
              <label className='text-light'> Character</label>
            </div>
          </div>


        </div>
      </section>
    </>
  )
}

export default App
