"use client"

import React, { useState } from 'react'
import ProjectHeader from '../ProjectHeader'
import BoardView from '../BoardView'
import ListView from '../ListView'
import Timeline from '../Timeline'

type Props = {
    params: {id: string}; 
}

const Project = ({params}: Props) => {
    const {id} = params;
    const [activeTab, setActiveTab ] = useState("Board");
    const [isModalNewTaskOpen, setIsModalNewTaskOpen ] = useState(false);

  return (
//   {MODAL NEW TASKS}
    <div>
        <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
        { activeTab === "Board" && (
          <BoardView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen}/>
        )}
        { activeTab === "List" && (
          <ListView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen}/>
        )}
        { activeTab === "Timeline" && (
          <Timeline id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen}/>
        )}
    </div>
  )
}

export default Project;