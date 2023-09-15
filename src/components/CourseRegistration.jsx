import { useEffect, useState } from "react"
import Card from "./Card"
import { StSetAndCheck, sTGet } from "../utilities/LocalStorage";
import priceAndHr from "../utilities/priceAndHr";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function CourseRegistration() {

    const [courses, setCourses] = useState([])
    const [remainingCredit, setRemainingCredit] = useState(20);
    const [totalCredit, setTotalCredit] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [courseId, setCourseId] = useState(0)
    const [courseList, setCourseList] = useState([]);

    const notify1 = () => toast.error('Insufficient credit hour', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });



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

        if (res === 'ok') {
            setCourseId(id)
        }
        else {
            notify1()
        }



    }


    return (
        <div className="flex items-start ">
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

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
