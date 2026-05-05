import React, { useState, useEffect } from "react";
import styles from "./NasaCollaborationPage.module.css";

const NASA_URLs = {
  astronomyPicOfTheDay: `https://api.nasa.gov/planetary/apod?api_key=${import.meta.env.VITE_NASA_API_KEY}`,
  marsRoverPhoto:
    "https://rovers.nebulum.one/api/v1/rovers/curiosity/photos?earth_date=2015-6-3",
};

const RoverPhoto = ({ src, date, roverName }) => {
  return (
    <div className={styles.roverPhotoCard}>
      <img
        className={styles.nasaPicOfTheDayImg}
        src={src}
        alt={`Photo taken by ${roverName}`}
      />
      <p>Date: {date}</p>
      <p>Rover: {roverName}</p>
    </div>
  );
};

export const NasaCollaboration = () => {
  const [dailyImg, setDailyImg] = useState({});
  const [roverPhoto, setRoverPhoto] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoverPhotos = async () => {
      try {
        const response = await fetch(NASA_URLs.marsRoverPhoto);
        if (!response.ok) throw new Error("Error fetching rover photos");
        const data = await response.json();
        setRoverPhoto(data);
      } catch (err) {
        setError("Cannot fetch photos. Try again later.");
        console.error("Rover fetch error:", err);
      }
    };

    const fetchDailyImg = async () => {
      try {
        const response = await fetch(NASA_URLs.astronomyPicOfTheDay);
        if (!response.ok) throw new Error("Error fetching astronomy picture");
        const data = await response.json();
        setDailyImg(data);
      } catch (err) {
        console.error("Astronomy fetch error:", err);
      }
    };

    fetchRoverPhotos();
    fetchDailyImg();
  }, []);

  return (
    <div className="fullBGpicture">
      <main className="mainContent">
        <h1>Collaboration with NASA</h1>

        <section className="card">
          <h2>Astronomy Picture of the day</h2>
          {dailyImg.url ? (
            <>
              <h3>{dailyImg.title}</h3>
              <img
                className={styles.nasaPicOfTheDayImg}
                src={dailyImg.url}
                alt={dailyImg.title}
              />
              <p>{dailyImg.explanation}</p>
            </>
          ) : (
            <p>Astronomy picture currently unavailable.</p>
          )}
        </section>

        <section className="card">
          <h2>Rover Photos</h2>
          {error ? (
            <p>{error}</p>
          ) : roverPhoto?.photos?.length > 0 ? (
            <div className={styles.roverContainer}>
              {" "}
              {roverPhoto.photos.map((photo) => (
                <RoverPhoto
                  key={photo.id}
                  src={photo.img_src}
                  date={photo.earth_date}
                  roverName={photo.rover.name}
                />
              ))}
            </div>
          ) : (
            <p>Loading rover photos...</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default NasaCollaboration;
