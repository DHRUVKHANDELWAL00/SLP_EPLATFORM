'use client'
import React,{FC,useState,useEffect} from 'react'
import CourseInformation from './CourseInformation'
import CourseOptions from './CourseOptions'
import CourseData from './CourseData'
import CourseContent from './CourseContent'
import CoursePreview from './CoursePreview'
import { useCreateCourseMutation, useEditCourseMutation, useGetAllCoursesQuery } from '@/redux/features/courses/coursesApi'
import { redirect, useParams } from 'next/navigation'
import {toast} from'react-hot-toast';

type Props = {
    id:string;
}

const EditCourse:FC<Props> = ({id}) => {
    const [editCourse,{isSuccess,error}]=useEditCourseMutation()
    const {isLoading,data,refetch}=useGetAllCoursesQuery({},{refetchOnMountOrArgChange:true})

    const editCourseData=data && data?.courses?.find((i:any)=>i._id===id);
    console.log(id)
    

    
    useEffect(() => {
        if(isSuccess){
            toast.success("Course Updated Successfully");
            redirect('/admin/courses');
        }
        if(error){
            if("data" in error){
                const errorMessage = error as any;
                toast.error(errorMessage.data.message);
            }
        }
    }, [isSuccess,error]);
    const [active,setActive]=useState(0);
    const [courseInfo,setCourseInfo]=useState({
        name:"",
        description:"",
        price:"",
        estimatedPrice:"",
        tags:"",
        level:"",
        demoUrl:"",
        thumbnail:"",
    });
    console.log(editCourseData);
    
    useEffect(()=>{
        if(editCourseData){
            setCourseInfo({
                            name:editCourseData.name,
                            description:editCourseData.description,
                            price:editCourseData.price,
                            estimatedPrice:editCourseData.estimatedPrice,
                            tags:editCourseData.tags,
                            level:editCourseData.level,
                            demoUrl:editCourseData.demoUrl,
                            thumbnail:editCourseData?.thumbnail?.url,
                        })
                        setBenefits(editCourseData.benefits)
                        setPreRequisites(editCourseData.preRequisites)
                        setCourseContentData(editCourseData.courseData)
        }
    },[editCourseData])
    const [benefits,setBenefits]=useState([{title:''}])
    const [preRequisites,setPreRequisites]=useState([{title:""}]);
    const [courseContentData,setCourseContentData]=useState([
        {
        videoUrl:"",
        title:"",
        description:"",
        videoSection:"Untitled Section",
        links:[
            {
                title:'',
                url:'',
            }
        ],
        suggestion:'',
    }
])
const [courseData,setCourseData]=useState({});
const handleSubmit=async()=>{
    const formattedBenefits=benefits.map((benefits)=>({title:benefits.title}));

    const formattedPreRequisites=preRequisites.map((preRequisite)=>({title:preRequisite.title}));

    const formattedCourseContentData=courseContentData.map((courseContent)=>({
        videoUrl:courseContent.videoUrl,
        title:courseContent.title,
        description:courseContent.description,
        videoSection:courseContent.videoSection,
        links:courseContent.links.map((link)=>({title:link.title,url:link.url})),
        suggestion:courseContent.suggestion,
    }));
    //prepare data object?
    const data={
        name:courseInfo.name,
                description:courseInfo.description,
                price:courseInfo.price,
                estimatedPrice:courseInfo.estimatedPrice,
                thumbnail:courseInfo.thumbnail,
                tags:courseInfo.tags,
                level:courseInfo.level,
                demoUrl:courseInfo.demoUrl,
                totalVideo:courseContentData.length,
                benefits:formattedBenefits,
                preRequisites:formattedPreRequisites,
                courseContentData:formattedCourseContentData,
    }
    setCourseData(data);
    console.log(courseData);
    console.log(data)
}
const handleCourseCreate=async(e:any)=>{
    const data=courseData;
    await editCourse({id:editCourseData?._id,data})
}
  return (
    <div className="w-full flex min-h-screen">
        <div className="w-[80%]">
            {
                active===0 && (
                    <CourseInformation courseInfo={courseInfo} setCourseInfo={setCourseInfo} active={active} setActive={setActive}/>
                ) 
            }
            {
                active===1 && (
                    <CourseData benefits={benefits} setBenefits={setBenefits} preRequisites={preRequisites} setPreRequisites={setPreRequisites} active={active} setActive={setActive}/>
                ) 
            }
            {
                active===2 && (
                    <CourseContent active={active} setActive={setActive} courseContentData={courseContentData} setCourseContentData={setCourseContentData} handleSubmit={handleSubmit}/>
                ) 
            }
            {
                active===3 && (
                    <CoursePreview active={active} setActive={setActive} courseData={courseData} handleCourseCreate={handleCourseCreate} isEdit={true}/>
                ) 
            }
        </div>
        <div className="w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0">
            <CourseOptions active={active} setActive={setActive} />
        </div>
    </div>
  )
}
export default EditCourse