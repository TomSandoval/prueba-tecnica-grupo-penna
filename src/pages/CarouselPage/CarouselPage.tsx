import { useEffect, useState } from "react";
import { ImageInteface } from "../../interfaces/ImageInterface";
import Nav from "../../components/Nav/Nav";
import "./CarouselPage.css";

const URL = "https://api.thecatapi.com/v1/images/search?limit=5";
const api_key =
  "live_G20Wdjp6rYuSrWpCprX44qqSESeh20cNDRuLn7DGJr71hqV9eGk5rJRcdh2CUUAD";

export default function CarouselPage() {
  interface CarouselState {
    imagesState: ImageInteface[];
  }

  const [images, SetImages] = useState<CarouselState["imagesState"]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [halfLength, setHalfLength] = useState(0);

  useEffect(() => {
    const getData = async () => {
      fetch(URL, {
        headers: {
          "x-api-key": api_key,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data: ImageInteface[]) => {
          SetImages(data);
          setHalfLength(Math.floor(data.length / 2))
        });
    };

    getData();
  }, []);

  useEffect(() => {
    let interval: any;

    if (!isPaused) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images?.length);
      }, 2000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isPaused, currentIndex, images?.length]);

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  return (
    <>
      <Nav />
      <main className="carousel-page-all-container">
        <h2>Carrusel de imagenes</h2>

        {images.length > 0 && (
          <div
            className="carousel-container"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="carousel-wrapper">
              <img
                className={currentIndex === halfLength ? "carousel-image-middle" : "carousel-image"}
                src={images[currentIndex]?.url}
                alt={`Slide ${currentIndex}`}
              />
            </div>
          </div>
        )}
      </main>
    </>
  );
}
