
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PlaceCard from "../components/PlaceCard";

function Home() {
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/places`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch places");
                }

                return response.json();
            })
            .then((data) => {
                setPlaces(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setError("Could not load places.");
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <h1>Loading Nashik Explorer</h1>;
    }

    if (error) {
        return <h1>{error}</h1>;
    }

    return (
        <main>
            <section className="hero">
                <h1>Explore Nashik</h1>
                <p>
                    Discover temples, caves, waterfalls, vineyards
                    and unforgettable places around Nashik!
                </p>
                <Link to="/places" className="hero-button">
                    Explore Places
                </Link>
            </section>

            <section className="featured-places">
                <h2>Featured Places</h2>

                <div className="places-grid">
                    {places.map((place) => (
                        <PlaceCard key={place._id} place={place} />
                    ))}
                </div>
            </section>
        </main>
    );
}

export default Home;
