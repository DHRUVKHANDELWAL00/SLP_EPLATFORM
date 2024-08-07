import React,{FC,useState,useEffect} from 'react'
import Image from 'next/image'
import {styles} from '../../../app/styles/style'
import { AiOutlineCamera } from 'react-icons/ai'
import avatarIcon from "../../../../client/public/images.png"
import { useEditProfileMutation, useUpdateAvatarMutation } from '@/redux/features/user/userApi'
import { useLoadUserQuery } from '@/redux/features/api/apiSlice'
import toast from 'react-hot-toast'


type Props = {
    avatar:string | null;
    user:any;
}

const ProfileInfo:FC<Props> = ({avatar,user}) => {
    const [name,setName]=useState(user && user.name);
    const [updateAvatar,{isSuccess,error}]=useUpdateAvatarMutation();
    const [loadUser,setLoadUser]=useState(false)
    const {}=useLoadUserQuery(undefined,{skip: loadUser ? false:true});
    const [editProfile,{isSuccess:success,error:updateError}]=useEditProfileMutation();
    const imageHandler=async(e:any)=>{
        const file=e.target.files[0];
        console.log(e.target.files[0]);
        const fileReader=new FileReader();
        fileReader.onload=async()=>{
            if(fileReader.readyState===2){
                const avatar=fileReader.result;
                await updateAvatar(
                    avatar,
                );
            }
        }
        fileReader.readAsDataURL(e.target.files[0]);
    }
    useEffect(() => {
        if(isSuccess || success){
            setLoadUser(true)
        }
        if(error||updateError){
                    console.log(error);

        }
        if(isSuccess || success){
            toast.success(' Profile Updated Successfully')
        }
    }, [isSuccess,error,success,updateError]);
    const handleSubmit=async(e:any)=>{
        e.preventDefault();
        if(name !==""){
            await editProfile({
                name:name,
            })
        }
    }
  return (
    <>
    <div className='w-full flex justify-center'>
        <div className="relative">
            <Image src={user.avatar || avatar ? user.avatar.url || avatar : avatarIcon} alt="" className='w-[120px] h-[120px] cursor-pointer border-[3px] border-[#37a39a] rounded-full' width={120} height={120}/>
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
                    <input type="text" className={`${styles.input} !w-[95%] mb-1 800px:mb-0`} readOnly required value={user?.email}/> 
                </div>
                <input type="submit" className={`w-full 800px:w-[250px] h-[40px] border border-[#37a39a] text-center dark:text-[#fff] text-black rounded-3px mt-8 cursor-pointer`} required value="Update"/>
            </div>
            
        </form>
        <br/>
    </div>
    </>
  )
}



export default ProfileInfo

