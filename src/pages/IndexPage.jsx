import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function IndexPage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios
      .get("/places", {
        headers: {
          Authorization: "Bearer " + window.localStorage?.token,
        },
      })
      .then((response) => {
        setPlaces(response.data); // Set the response data directly
      });
  }, []);

  return (
    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {places.length > 0 &&
        places.map((place) => (
          <Link to={"/place/" + place._id} key={place._id}>
            {" "}
            {/* Add a key for each element */}
            <div className="bg-gray-500 mb-2 rounded-2xl flex">
              {place.photos?.length ? (
                <img
                  className="rounded-2xl object-cover aspect-square"
                  src={import.meta.env.VITE_IMAGE_URL + place.photos[0]}
                  alt=""
                />
              ) : null}
            </div>
            <h2 className="font-bold">{place.address}</h2>
            <h3 className="text-sm text-gray-500">{place.title}</h3>
            <div className="mt-1">
              <span className="font-bold"> ${place.price} per night</span>
            </div>
          </Link>
        ))}
    </div>
  );
}
