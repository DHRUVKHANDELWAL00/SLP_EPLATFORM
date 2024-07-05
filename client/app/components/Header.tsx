'use client';
import Link from 'next/link';
import React,{FC,useState} from 'react'
import NavItems from '../utils/NavItems';
import { ThemeSwitcher } from '../utils/ThemeSwitcher';
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from 'react-icons/hi';
import CustomModal from '../utils/CustomModal'
import Login from './Auth/Login';
import Signup from './Auth/Signup';
import Verification from './Auth/Verification'; 
import { useSelector} from 'react-redux';
import Image from 'next/image';
import avatar from '../../public/next.svg'
import { useSession } from 'next-auth/react';
import { useLogoutQuery, useSocialAuthMutation } from '@/redux/features/auth/authApi';
import { useEffect } from 'react';
import {toast} from'react-hot-toast';
type Props = {
    open:boolean;
    setOpen:(open:boolean)=>void;
    activeItem:number;
    route:string;
    setRoute:(route:string)=>void;
}

const Header :FC<Props>= ({activeItem,setOpen,route,open,setRoute}) => {
    const [active,setActive]=useState(false);
  const [openSidebar,setOpenSidebar]=useState(false);
  const {user}=useSelector((state:any)=>state.auth)
  const {data}=useSession();
  const [socialAuth,{isSuccess,error}]=useSocialAuthMutation();
  const [logout,setLogout] = useState(false)
  const {}=useLogoutQuery(undefined,{
    skip: !logout ? true : false,
  });
  useEffect(() => {
    if(!user){
      if(data){
        socialAuth({email:data?.user?.email,name:data?.user?.name,avatar:data?.user?.image});
      }
    }
    if(data!==null){
      if(isSuccess){
    toast.success("Logged in successfully!")
  }
    }
  if(data===null){
    setLogout(true);
  }
  }, [data,user]);
  

  console.log(data);
  
  if(typeof window !== 'undefined'){
    window.addEventListener("scroll", ()=>{
      if(window.scrollY>85){
        setActive(true);
      }else{
        setActive(false);
      }
    });
  }
  const handleClose=(e:any)=>{
    if(e.target.id==="screen"){
      setOpenSidebar(false)
    }
  }
  return (
    <div className='w-full relative'>
        <div className={`${active? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#fffffff1c shadow-xl transition duration-500" : "w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow"}`}>
          <div className='w-[95%] 800px:w-[92%] m-auto py-2 h-full'>
            <div className='w-full h-[80px] flex items-center justify-between p-3'>
              <div>
                <Link href={"/"} className={`text-[25px] font-Poppins font-[500] text-black dark:text-white `}>
                  ELearning

                </Link>
              </div>
              <div className='flex items-center'>
                <NavItems activeItem={activeItem} isMobile={false}/>
                <ThemeSwitcher/>
                {/* only for mobile */}
                <div className="800px:hidden">
                  <HiOutlineMenuAlt3 size={25} className='cursor-pointer dark:text-white text-black' onClick={()=>setOpenSidebar(true)}/>
                </div>
                {
                  user?(
                    <Link href={"/profile"}>
                    <Image src={user.avatar ? user.avatar : avatar} alt="profile" className='h-[30px] w-[30px] rounded-full'/>
                    </Link>

                  ):(
                    <HiOutlineUserCircle size={25} className='hidden 800px:block cursor-pointer dark:text-white text-black' onClick={()=>setOpen(true)}/>
                  )
                }

              </div>
            </div>
          </div>
          {
            openSidebar && (
              <div className='fixed w-full h-screen top-0 left-0 z-[99999] dark:bg-[unset] bg-[#00000024]' onClick={handleClose} id="screen">
                <div className='w-[70%] fixed h-screen z-[99999999] bg-white dark:bg-slate-900 dark:bg-opacity-90  top-0 right-0 '>
                  <NavItems activeItem={activeItem} isMobile={true}/>
                
                <HiOutlineUserCircle size={25} className='mx-auto flex items-center justify-center cursor-pointer dark:text-white text-black' onClick={()=>setOpen(true)}/>
                <br/>
                <br/>
                <p className='mx-auto text-[14px] px-2 pl-5 text-black dark:text-white items-center'>Copyright 2023 Elearning</p>
                  </div>
                </div>
            )
          }
          </div>
          
          {
            route==='Login' &&(
              <>
              {
                open && (
                  <CustomModal open={open} setOpen={setOpen} setRoute={setRoute} activeItem={activeItem} component={Login}/>
                )
              }
              </>
            )
          }
          {
            route==='Sign-up' &&(
              <>
              {
                open && (
                  <CustomModal open={open} setOpen={setOpen} setRoute={setRoute} activeItem={activeItem} component={Signup}/>
                )
              }
              </>
            )
          }
          {
            route==='Verification' &&(
              <>
              {
                open && (
                  <CustomModal open={open} setOpen={setOpen} setRoute={setRoute} activeItem={activeItem} component={Verification}/>
                )
              }
              </>
            )
          }
          </div>
  )
}
export default Header;