'use client'
import React,{FC,useState} from 'react'
import SidebarProfile from './SideBar'
import SideBar from './SideBar'
import { useLogoutQuery } from '@/redux/features/auth/authApi'
import { signOut } from 'next-auth/react'
import { redirect } from 'next/navigation'
import ProfileInfo from './ProfileInfo'
import ChangePassword from './ChangePassword'
type Props =
 {
  user:any;
}

const Profile:FC<Props> = ({user}) => {
  const [scroll,setScroll]=useState(false);
  const [active,setActive]=useState(1);
  const [avatar,setAvatar]=useState(null);
  const [logout,setLogout] = useState(false)
  const {}=useLogoutQuery(undefined,{
    skip: !logout ? true : false,
  });
  const logoutHandler=async()=>{ 
    setLogout(true);
    await signOut();
    
  }
  if(typeof window!=='undefined'){
    window.addEventListener("scroll", ()=>{
          if(window.scrollY>85){
            setScroll(true);
          }else{
            setScroll(false);
          }
    });
  }
  return (
    <div className="w-full flex mx-auto dark:bg-slate-900 light:bg-white">
      <div className={`w-[60px] 800px:w-[310px] h-[450px] dark:bg-slate-900 bg-white bg-opacity-90 dark:border-[#ffffff1d] border-[#00000017] border-solid rounded-[5px] shadow-sm mt-[80px] mb-[80px] sticky ${scroll?"top-[120px]":"top-[30px]"} left-[30px]`}>
        <SideBar user={user} active={active} avatar={avatar} setActive={setActive} logoutHandler={logoutHandler}/>
      </div>
      {
          active===1 && (
            <ProfileInfo user={user} avatar={avatar}/>
          )
        }
        {
          active===2 && (
            <ChangePassword/>
          )
        }
    </div>

  )
}
export default Profile