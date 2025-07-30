import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GetPexelsPhoto } from "@/service/GlobalApi";

function HotelCardItem({ hotel }) {
  const [photoUrl, setPhotoUrl] = useState("/air.jpg");

  useEffect(() => {
    if (hotel?.hotelName && hotel?.hotelAddress) {
      const city = hotel.hotelAddress.split(",")[1]?.trim() || "India" ||"USA" || "UK" || "Europe" || "Australia" || "Canada";
      const query = `${hotel.hotelName} ${city}`;

      console.log("🔍 Hotel photo query:", query);

      GetPexelsPhoto(query, "hotel").then((url) => {
        console.log("📸 Returned photo URL:", url);

        if (!url) {
          setPhotoUrl("/air.jpg");
        } else {
          setPhotoUrl(url);
        }
      });
    }
  }, [hotel]);

  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${hotel.hotelName},${hotel.hotelAddress}`}
      target="_blank"
    >
      <div className="hover:scale-105 transition-all cursor-pointer">
        <img
          src={photoUrl}
          alt={`${hotel.hotelName} image`}
          className="rounded-xl h-[150px] w-full object-cover"
        />
        <div className="my-2 flex flex-col gap-2">
          <h2 className="font-medium">{hotel.hotelName}</h2>
          <h2 className="text-xs text-gray-500">📍 {hotel.hotelAddress}</h2>
          <h2 className="text-sm">💰 {hotel.price}</h2>
          <h2 className="text-sm">⭐ {hotel.rating}</h2>
        </div>
      </div>
    </Link>
  );
}

export default HotelCardItem;
