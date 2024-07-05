import React,{FC,useState} from 'react'
import Image from 'next/image'
import {styles} from '../../../app/styles/style'
import { AiOutlineCamera } from 'react-icons/ai'
import avatarIcon from "../../../../client/public/images.png"
type Props = {
    avatar:string | null;
    user:any;
}

const ProfileInfo:FC<Props> = ({avatar,user}) => {
    const [name,setName]=useState(user && user.name);
    const imageHandler=async(e:any)=>{
        console.log("999")
    }
    const handleSubmit=async(e:any)=>{
        console.log("submit");
    }
  return (
    <>
    <div className='w-full flex justify-center'>
        <div className="relative">
            <Image src={user?.avatar || avatar ? user.avatar.url || avatar : avatarIcon} alt="" className='w-[120px] h-[120px] cursor-pointer border-[3px] border-[#37a39a] rounded-full'/>
            <input type="file" name="" id="avatar" className="hidden" onChange={imageHandler} accept="image/png,image/jpeg,image/webp,image/jpg"/>
            <label htmlFor="avatar">
                <div className='w-[30px] h-[30px] bg-slate-900 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer'>
                                    <AiOutlineCamera size={20} className='z-1'/>

                </div>
            </label>
        </div>
    </div>
    <br/>
    <br/>
    <div className="w-full pl-6 800px:pl-10">
        <form onSubmit={handleSubmit}>
            <div className="800px:w-[50%] m-auto pb-4">
                <div className='w-[110%]'>
                    <label className='block pb-2'>Full Name</label>
                    <input type="text" className={`${styles.input} !w-[95%] mb-4 800px:mb-0`} required value={name} onChange={(e)=>setName(e.target.value)}/> 
                </div>
                <div className='w-[110%] pt-2'>
                    <label className='block pb-2'> Email </label>
                    <input type="text" className={`${styles.input} !w-[95%] mb-1 800px:mb-0`} required value={user?.email}/> 
                </div>
                <input className={`w-full 800px:w-[250px] h-[40px] border border-[#37a39a] text-center dark:text-[#fff] text-black rounded-3px mt-8 cursor-pointer`}/>
            </div>
            
        </form>
    </div>
    </>
  )
}
export default ProfileInfo