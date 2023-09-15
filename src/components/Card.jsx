import { MdAttachMoney } from 'react-icons/md';
import { BsBook } from 'react-icons/bs';
export default function Card({ course }) {
    const { image, title, details, price, credit_hour } = course
    return (
        <div className='p-4 shadow-2xl rounded-lg'>
            <img src={image} alt="" />
            <h3 className='text-lg font-semibold mt-4 mb-3'>{title}</h3>
            <p className='text-sm text-[#1C1B1B99] text-justify mb-5'>{details.slice(0, 100)}...</p>
            <div className='flex justify-between items-center mb-6'>
                <div className='flex items-center'>
                    <p className='text-xl'><MdAttachMoney /></p>
                    <p className='ms-1.5 text-sm text-[#1C1B1B99]'>Price: {price}</p>
                </div>
                <div className='flex items-center'>
                    <p className='text-xl'><BsBook /></p>
                    <p className='ms-2.5 text-sm text-[#1C1B1B99]' >Credit: {credit_hour}hr</p>
                </div>
            </div>
            <button className='w-full bg-blue-500 text-white py-1 rounded-lg'>Select</button>
        </div>
    )

};
