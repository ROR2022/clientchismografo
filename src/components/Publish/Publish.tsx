"use client"

/** 
 * Crearemos un formulario con formik y yup para validar los campos, debe tener los siguientes campos:
 * - title
 * - description
 * - image
 */

import {useState, useEffect} from 'react'
import { Col, Form, Row, Button, InputGroup, Spinner } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import UploadImage from '../UploadImage/UploadImage';
import { FaRegUserCircle } from "react-icons/fa";
//import Image from 'next/image';
import { useRouter } from 'next/navigation';
import MainModal from '../MainModal/MainModal';
import { Nav } from 'react-bootstrap';
import { createChisme } from '@/api/apiChismes';
import { useContext } from 'react';
import { MyContext } from '@/context/MyContext';


const initDataChisme={
    title: '',
    description: '',
}


const Publish = () => {
    const [showModal, setShowModal] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [imageUser, setImageUser] = useState(null);
    const router = useRouter();
    const {dataLocalStorage} = useContext(MyContext);
    //console.log('dataLocalStorage:..',dataLocalStorage);

    const schema = yup.object().shape({
        title: yup.string().required('El titulo es requerido'),
        description: yup.string().required('La descripcion es requerida'),
    });

    const handlePublish = async (values:any) => {
        //console.log(values);
        //return;
        try{
        setLoading(true);
        // Aqui se debe hacer la peticion POST al backend
        let dataChisme = null;
        if(imageUser){
            dataChisme = new FormData();
            dataChisme.append('title', values.title);
            dataChisme.append('description', values.description);
            dataChisme.append('file', imageUser);
            dataChisme.append('author', dataLocalStorage.tokenChismoso);
        }else{
            dataChisme = {
                title: values.title,
                description: values.description,
                author: dataLocalStorage.tokenChismoso
            }
        }
        const responseCreateChisme = await createChisme(dataChisme)
        //console.log('response createChisme:..',responseCreateChisme);
        if(responseCreateChisme._id){
        setLoading(false);
            setSuccess(true);
            setShowModal(true);
        setTimeout(() => {
            console.log('Redirecting to home');
            router.push('/');
        }, 2000);
    }else{
        setLoading(false);
        setSuccess(false);
        setShowModal(true);
        console.log('Error creating chisme');
    }
    }catch(error){
        console.log(error);
        setLoading(false);
    }
    }



  return (
    <div>
        <h1 className='text-center'>PUBLISH</h1>
            <div className='card me-auto ms-auto py-2 px-4 mb-3 w-75'>
                {!imageUser && 
                <div className='d-flex flex-column justify-content-center align-items-center gap-2'>
                <FaRegUserCircle className='text-center' style={{fontSize: '200px'}}/>
                <p className='text-center'>Please upload an image</p>
                </div>
                }
                
                <div className='ms-auto me-auto d-block'>
                    <UploadImage setDataImg={setImageUser} />
                </div>
                <Formik
                    validationSchema={schema}
                    onSubmit={handlePublish}
                    initialValues={initDataChisme}
                >
                    {({ handleSubmit, handleChange, values, touched, errors }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="6" controlId="validationFormik01">
                                    <Form.Label>Title:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="title"
                                        value={values.title}
                                        onChange={handleChange}
                                        isValid={touched.title && !errors.title}
                                        isInvalid={!!errors.title}
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        {errors.title}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="6" controlId="validationFormik02">
                                    <Form.Label>Description:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="description"
                                        value={values.description}
                                        onChange={handleChange}
                                        isValid={touched.description && !errors.description}
                                        isInvalid={!!errors.description}
                                    />

                                    <Form.Control.Feedback type='invalid'>
                                        {errors.description}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                </Row>
                                <div className='d-flex justify-content-between my-3'>
                                <Button type="submit" variant='outline-success'>
                                    {loading && <Spinner animation="border" role="status" size="sm" />}
                                    {!loading && <span>Publish</span>}
                                </Button>
                                <Nav.Link href="/">
                                    <Button type="button" className='btn btn-light'>cancel Publish?</Button>
                                </Nav.Link>
                            </div>
                        </Form>
                        )}
                        </Formik>
                        </div>
            {showModal && success && <MainModal dataModal={{ showModal, setShowModal, title: 'Success', text: 'User Registered Successfully', severity: 'success' }} />}
            {showModal && !success && <MainModal dataModal={{ showModal, setShowModal, title: 'Error', text: 'User Registration Failed', severity: 'danger' }} />}
        
    </div>
  )
}

export default Publish