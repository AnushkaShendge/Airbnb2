import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from 'axios'
import AddressLink from "../AddressLink"
import BookingDates from "../BookindDates"
import PlaceGallary from "../PlaceGallary"

function BookingPage () {
    const {id} = useParams()
    const [booking , setBooking] = useState(null)
    useEffect(() => {
        if(id){
            axios.get('http://localhost:4000/bookings').then((response) => {
                const foundBooking = response.data.find(({_id}) => _id === id)
                if(foundBooking){
                    setBooking(foundBooking)
                }
            }).catch((err) => {
                if(err) throw err
                
            });
        }
    } , [id])
    if(!booking){
        return ''
    }
    return (
        <div className="my-8">
            <h1 className='text-3xl'>{booking.places.title}</h1>
            <AddressLink className='my-2 block' >{booking.places.address}</AddressLink>
            <div className="bg-gray-200 my-6 p-6 rounded-2xl flex items-center justify-between">
                <div>
                    <h2 className="text-2xl mb-4">Your booking Information</h2>
                    <BookingDates booking={booking} />
                </div>
                <div className="bg-primary p-6 text-white rounded-2xl">
                    <div>Total price</div>
                    <div className="text-3xl">{booking.price}</div>
                </div>      
            </div>
            <PlaceGallary place={booking.places} />
        </div>

    )
}
export default BookingPage