import React from 'react'
import Clients from "../components/Clients";
import ClientModal from "../components/ClientModal";
import ProjectModal from "../components/ProjectModal";
import Projects from "../components/Projects";

const Home = () => {
  return (
    <>
        <div className='d-flex gap-3 mb-4'>
            <ClientModal />
            <ProjectModal />
        </div>
        <Projects />
        <hr />
        <Clients /> 
    </>
  )
}

export default Home