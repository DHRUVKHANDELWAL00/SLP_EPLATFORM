'use client'
import React,{FC,useState} from 'react';
import AdminSidebar from '../../components/Admin/AdminSidebar'
import Heading from '@/app/utils/Heading'
import CreateCourse from '@/app/components/Admin/Courses/CreateCourse'
import DashBoardHeader from '@/app/components/Admin/DashBoardHeader'
import AdminProtected from '@/app/hooks/adminProtected';
import DashBoardHero from '@/app/components/Admin/DashBoardHero';
import AllCourses from '@/app/components/Admin/Courses/AllCourses';
import EditHero from '@/app/components/Admin/Customization/EditHero';
type Props = {
    activeItem:string;
}

const page = (props: Props) => {
  return (
    <div>
        <AdminProtected>
            <Heading title="Elearning-admin" description="Elearning is a platform for students to learn and get help from teachers" keywords="Programming,Mern,Redux,Machine Learning"/>
            <div className='flex h-screen'>
                 <div className="1500px:w-[16%] w-1/5">
                    <AdminSidebar/>
                 </div>
                 <div className="w-[85%]">
                    <DashBoardHero/>
                    <EditHero/>
                 </div>
            </div>
        </AdminProtected>
    </div>
  )
}

export default page