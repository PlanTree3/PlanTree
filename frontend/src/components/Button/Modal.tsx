import React from 'react'
import './Modal.css'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  content: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, content }) => {
  if (!isOpen) {
    return null
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}></button>
        {content}
      </div>
    </div>
  )
}

export default Modal
