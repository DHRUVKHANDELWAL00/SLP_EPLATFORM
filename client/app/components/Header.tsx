'use client';
import React,{FC,useState} from 'react'

type Props = {
    open:boolean;
    setOpen:(open:boolean)=>void;
    activeItem:number;
}

const Header :FC<Props>= (props: Props) => {
    const [open,setOpen]=useState(false);
  const [activeItem,setActiveItem]=useState(0);
  return (
    <div className='w-full relative'>
        <div className={`${active? "dark:bg-opacity-50   "}`}
    </div>
  )
}
export default Header;