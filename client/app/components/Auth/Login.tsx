import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {AiOutlineEye,AiOutlineEyeInvisible,AiFillGithub } from'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import {styles} from '../../styles/style'
import {FC} from 'react';
type Props = {
    setRoute:(route:string)=>void;

}

const Schema=Yup.object().shape({
    email: Yup.string().email().required('Email is required'),
    password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters long')
})

const Login:FC<Props> = ({setRoute}) => {
    const [show,setShow] = React.useState(false);
    const formik = useFormik({
        initialValues: { email: '', password: '' },
        validationSchema: Schema,
        onSubmit: async({email,password}) => {
            console.log({email,password})
            // setRoute('Home')
        },
    })
    const {errors,touched,values,handleChange,handleSubmit} = formik;
  return (
    <div className='w-full'>
        <h1 className={`${styles.title}`}>
            Login With Elearning
        </h1>
        <form onSubmit={handleSubmit}>
            <label className={`${styles.label}`} htmlFor='email'>
                Enter your Email
            </label>
            <input type="email" name="email" value={values.email} onChange={handleChange} id="email" className={`${errors.email && touched.email && "border-red-500" } ${styles.input}`} placeholder='login@gmail.com'/>
            {errors.email && touched.email && <span className={`${styles.error}`}>{errors.email}</span>}
            <div className='w-full mt-5 relative mb-1'>
                <label className={`${styles.label}`} htmlFor='password'>
                    Enter your Password
                </label>
                <input type={show? 'text' : 'password'} name="password" value={values.password} onChange={handleChange} id="password" className={`${errors.password && touched.password && "border-red-500" } ${styles.input}`} placeholder='Password'/>
                {!show ? (
                    <AiOutlineEyeInvisible className="absolute bottom-3 right-2 z-1 cursor-pointer" size={20} onClick={()=> setShow(true)} />
                ):(
                    <AiOutlineEye className="absolute bottom-3 right-2 z-1 cursor-pointer" size={20} onClick={()=> setShow(false)} />
                )
                }
                {errors.password && touched.password && (
                    <span className={`${styles.error}`}>{errors.password}</span>
                )}
            </div>
            <div className="w-full mt-5">
                <input type="submit" value="Login" className={`${styles.submitButton}`}/>
            </div>
            <br/>
            <h5 className='text-center pt-4 font-Poppins text-[14px] text-black dark:text-white'>
                Or join with
            </h5>
            <div className='flex items-center justify-center my-3'>
                <FcGoogle size={30} className='mr-3 text-black dark:text-white'/>
                <AiFillGithub size={30} className='text-black dark:text-white'/>
            </div>
            <h5 className='text-center font-Poppins text-[14px] text-black dark:text-white'>
                Not have any account?{" "}
                <span className="text-[#2190ff] pl-1 cursor-pointer" onClick={()=>setRoute('Sign-up')}>
                    Sign Up
                </span>
            </h5>
        </form>
        <br/>
    </div>
  )
}
export default Login;