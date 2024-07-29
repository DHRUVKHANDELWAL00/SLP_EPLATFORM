'use client'

import React from 'react'
import Heading from '../utils/Heading'
import AdminProtected from '../hooks/adminProtected'
import AdminSidebar from '../components/Admin/AdminSidebar'
import DashBoardHero from '../components/Admin/DashBoardHero'
type Props = {
    activeItem:string;
}

const page = (props: Props) => {
  return (
    <div>
        <AdminProtected>
            <Heading title="Elearning-admin" description="Elearning is a platform for students to learn and get help from teachers" keywords="Programming,Mern,Redux,Machine Learning"/>
            <div className='flex h-[200vh]'>
                 <div className="1500px:w-[16%] w-1/5">
                    <AdminSidebar/>
                 </div>
                 <div className="w-[85%]">
                    <DashBoardHero isDashboard={true}/>
                 </div>
            </div>
        </AdminProtected>
    </div>
  )
}

export default page