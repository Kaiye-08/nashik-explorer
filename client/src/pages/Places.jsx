import { useEffect, useState } from "react";
import PlaceCard from "../components/PlaceCard";

function Places() {
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const filteredPlaces = places.filter((place) =>
    {
        const matchesSearch = place.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "All" || place.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/places`).then((response) => {
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
    },[]);

    if (loading) {
        return <h1>Loading Places...</h1>;
    }

    if (error) {
        return <h1>{error}</h1>;
    }

    return (
        <main>
            <section className="places-page">
                <h1>Explore Places</h1>

                <p>
                    Discover some of the best places to visit in and around Nashik.
                </p>

                <div className="search-container">
                    <input
                    type="text"
                    placeholder="Search Places"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    />
                </div>

                <div className="category-filters">
                    <button onClick={() => setSelectedCategory("All")}>
                        All
                    </button>

                    <button onClick={() => setSelectedCategory("Religious")}>
                        Religious
                    </button>

                    <button onClick={() => setSelectedCategory("Historical")}>
                        Historical
                    </button>

                    <button onClick={() => setSelectedCategory("Nature")}>
                        Nature
                    </button>

                    <button onClick={() => setSelectedCategory("Wine & Leisure")}>
                        Wine & Leisure
                    </button>
                </div>

                <div className="places-grid">
                    {filteredPlaces.map((place) => (
                        <PlaceCard key={place._id} place={place} />
                    ))}
                </div>
            </section>
        </main>
    );
}

export default Places;
