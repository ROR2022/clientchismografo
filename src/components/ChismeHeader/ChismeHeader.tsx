"use client";
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { mainAppTitle } from '../dataEnv';
import ChismeOffCanvas from './ChismeOffCanvas';
import { use, useEffect, useState } from 'react';
import logoChisme from '@/app/logoChisme.jpg';
import Image from 'next/image';
import { useContext } from 'react';
import { MyContext } from '@/context/MyContext';
import { useRouter } from 'next/navigation';
import { useMediaQuery } from "react-responsive";
import InstallButton from '../InstallButton/InstallButton';


/* import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown'; */

const ChismeHeader = () => {
  const [showOffCanvas, setShowOffCanvas] = useState(false);
  const { dataLocalStorage, initDataChismoso } = useContext(MyContext);
  const [dataChismoso, setDataChismoso] = useState(dataLocalStorage || {});
  const [mainImage, setMainImage] = useState<string>(logoChisme.src || '');
  const [mainTitle, setMainTitle] = useState(mainAppTitle);
const router= useRouter();
const isDesktop = useMediaQuery({
  query: "(min-width: 992px)",
});

  useEffect(() => {
    //console.log('dataLocalStorage:..',dataLocalStorage)
    if (!dataChismoso.email && dataLocalStorage.email !== ''){
      setDataChismoso(dataLocalStorage);
    }    
    
    if(dataChismoso.email&& dataLocalStorage.email===''){
      setDataChismoso(initDataChismoso)
    }
  }, [dataLocalStorage]);

  useEffect(() => {
    if (dataChismoso.email !== '') {
      //console.log('dataChismoso:...');
      setMainImage(dataChismoso.imageUrl);
      setMainTitle(`${dataChismoso.name} ${dataChismoso.lastName}`);
    }
  }, [dataChismoso]);

  useEffect(()=>{
    //console.log('showOffCanvas:..',showOffCanvas);

  },[showOffCanvas])

  const goPublish = ()=>{
    router.push('/publicar');
  }
 const handleCloseOffCanvas= ()=>{
  setShowOffCanvas(false);
  console.log('Ocultar OffCanvas...')
 }
 const handleShowOffCanvas = () =>{
  setShowOffCanvas(true);
  console.log('Mostrar OffCanvas...')
 }
  return (
    <Navbar expand="lg" className="bg-light">
      <Container>
        <Navbar.Brand href="/">
          <img src={mainImage} alt="Logo" width="30" height="30" 
          className="d-inline-block align-top rounded me-2" />
          {mainTitle}
        </Navbar.Brand>
        <InstallButton />
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleShowOffCanvas} />
        {!showOffCanvas&&isDesktop &&
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="d-flex justify-content-end align-items-center gap-3 w-100">

              {dataChismoso&& dataChismoso.email!==''&&

              <Nav.Link href='/publicar'>Publish</Nav.Link>
              }
              
              <NavDropdown title="Sign" id="basic-nav-dropdown">
                {dataChismoso.email === '' ?
                  <>
                    <NavDropdown.Item href="/signin" >Sign In</NavDropdown.Item>
                    <NavDropdown.Item href="/signup" >Sign Up</NavDropdown.Item>
                  </>
                  :
                  <NavDropdown.Item href="/signout" >Sign Out</NavDropdown.Item>
                }
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        }
        {showOffCanvas &&
          <ChismeOffCanvas showOffCanvas={showOffCanvas} handleCloseOffCanvas={handleCloseOffCanvas} />
        }

      </Container>
    </Navbar>
  )
}

export default ChismeHeader