import './Modal.css'

export const ModalComponent =(props)=>{

  const closeHandler=(e)=>{
    if (e.currentTarget === e.target) {
      props.onClose()
  }
}

  return(
    <div className="Modal" onClick={closeHandler}>
      <div className="ModalContent">
        {props.children}
      </div>
    </div>
  )
}