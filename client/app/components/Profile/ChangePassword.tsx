import React,{FC,useState} from 'react'
import {styles} from '@/app/styles/style'
import { useUpdatePasswordMutation } from '@/redux/features/user/userApi'
import {toast} from'react-hot-toast';
import { useEffect } from 'react'
type Props = {}

const ChangePassword:FC<Props> = (props) => {
    const [oldPassword,setOldPassword] = useState("");
    const [newPassword,setNewPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [updatePassword,{isSuccess,error}]=useUpdatePasswordMutation();
    const passwordChangeHandler=async(e:any)=>{
        console.log("Password")
        e.preventDefault(); 
        if(newPassword!==oldPassword) {
            toast.error("Passwords not matching")
            console.log("Password no")
        }else{
            await updatePassword({oldPassword,newPassword})
            console.log("Password")
        }

    }
    useEffect(()=>{
        if(isSuccess){
            toast.success("Password Changed Successfully")
        }
        if(error){
            if("data" in error){
                const errorData=error as any;
                toast.error(errorData.data.message)
            }
        }
    },[isSuccess,error])
  return (
    <div className="w-full pl-7 px-2 800px:px-5 800px:pl-0 pt-20">
        <h1 className="block text-[25px] 800px:text-[30px] font-Poppins text-black text-center font-[500] dark:text-[#fff] pb-2">
            Change Password
        </h1>
        <div className='w-full'>
            <form aria-required onSubmit={passwordChangeHandler} className="flex flex-col items-center">
                <div className='w-[100%] 800px:w-[60%] mt-5'>
                    <label className='block pb-2 dark:text-[#fff] text-black'>Enter your old password</label>
                    <input type="password" className={`${styles.input} !w-[95%] mb-4 800px:mb-0`} required value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)}/>
                </div>
                
                <div className='w-[100%] 800px:w-[60%] mt-2'>
                    <label className='block pb-2 dark:text-[#fff] text-black'>Enter your new password</label>
                    <input type="password" className={`${styles.input} !w-[95%] mb-4 800px:mb-0`} required value={newPassword} onChange={(e)=>setNewPassword(e.target.value)}/>
                </div>

                <div className='w-[100%] 800px:w-[60%] mt-2'>
                    <label className='block pb-2 dark:text-[#fff] text-black'>Confirm New Password</label>
                    <input type="password" className={`${styles.input} !w-[95%] mb-4 800px:mb-0`} required value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
                    <input className={`w-[95%] h-[40px] border border-[#37a39a] text-center text-black dark:text-[#fff] rounded-[3px] mt-8 cursor-pointer`} required value="Update" type="submit"/>
                </div>
            </form>
        </div>
    </div>
  )
}

export default ChangePassword