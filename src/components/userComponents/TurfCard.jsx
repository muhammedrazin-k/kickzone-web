import React from 'react'
import { Link } from 'react-router-dom'
import SERVER_URL from '../../server/serverURL'

const TurfCard = ({card}) => {
  return (
    <div>
    <Link to={`/user/turf/${card._id}`}>
      <div className="cards bg-white rounded-2xl shadow-md border border-gray-200 
                      hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
  
        {/* Image */}
        <div className="h-72 overflow-hidden rounded-t-2xl">
          <img
            src={`${SERVER_URL}/uploads/${card.turfImage}`}
            alt={card.turfName}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>
  
        {/* Content */}
        <div className="px-4 py-4">
          <h1 className="font-semibold text-gray-800 text-lg">
            {card.turfName}
          </h1>
  
          <p className="text-gray-500 text-sm mt-1">
            {card?.location?.address}
          </p>
        </div>
  
      </div>
    </Link>
  </div>
  )
}

export default TurfCard