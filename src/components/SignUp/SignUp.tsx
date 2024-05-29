"use client";

import { useState } from 'react'
import { Col, Form, Row, Button, InputGroup, Spinner } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import { registerChismoso } from '@/api/apiChismosos';
import MainModal from '../MainModal/MainModal';
import { Nav } from 'react-bootstrap';
import UploadImage from '@/components/UploadImage/UploadImage';
import { FaRegUserCircle } from "react-icons/fa";
//import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { MyContext } from '@/context/MyContext';

const initDataFormUser = {
    email: "",
    password: "",
    repeatedPassword: "",
    name: "",
    lastName: "",
    tyc: false,
};

const SignUp = () => {
    //const { Formik } = formik;
    const [showModal, setShowModal] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [imageUser, setImageUser] = useState(null);
    const router = useRouter();
    const { dataLocalStorage, setDataLocalStorage } = useContext(MyContext);

    const schema = yup.object().shape({
        name: yup.string().required(),
        lastName: yup.string().required(),
        email: yup.string().email("Correo Invalido").required().matches(
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
            "Invalid Email Format"
        ),
        password: yup.string().required().min(8).matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{8,})/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character !@#%&"
        ),
        repeatedPassword: yup.string().required("is required").oneOf([yup.ref('password')], 'Passwords must match'),
        tyc: yup.bool().required().oneOf([true], 'T&C must be accepted'),
    });
    const handleSignup = async (values: any) => {
        const { repeatedPassword,tyc, ...chismosoValues } = values;
        //console.log(chismosoValues);
        //return;
        try {
            setLoading(true);
            let dataSignup= null;
            if(imageUser){
                dataSignup = new FormData();
                dataSignup.append('file', imageUser);
                for (const key in chismosoValues) {
                    dataSignup.append(key, chismosoValues[key]);
                }
            }else{
                dataSignup = chismosoValues;
            }
            const result = await registerChismoso(dataSignup);
            //console.log(result);
            
            if (result?.tokenChismoso) {
                setSuccess(true);
                setShowModal(true);
                setDataLocalStorage(result);
                setTimeout(() => {
                    router.push('/');
                }, 2000);
            }
            else {
                setSuccess(false);
                setShowModal(true);
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            setSuccess(false);
            setShowModal(true);
            setLoading(false);
        }
    }
    return (
        <div>
            <h1 className='text-center'>SIGN UP</h1>
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
                    onSubmit={handleSignup}
                    initialValues={initDataFormUser}
                >
                    {({ handleSubmit, handleChange, values, touched, errors }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="4" controlId="validationFormik01">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={values.name}
                                        onChange={handleChange}
                                        isValid={touched.name && !errors.name}
                                        isInvalid={!!errors.name}
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        {errors.name}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="4" controlId="validationFormik02">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="lastName"
                                        value={values.lastName}
                                        onChange={handleChange}
                                        isValid={touched.lastName && !errors.lastName}
                                        isInvalid={!!errors.lastName}
                                    />

                                    <Form.Control.Feedback type='invalid'>
                                        {errors.lastName}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="4" controlId="validationFormikUsername">
                                    <Form.Label>Email</Form.Label>
                                    <InputGroup hasValidation>
                                        <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                        <Form.Control
                                            type="email"
                                            placeholder="Email"
                                            aria-describedby="inputGroupPrepend"
                                            name="email"
                                            value={values.email}
                                            onChange={handleChange}
                                            isValid={touched.email && !errors.email}
                                            isInvalid={!!errors.email}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.email}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="6" controlId="validationFormik08">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        name="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        isValid={touched.password && !errors.password}
                                        isInvalid={!!errors.password}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.password}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="6" controlId="validationFormik09">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Confirm Password"
                                        name="repeatedPassword"
                                        value={values.repeatedPassword}
                                        onChange={handleChange}
                                        isValid={touched.repeatedPassword && !errors.repeatedPassword}
                                        isInvalid={!!errors.repeatedPassword}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.repeatedPassword}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>



                            <Form.Group className="mb-3">
                                <Form.Check
                                    required
                                    name="tyc"
                                    label="Agree to terms and conditions"
                                    onChange={handleChange}
                                    isValid={touched.tyc && !errors.tyc}
                                    isInvalid={!!errors.tyc}
                                    feedback={errors.tyc}
                                    feedbackType="invalid"
                                    id="validationFormik0"
                                />
                            </Form.Group>
                            <Form.Control.Feedback type="invalid">
                                {errors.tyc}
                            </Form.Control.Feedback>

                            <div className='d-flex flex-column align-items-center gap-2 my-3'>
                                <Button type="submit" variant='outline-success'>
                                    {loading && <Spinner animation="border" role="status" size="sm" />}
                                    {!loading && <span>Sign Up</span>}
                                </Button>
                                <Nav.Link href="/signin">
                                    <Button type="button" className='btn btn-light'>Already Registered?</Button>
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

export default SignUp