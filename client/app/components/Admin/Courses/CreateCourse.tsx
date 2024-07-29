'use client'
import React,{FC,useState,useEffect} from 'react'
import CourseInformation from './CourseInformation'
import CourseOptions from './CourseOptions'
import CourseData from './CourseData'
import CourseContent from './CourseContent'
import CoursePreview from './CoursePreview'
import { useCreateCourseMutation } from '@/redux/features/courses/coursesApi'
import { redirect } from 'next/navigation'
import {toast} from'react-hot-toast';

type Props = {}

const CreateCourse = (props: Props) => {
    const [createCourse,{isLoading,isSuccess,error}]=useCreateCourseMutation()
    useEffect(() => {
        if(isSuccess){
            toast.success("Course Created Successfully");
            redirect('/admin/courses');
        }
        if(error){
            if("data" in error){
                const errorMessage = error as any;
                toast.error(errorMessage.data.message);
            }
        }
    }, [isLoading,isSuccess,error]);
    const [active,setActive]=useState(0);
    const [courseInfo,setCourseInfo]=useState({
        name:"",
        description:"",
        price:"",
        estimatedPrice:"",
        tags:"",
        level:"",
        categories:"",
        demoUrl:"",
        thumbnail:"",
    });
    const [benefits,setBenefits]=useState([{title:''}])
    const [preRequisites,setPreRequisites]=useState([{title:""}]);
    const [courseContentData,setCourseContentData]=useState([
        {
        videoUrl:"",
        title:"",
        description:"",
        videoSection:"Untitled Section",
        videoLength:"",
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
        videoLength:courseContent.videoLength,
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
                courseData:formattedCourseContentData,
    }
    setCourseData(data);
    console.log(courseData);
    console.log(data)
}
const handleCourseCreate=async(e:any)=>{
    const data=courseData;
    if(!isLoading){
        await createCourse(data);
    }
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
                    <CoursePreview active={active} setActive={setActive} courseData={courseData} handleCourseCreate={handleCourseCreate} isEdit={false}/>
                ) 
            }
        </div>
        <div className="w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0">
            <CourseOptions active={active} setActive={setActive}/>
        </div>
    </div>
  )
}
export default CreateCourse