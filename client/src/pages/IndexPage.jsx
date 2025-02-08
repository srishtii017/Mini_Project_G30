import axios from "axios"
import { useEffect, useState } from "react"

export default function IndexPage() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get('/places').then(response => {
      setPlaces(response.data);
    })
  } , [])
  return (
    <div>
      {places.length > 0 && places.map((place, index) => (
        <div key={index}>
          {place.title}
        </div>
       
     ))}
    </div>
  )
}