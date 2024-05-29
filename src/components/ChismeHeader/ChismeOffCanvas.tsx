"use client"
//import  { use } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Nav, NavDropdown } from 'react-bootstrap';
import { mainAppTitle } from '../dataEnv';
import logoChisme from '@/app/logoChisme.jpg';
import Image from 'next/image';
import { useContext } from 'react';
import { MyContext } from '@/context/MyContext';
import { useState, useEffect, FC } from 'react';
import { useRouter } from 'next/navigation';
import ChismeFooter from '@/components/ChismeFooter/ChismeFooter';


interface ChismeOffCanvasType {
  showOffCanvas: boolean;
  handleCloseOffCanvas: ()=>any;
}

const ChismeOffCanvas: FC<ChismeOffCanvasType> = ({ showOffCanvas, handleCloseOffCanvas }) => {
  const { dataLocalStorage } = useContext(MyContext);
  const [mainTitle, setMainTitle] = useState(mainAppTitle);
  const [mainImage, setMainImage] = useState<string>(logoChisme.src || '');
  const router = useRouter();
  useEffect(() => {
    if (dataLocalStorage.email !== '') {
      setMainImage(dataLocalStorage.imageUrl);
      setMainTitle(`${dataLocalStorage.name} ${dataLocalStorage.lastName}`);
    }
  }, [dataLocalStorage]);

  const goPublish = () => {
    handleCloseOffCanvas();
    router.push('/publicar');

  }


  return (
    <Offcanvas show={showOffCanvas} onHide={handleCloseOffCanvas} responsive="lg">
      <Offcanvas.Header closeButton>
        <Nav.Link href='/'>
          <Offcanvas.Title>
            <img src={mainImage} alt="Logo" width="30" height="30" className="d-inline-block align-top rounded me-2" />
            {mainTitle}
          </Offcanvas.Title>
        </Nav.Link>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Nav className="d-flex flex-column gap-4">
          {dataLocalStorage.email !== '' &&
            <Nav.Link href='/publicar' className='btn btn-outline-secondary border border-2 rounded p-2 w-100'>
              Publish</Nav.Link>
          }

          <NavDropdown title="Sign" id="basic-nav-dropdown" className='btn btn-outline-secondary w-100'>
            {dataLocalStorage.email === '' ?
              <>
                <NavDropdown.Item href="/signin" >Sign In</NavDropdown.Item>
                <NavDropdown.Item href="/signup" >Sign Up</NavDropdown.Item>
              </>
              :
              <NavDropdown.Item href="/signout" >Sign Out</NavDropdown.Item>
            }
          </NavDropdown>
        </Nav>
        <div className='mt-5'>
        <ChismeFooter />
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  )
}



export default ChismeOffCanvas