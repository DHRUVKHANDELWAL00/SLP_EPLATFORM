import React from 'react'
import { useState,useRef } from 'react';
import toast from 'react-hot-toast'
import { VscWorkspaceTrusted } from 'react-icons/vsc'
import {FC} from 'react';
import { useEffect } from 'react';
import { styles } from '../../styles/style'
import { useSelector } from 'react-redux';
import { useActivationMutation } from '@/redux/features/auth/authApi';
type Props = {
    setRoute: (route: string) => void;

}
type VerifyNumber={
    "0":string;
    "1":string;
    "2":string;
    "3":string;
}

const Verification:FC<Props> = ({setRoute}) => {
    const { token } = useSelector((state: any) => {
  console.log("Auth state:", state.auth);
  return state.auth;
});
    
    const [activation,{isSuccess,error}] = useActivationMutation();
    const [invalidError, setInvalidError] =useState(false);
    
    useEffect(() => {
        console.log(token);
        
        if(isSuccess){
            toast.success('Account activated successfully');
            setRoute('Login');
        }
        if(error){
            if("data" in error){
                const errData=error as any;
                if(errData.message){
                    toast.error(errData.message);
                }
                setInvalidError(true);

            }else{
                console.log(`An error occurred while activating account`,error);
                
            }
        }
    }, [isSuccess,error]);








    const inputRef = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
    ];
    const [verifyNumber, setVerifyNumber] = useState<VerifyNumber>({
        "0":"",
        "1":"",
        "2":"",
        "3":""
    })
    const verificationHandler=async()=>{
        const verificationNumber=Object.values(verifyNumber).join('');
        console.log(verificationNumber);
        console.log(token);
        
        if(verificationNumber.length!==4){
            setInvalidError(true);
            return;
        }
        await activation({
            activation_token:token,
            activation_code:verificationNumber,
        })
    }
    const handleInputChange=(index:number,value:string)=>{
        setInvalidError(false);
        const newVerfiyNumber={...verifyNumber,[index]:value};
        setVerifyNumber(newVerfiyNumber);
        if(value==="" && index>0){
            inputRef[index-1].current?.focus();
        }else if(value.length===1 && index<3){
            inputRef[index+1].current?.focus();
        }
    }
  return (
    <div>
        <h1 className={`${styles.title}`}>
            Verify Your Account
        </h1>
        <br/>
        <div className='flex flex-wrap justify-center mt-2'>
            <div className='w-[80px] h-[80px] rounded-full bg-[#497DF2] flex items-center justify-center'>
                <VscWorkspaceTrusted size={60}/>
            </div>
        </div>
            <br/>
            <br/>
            <div className=' m-auto flex flex-wrap gap-5 justify-center'>
                {Object.keys(verifyNumber).map((key,index)=>(
                    <input
                        key={index}
                        ref={inputRef[index]}
                        type="number"
                        value={verifyNumber[key as keyof VerifyNumber]}
                        maxLength={1}
                        onChange={(e)=>handleInputChange(parseInt(key),e.target.value)}
                        className={`w-[65px] h-[65px] bg-transparent border-[3px] rounded-[10px] flex item-center text-black dark:text-white justify-center text-[18px] font-Poppins outline-none text-center 
                        ${invalidError? "shake border-red-500" : "dark:border-white border-[#0000004a]"
                    } `}
                    />
))}
            </div>
            <br/>
            <br/>
            <div className="w-full flex justify-center">
                <button className={`${styles.submitButton}`} onClick={verificationHandler}>
                    Verify OTP
                </button>
            </div>

    </div>
  )
}
export default Verification;