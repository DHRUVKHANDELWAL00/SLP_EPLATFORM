'use client'
import React,{FC,useState} from 'react';
import AdminSidebar from '../../components/Admin/AdminSidebar'
import Heading from '@/app/utils/Heading'
import CreateCourse from '@/app/components/Admin/Courses/CreateCourse'
import DashBoardHeader from '@/app/components/Admin/DashBoardHeader'
type Props = {}

const page = (props: Props) => {
  return (
    <div>
        <Heading title="Elearning-admin" description="Elearning is a platform for students to learn and get help from teachers" keywords="Programming,Mern,Redux,Machine Learning"/>
        <div className='flex'>
            <div className="1500px:w-[16%] w-1/5">
                <AdminSidebar />
            </div>
            <div className="w-[85%]">
                <DashBoardHeader/>
                <CreateCourse />
            </div>
        </div>
    </div>
  )
}

export default page