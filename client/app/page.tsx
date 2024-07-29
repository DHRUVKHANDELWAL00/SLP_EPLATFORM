'use client';
import React,{FC,useState} from "react";
import Heading from "./utils/Heading";
import Header from "./components/Header";
import Hero from "./components/Route/Hero";
import Courses from "./components/Route/Courses";
import Reviews from "./components/Route/Reviews";
import FAQ from "./components/FAQ/Faq";
import Footer from "./components/Footer/Footer";
interface Props{}

const Page: FC<Props>=(props)=>{
  const [open,setOpen]=useState(false);
  const [activeItem,setActiveItem]=useState(0);
  const [route,setRoute]=useState("Login")
  return(
    <>
      <Heading title="ELearning" description="A self paced learning problems" keywords="Programming,redux,mern"/>
      <Header open={open} setOpen={setOpen} activeItem={activeItem} setRoute={setRoute} route={route} />
      <Hero/>
      <Courses/>
      <Reviews/>
      <FAQ/>
      <Footer/>
    </>
  )
};

export default Page;