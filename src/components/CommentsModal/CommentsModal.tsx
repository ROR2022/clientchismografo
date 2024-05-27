"use client";
import {useState, FC} from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useContext } from 'react';
import { MyContext } from '@/context/MyContext';
//importaremos el icono de enviar comentario
import { FaPaperPlane } from 'react-icons/fa';
import { createComment } from '@/api/apiComments';
import Image from 'next/image';

interface CommentsModalType {
  showModal:boolean;
  setShowModal: (showModal:boolean)=>void;
  comments: Array<any>;
  idChisme: string;
  getAllChismes: ()=>any;
}



const CommentsModal: FC<CommentsModalType> = ({showModal,setShowModal, comments, idChisme, getAllChismes}) => {
  
    const [newComment, setNewComment] = useState('');
    const {dataLocalStorage} = useContext(MyContext);
    const {name, lastName, imageUrl} = dataLocalStorage;

    const handleClose = () => setShowModal(false);
    
    /* if(comments.length>0){
    console.log('comments:..',comments)
    } */

    const handleMakeComment= async ()=>{
      try {
        const dataComment = {
          author: dataLocalStorage._id,
          chisme: idChisme,
          comment: newComment
        }
        const result = await createComment(dataComment);
        console.log('resultMakeComment:...',result)
        if (result) {
          setNewComment('');
          //setShowModal(false);
          getAllChismes();
        }
      } catch (error) {
        console.log('Error al crear comentario:..',error)
      }
    }
  return (
    <div
      className="modal show"
      style={{ display: 'block' }}
    >
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title >
            <div className='my-2'>
              <img src={imageUrl} alt={name} style={{width: '50px', height: '50px', borderRadius: '50%'}} />
              <span className='ms-3'>{name} {lastName}</span>
            </div>
            <div className='d-flex justify-content-center align-items-center gap-2'>
            <input type="text" className='form-control' 
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder='Escribe un comentario...'
            />
            <button className='btn btn-primary mt-2' onClick={handleMakeComment} disabled={newComment===''}>
              <FaPaperPlane/>
            </button>
            </div>
            </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {comments.length===0 && <p className='alert alert-danger text-center'>No hay comentarios</p>}
          {comments.length>0 && comments.map((comment:any)=>(
            <div key={comment._id} className='alert alert-light d-flex justify-content-start align-items-center gap-2'>
              <img src={comment.author.imageUrl} alt={comment.author.name} style={{width: '50px', height: '50px', borderRadius: '50%'}} />
              <div className='d-flex flex-column gap-2'>
              <div className='fs-5 fw-bold'>{comment.author.name} {comment.author.lastName}</div>
              <div>{comment.comment}</div>
              </div>
              
            </div>
          ))
            }
        </Modal.Body>

        {/* <Modal.Footer>
          <Button type='button' onClick={handleClose} variant="secondary">Close</Button>
        </Modal.Footer> */}
      </Modal>
    </div>
  )
}

export default CommentsModal