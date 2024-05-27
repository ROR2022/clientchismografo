"use client";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {useState,useEffect} from 'react';
import { getOneChismoso } from '@/api/apiChismosos';
import Image from 'next/image';
//importar los iconos para likes y comentarios
import { AiFillLike } from 'react-icons/ai';
import { FaComment } from 'react-icons/fa';
//importar los iconos para likes y comentarios azules
import { useContext } from 'react';
import { MyContext } from '@/context/MyContext'
import { createLike, deleteLike} from '@/api/apiLikes'
import CommentsModal from '../CommentsModal/CommentsModal';



const initDataChismoso={
  name:'',
  lastName:'',
  email:'',
  imageUrl:''
}

const CardChisme = ({dataChisme, getAllChismes}) => {
    const {title, description, imageUrl, author, likes, comments} = dataChisme
    const [chismoso, setChismoso] = useState(author||initDataChismoso)
    const [nameChismoso, setNameChismoso] = useState(``)
    const [imageUrlChismoso, setImageUrlChismoso] = useState('')
    const [isLiked, setIsLiked]= useState('');
    const {dataLocalStorage}= useContext(MyContext);
    const [toggleLike, setToggleLike]= useState(false);
    const [toggleComments, setToggleComments]= useState(false);

    if(likes.length>0){
      //console.log('likes:..',likes)
      
    }
    

    useEffect(() => {
      //getDataChismoso(author);
      checkIsLiked();
    }, []);

    useEffect(()=>{
        //console.log('toggleLike',toggleLike)
        getAllChismes()
          
    },[toggleLike])

    useEffect(()=>{
        checkIsLiked()     
    },[likes.length])

    useEffect(()=>{
      //console.log('isLiked(useEffect):..', isLiked)
    },[isLiked])

    useEffect(() => {
      if(chismoso.name!==''){
        //console.log('chismoso:..',chismoso)
      setNameChismoso(`${chismoso.name} ${chismoso.lastName}`);
      setImageUrlChismoso(chismoso.imageUrl);
      }
    }, [chismoso]);

    const checkIsLiked = ()=>{
      const findUserInLikes = likes.find(like=>String(like.author)===String(dataLocalStorage._id))
      //console.log('findUserInLikes:..',findUserInLikes)
      if(findUserInLikes){
        const tempId= String(findUserInLikes._id);
        console.log('isLiked(checkIsLiked):..',tempId)
        setIsLiked(tempId)
        setToggleLike(true)
      }else{
        setIsLiked('')
        setToggleLike(false)
      }
    }

    const getDataChismoso = async (id) => {
      try {
        //console.log('id:..',id)
        // el id debe tener un formato de ObjectId de mongo
        // por ejemplo: 60f3b3b3b3b3b3b3b3b3b3b3
        const regex = /^[0-9a-fA-F]{24}$/;
        if(!regex.test(id)) return;
        const response = await getOneChismoso(id);
        //console.log('response:..',response)
        if(response){
          //console.log('response:..',response);
        setChismoso(response);
        }
        else
        setChismoso(initDataChismoso);
      } catch (error) {
        console.error(error);
      }
    }

    const handleLike = async()=>{
      //console.log('Handle Like:...')
      const dataLike={
        author:dataLocalStorage._id,
        chisme:dataChisme._id,
      }
      
      try {
        let response=null;
        console.log('isLiked(handleLike):..',isLiked)
        if(toggleLike===false){
          console.log('createLike:..')
          response = await createLike(dataLike)
          setToggleLike(true);
        }else{
          console.log('deleteLike:..')
          response = await deleteLike(isLiked)
          setIsLiked('')
          setToggleLike(false);
        }
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }

    const handleComment = ()=>{
      console.log('Haciendo un comentario')
      setToggleComments(true)
    }

  return (
    <Card style={{ width: '18rem', 'minHeight': '300px' }}>
      {imageUrlChismoso!=='' && nameChismoso!=='' &&
      <Card.Footer>
      <small className="text-muted d-flex justify-content-start align-items-center gap-2">
        <img className='rounded-circle' src={imageUrlChismoso} alt={imageUrlChismoso} width={30} height={30} />
         {nameChismoso}
        </small>
  </Card.Footer>
      }
      <Card.Img variant="top" src={imageUrl} alt={imageUrl} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {description}
        </Card.Text>
        {/* <Button variant="primary">Go somewhere</Button> */}
      </Card.Body>
      {toggleComments===true &&
      <CommentsModal 
      getAllChismes={getAllChismes}
      idChisme={dataChisme._id} 
      comments={comments} 
      setShowModal={setToggleComments} 
      showModal={toggleComments}  />
      }
      
      {dataLocalStorage.email!==''&&
      <div className='border rounded d-flex justify-content-around align-items-center gap-5 p-2'>
        <div className='d-flex justify-content-center align-items-center gap-1'>
        <AiFillLike onClick={handleLike} size={30} style={{color:toggleLike===false?'':'blue', cursor:'pointer'}} />
        <span>{likes?.length || 0}</span>
        </div>
        <div className='d-flex justify-content-center align-items-center gap-1'>

        <FaComment onClick={handleComment} size={30} style={{color: (comments.length>0)?'blue':'', cursor:'pointer'}} />
        <span>{comments?.length || 0}</span>
        </div>
      </div>
      }
      
      
        
    </Card>
  )
}

export default CardChisme