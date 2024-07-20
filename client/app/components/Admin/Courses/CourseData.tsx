import React,{FC,useState} from 'react'
import { styles } from '@/app/styles/style'
import { AddCircle } from '@mui/icons-material'
type Props = {
    benefits:{title:string}[];
    setBenefits:(benefits:{title:string}[])=>void;
    preRequisites:{title:string}[];
    setPreRequisites:(preRequisites:{title:string}[])=>void;
    active:number;
    setActive:(active:number)=>void;

}

const CourseData:FC<Props> = ({benefits,setBenefits,preRequisites,setPreRequisites,active,setActive}) => {
    const handleBenefitChange=(index:number,value:string)=>{
        let newBenefits=[...benefits];
        newBenefits[index].title=value;
        setBenefits(newBenefits);
    }
    const handleAddBenefit=()=>{
        setBenefits([...benefits,{title:""}]);
    }
    const handlePrerequisitesChange=(index:number,value:string)=>{
        let newPreRequisites=[...preRequisites];
        newPreRequisites[index].title=value;
        setPreRequisites(newPreRequisites);
    }
    const handleAddPrerequisites=()=>{
        setPreRequisites([...preRequisites,{title:""}]);
    }
    const handlePrev=()=>{
        if(active>0){
            setActive(active-1);
        }
    }
    const handleNext=()=>{
            if(active<2){
                setActive(active+1);
            }
        }
  return (
    <div className="w-[80%] m-auto mt-24 block">
        <div>
            <label className={`${styles.label} text-[20px]`} htmlFor='email'>
                What are the benefits for students in this course?
            </label>
            <br/>
            {
                benefits.map((benefit:any,index:number)=>(
                    <input type="text" key={index} name="benefit" placeholder="You will be able to build a full stack LMS platform" required className={`${styles.input} my-2`} value={benefit.title} onChange={(e)=>handleBenefitChange(index,e.target.value)}/>
                ))
            }
            <AddCircle style={{margin:"10px 0px",cursor:"pointer",width:"30px"}} onClick={handleAddBenefit}/>
        </div>
         <div>
            <label className={`${styles.label} text-[20px]`} htmlFor='email'>
                What are the prerequisites for students in this course?
            </label>
            <br/>
            {
                preRequisites.map((prerequisites:any,index:number)=>(
                    <input type="text" key={index} name="prerequisites" placeholder="You need basics of javascript" required className={`${styles.input} my-2`} value={prerequisites.title} onChange={(e)=>handlePrerequisitesChange(index,e.target.value)}/>
                ))
            }
            <AddCircle style={{margin:"10px 0px",cursor:"pointer",width:"30px"}} onClick={handleAddPrerequisites}/>
        </div>
        <div className="w-full flex items-center justify-between">
                            <div className="w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center text-[#fff] cursor pointer rounded mt-8" onClick={()=>handlePrev()}>
                                Prev
                            </div>

                <div className="w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center text-[#fff] cursor pointer rounded mt-8" onClick={()=>handleNext()}>
                    Next
                </div>
            </div>

    </div>
  )
}
export default CourseData