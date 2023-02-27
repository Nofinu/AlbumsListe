import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { removeUser, signInAction, signUpAction } from './Component/Auth/AuthSlice';
import { ModalComponent } from './Component/Shared/ModalComponent';

function App() {

  const dispatch = useDispatch()

  const user = useSelector(state => state.auth.user)

  const passwordRef = useRef()
  const emailRef = useRef()
  const buttonref = useRef()

  const [modalStatus,setModalStatus]=useState("")
  const [isLoggin,setIsLoggin]=useState(false)

  const onSubmitFormInputHandler=async(e)=>{
    e.preventDefault()
    const credentials = {
      email:emailRef.current.value,
      password:passwordRef.current.value,
      returnSecureToken: true
    }
    if(isLoggin){
      await dispatch(signInAction(credentials))
    }
    else{
      await dispatch(signUpAction(credentials))
    }
    emailRef.current.value=""
    passwordRef.current.value=""
    setModalStatus("")
  }



  const openModalAuth=(value)=>{
    if(value === "register"){
      setModalStatus(value)
      setIsLoggin(false)
    }
    else{
      setModalStatus(value)
      setIsLoggin(true)
    }
  }

  const closeModalHandler=()=>{
    setModalStatus("")
  }

  const onclickLogOut=()=>{
    dispatch(removeUser())
  }

  return (
    <>
    {
      modalStatus && createPortal( <ModalComponent onClose={closeModalHandler}>
        <form className='FormInput' onSubmit={onSubmitFormInputHandler}>
              <div className='formInputHeader'>
                <h2>{isLoggin? "Log In" : "Register"}</h2>
                <button type='button' className="fa-sharp fa-solid fa-xmark" onClick={closeModalHandler}></button>
              </div>
              <hr />
              <label htmlFor="inputEmail">Email :</label>
              <input type="text" id="inputEmail" ref={emailRef}/>
              <label htmlFor="inputPassword">Password :</label>
              <input type="password" id="inputPassword" ref={passwordRef} />
              <div className='divButton'>
                <button ref={buttonref}>{isLoggin? "Log In" : "Register"}</button>
              </div>
            </form>
      </ModalComponent>,document.getElementById('rootModal'))
    }
    <div className="App">
      <header className="App-header">
        <nav>
          <span>eMusic</span>
          <div>
          {
            user? <button onClick={onclickLogOut}>Log Out</button>
            :
              <>
              <button onClick={()=>openModalAuth("register")}>Resgister</button>
              <button onClick={()=>openModalAuth("login")}>Log In</button>
              </>
          }
          </div>
        </nav>
      </header>
      <body>
        <div className='albumContainer'>
          <div>un Truc</div>
        </div>
      </body>
    </div>
    </>
  );
}

export default App;
