'use client'
import React,{FC} from 'react'
import Protected from '../hooks/useProtected'
import { useState } from 'react'
import Header from "../components/Header";
import Heading from "../utils/Heading";
import Profile from '../components/Profile/Profile'
import { useSelector } from 'react-redux';
type Props = {}

const page:FC<Props> = (props) => {
    const [open,setOpen]=useState(false);
  const [activeItem,setActiveItem]=useState(0);
  const [route,setRoute]=useState("Login")
  const {user}=useSelector((state:any)=>state.auth)
  
  return (
    <div>
        <Protected>
            <Heading title={`${user?.name} profile`} description="A self paced learning problems" keywords="Programming,redux,mern"/>
      <Header open={open} setOpen={setOpen} activeItem={activeItem} setRoute={setRoute} route={route} />
      <Profile user={user}/>
        </Protected>
    </div>
  )
}

export default page