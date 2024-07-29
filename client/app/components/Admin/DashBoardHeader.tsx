'use client'
import { ThemeSwitcher } from '@/app/utils/ThemeSwitcher'
import { IoIosNotificationsOutline } from 'react-icons/io'
import React,{FC,useState,useEffect} from 'react'

type Props = {
    open:boolean;
    setOpen:(open:boolean)=>void;
}

const DashBoardHeader:FC<Props> = ({open,setOpen}) => {
    // const [open,setOpen]=useState(false);
  return (
    <div className='w-full flex items-center justify-end p-6 fixed top-5 right-8'>
        <ThemeSwitcher/>
        <div className='relative cursor-pointer m-2' onClick={()=>setOpen(!open)}>
            <IoIosNotificationsOutline className="text-2xl cursor-pointer dark:text-white text-white"/>
            <span className="absolute -top-2 -right-2 bg-[#3ccba0] rounded-full w-[20px] h-[20px] text-[12px] flex items-center justify-center text-white">
                3
            </span>
        </div>
        {open && (
            <div className="w-[350px] h-[50vh] dark:bg-[#111C43] bg-white shadow-xl absolute top-16 z-10 rounded">
                <h1 className="text-center text-[20px] font-Poppins text-black dark:test-white p-2">
                    Notifications
                </h1>
                <div className="dark:bg-[#2d3a4ea1] bg-[#00000013] font-Poppins border-b dark:border-b-[#ffffff47] border-b-[#0000000f]">
                    <div className='w-full flex items-center justify-between p-2'>
                        <p className="text-black dark:text-white">
                            New Questions Received
                        </p>
                        <p className="text-black dark:text-white cursor-pointer">
                            Mark as Read
                        </p>
                    </div>
                    <p className="px-2 text-black dark:text-white">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quidem dolorem obcaecati ullam, est quibusdam perspiciatis nihil voluptate rem iusto vero corrupti facer.
                    </p>
                     <p className="p-2 text-black dark:text-white text-[14px]">
                        5 days ago
                    </p>
                </div>
                <div className="dark:bg-[#2d3a4ea1] bg-[#00000013] font-Poppins border-b dark:border-b-[#ffffff47] border-b-[#0000000f]">
                    <div className='w-full flex items-center justify-between p-2'>
                        <p className="text-black dark:text-white">
                            New Questions Received
                        </p>
                        <p className="text-black dark:text-white cursor-pointer">
                            Mark as Read
                        </p>
                    </div>
                    <p className="px-2 text-black dark:text-white">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quidem dolorem obcaecati ullam, est quibusdam perspiciatis nihil voluptate rem iusto vero corrupti facer.
                    </p>
                     <p className="p-2 text-black dark:text-white text-[14px]">
                        5 days ago
                    </p>
                </div>
            </div>
        )}
    </div>
  )
}

export default DashBoardHeader;