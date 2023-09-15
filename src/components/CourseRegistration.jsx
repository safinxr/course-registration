import { useEffect, useState } from "react"
import Card from "./Card"
import { StSetAndCheck, sTGet } from "../utilities/LocalStorage";
import priceAndHr from "../utilities/priceAndHr";




export default function CourseRegistration() {
    const [courses, setCourses] = useState([])
    const [remainingCredit, setRemainingCredit] = useState(20);
    const [totalCredit, setTotalCredit] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [courseId, setCourseId] = useState(0)
    const [courseList, setCourseList] = useState([]);


    useEffect(() => {
        fetch('/course.json')
            .then(res => res.json())
            .then(data => setCourses(data))
    }, [])

    useEffect(() => {
        if (courses.length) {
            const lSData = sTGet()
            const newCourses = [];
            for (const id of lSData) {
                const course = courses.find(data => data.id === id.newId)
                newCourses.push(course)
            }
            const tPACH = priceAndHr(newCourses)
            const { price, hr, remainingHr } = tPACH
            setTotalPrice(price)
            setTotalCredit(hr)
            setRemainingCredit(remainingHr)
            setCourseList(newCourses)
        }
    }, [courses, courseId])





    function addCourseList(id, hr) {
        
        const res = StSetAndCheck(id, hr)
        if(res === 'ok'){
            setCourseId(id)
            console.log(res);
        }
        else{
            console.log(res);
        }
        
    }


    return (
        <div className="flex items-start ">
            <section className="w-3/4 grid grid-cols-1 lg:grid-cols-3 gap-6">
                {
                    courses.map(course => <Card course={course} key={course.id} addCourseList={addCourseList}></Card>)
                }
            </section>
            <section className="w-1/4 ms-6 shadow-xl rounded-lg p-6">
                <h2 className="text-lg font-bold">Credit Hour Remaining {remainingCredit} hr</h2>
                <hr className="m-4" />
                <h2 className="text-lg font-bold">Course Name</h2>
                <ul className="list-decimal ms-4">
                    {
                        courseList.map(data => {
                            return (
                                <li key={data.id}>
                                    {data.title}
                                </li>
                            )
                        })
                    }
                </ul>
            </section>
        </div>
    )
};
