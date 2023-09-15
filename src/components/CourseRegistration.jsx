import { useEffect, useState } from "react"
import Card from "./Card"
import { StSetAndCheck, sTGet } from "../utilities/LocalStorage";
import priceAndHr from "../utilities/priceAndHr";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineMinusCircle, AiFillMinusCircle } from 'react-icons/ai'


export default function CourseRegistration() {

    const [courses, setCourses] = useState([])
    const [remainingCredit, setRemainingCredit] = useState(20);
    const [totalCredit, setTotalCredit] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [courseId, setCourseId] = useState(0)
    const [courseList, setCourseList] = useState([]);

    const notify = (error) => toast.error(error, {
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
        if(res === 'error2'){
            notify('Insufficient credit hour')
        }
        if (res === 'error'){
            notify('This course is already been added')
        }
    }

    function removeList (cId){
        console.log(cId);
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
            <section className="w-1/4 ms-6 shadow-2xl rounded-lg p-6">
                <h2 className="text-lg font-bold">Credit Hour Remaining {remainingCredit} hr</h2>
                <hr className="my-4" />
                <h2 className="text-lg font-bold">Course Name</h2>
                <ul className="list-decimal ms-4 my-6 text-[#1C1B1B99]">
                    {
                        courseList.map(data => {
                            return (
                                <li className="leading-8 " key={data.id}>
                                    <div className="flex justify-between items-center">
                                    {data.title} 
                                    <p onClick={()=>removeList(data.id)} className="text-black cursor-pointer"><AiOutlineMinusCircle></AiOutlineMinusCircle></p>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
                <hr />
                <p className="font-medium my-4">Total Credit Hour : {totalCredit}hr</p>
                <hr />
                <p className="font-medium mt-4">Total Price : {totalPrice} USD</p>

            </section>
        </div>
    )
};
