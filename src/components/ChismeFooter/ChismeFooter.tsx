"use client";
import React from 'react'
//importaremos los iconos de linkedin, github, code, y docs desde react-icons
import { FaLinkedin, FaGithub, FaCode, FaBook } from 'react-icons/fa';
import { mainAppTitle } from '../dataEnv';

const ChismeFooter = () => {
  return (
    <div className='bg-light py-3'>
      <div className="botones d-flex justify-content-center align-items-center gap-3 my-3">
        <a href="https://www.linkedin.com/in/ramiro-ocampo-5a661b1a7/" target="_blank" className='btn btn-outline-secondary'><FaLinkedin /></a>
        <a href="https://github.com/ROR2022" target="_blank" className='btn btn-outline-secondary'><FaGithub /></a>
        <a href="https://github.com/ROR2022/" target="_blank" className='btn btn-outline-secondary'><FaCode /></a>
        <a href="https://docs.google.com/document/d/104ek8dOTdOU6RcDMtGT-g1T--FWxq2earIDvMZoQ79E/edit?usp=sharing" target="_blank" className='btn btn-outline-secondary'><FaBook /></a>
      </div>
      <div className="firma text-center my-3">
        <p>© 2024 {mainAppTitle}. All rights reserved.</p>
      </div>
      </div>
  )
}

export default ChismeFooter