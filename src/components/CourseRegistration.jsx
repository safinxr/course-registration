import { useEffect, useState } from "react"
import Card from "./Card"

export default function CourseRegistration() {
    const [courses, setCourses] =useState([])
    useEffect(()=>{
        fetch('/course.json')
        .then(res=> res.json())
        .then(data => setCourses(data))
    },[])
    return(
        <div className="flex items-start ">
            <section className="w-3/4 grid grid-cols-1 lg:grid-cols-3 gap-6">
                {
                    courses.map(course => <Card course={course} key={course.id}></Card>)
                }
            </section>
            <section className="w-1/4">
                <h1>sadfafa</h1>
            </section>
        </div>
    )
};
