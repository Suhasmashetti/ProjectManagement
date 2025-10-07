"use client"

import React, { useState } from 'react'
import ProjectHeader from '../ProjectHeader'

type Props = {
    params: {id: string}; 
}

const Project = ({params}: Props) => {
    const id = params;
    const [activeTab, setActiveTab ] = useState("Board");
    const [isModalNewTaskOpen, setIsModelNewTaskOpen ] = useState(false);

  return (
//   {MODAL NEW TASKS}
    <div>
        <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  )
}

export default Project;