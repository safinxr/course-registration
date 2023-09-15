import { useEffect, useState } from "react"
import Card from "./Card"
import { StSetAndCheck, sTGet } from "../utilities/LocalStorage";


export default function CourseRegistration() {
    const [courses, setCourses] = useState([])
    const [remainingCredit, setRemainingCredit] = useState(20);
    const [courseId, setCourseId] = useState(0)
    const [courseList, setCourseList] = useState([]);


    useEffect(() => {
        fetch('/course.json')
            .then(res => res.json())
            .then(data => setCourses(data))
    }, [])

    useEffect(() => {
        if (courses.length >= 0) {
            const lSData = sTGet()
            const newCourses = [];
            for (const id of lSData) {
                const course = courses.find(data => data.id === id)
                newCourses.push(course)
            }
            setCourseList(newCourses)
        }
    }, [courses, courseId])





    function  addCourseList(course) {
        setCourseId(course)
        const res = StSetAndCheck(course)
        console.log(res);
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
                {
                    console.log(courseList)
                }
                {/* <ol class="list-decimal">
                    {

                    }
                </ol> */}

            </section>
        </div>
    )
};
