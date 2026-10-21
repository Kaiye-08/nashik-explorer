import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const travelOrigins = [
    {
        key: "cbs",
        label: "CBS Nashik",
        address: "Central Bus Stand, Nashik, Maharashtra, India"
    },
    {
        key: "airport",
        label: "Nashik Airport",
        address: "Nashik Airport, Ozar, Maharashtra, India"
    },
    {
        key: "railwayStation",
        label: "Nashik Road Railway Station",
        address: "Nashik Road Railway Station, Nashik, Maharashtra, India"
    }
];

const getDirectionsUrl = (origin, place) => {
    const destination = `${place.location.latitude},${place.location.longitude}`;
    return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
        origin
    )}&destination=${encodeURIComponent(destination)}&travelmode=driving`;
};

const getPlaceMapUrl = (place) => {
    const query = `${place.location.latitude},${place.location.longitude}`;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
};

function PlaceDetails() {
    const { slug } = useParams();
    const [place, setPlace] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const controller = new AbortController();
        setLoading(true);
        setError("");

        fetch(`${import.meta.env.VITE_API_URL}/api/places`, {
            signal: controller.signal
        })
            .then((response) => {
                if (!response.ok) throw new Error("Could not find this destination.");
                return response.json();
            })
            .then((data) => setPlace(data))
            .catch((fetchError) => {
                if (fetchError.name !== "AbortError") {
                    console.error(fetchError);
                    setError("We couldn't load this destination. Please try again.");
                }
            })
            .finally(() => {
                if (!controller.signal.aborted) setLoading(false);
            });

        return () => controller.abort();
    }, [slug]);

    if (loading) return <main className="place-page"><div className="place-container"><p>Loading destination...</p></div></main>;
    if (error) return <main className="place-page"><div className="place-container"><p>{error}</p><Link to="/places">Back to places</Link></div></main>;
    if (!place) return null;

    const formatDistance = (value) =>
        typeof value === "number" ? `${value} km` : "Not verified yet";
    const formatDuration = (value) =>
        typeof value === "number" ? `${value} min` : "Not verified yet";

    return (
        <main className="place-page">
            <div className="place-container">
                <nav className="place-breadcrumb" aria-label="Breadcrumb">
                    <Link to="/">Explore Nashik</Link>
                    <span>/</span>
                    <Link to="/places">Places</Link>
                    <span>/</span>
                    <span>{place.name}</span>
                </nav>

                <section className="place-hero">
                    <div className="place-hero-content">
                        <span className="place-category">{place.category}</span>
                        <h1>{place.name}</h1>
                        <p>{place.description}</p>
                        {place.address && <p className="place-address">📍 {place.address}</p>}
                        <div className="place-hero-actions">
                            <a href={getPlaceMapUrl(place)} target="_blank" rel="noreferrer" className="details-button">
                                Open location in Google Maps ↗
                            </a>
                        </div>
                    </div>
                    <div className="place-hero-image">
                        {place.images?.[0] ? (
                            <img src={place.images[0]} alt={place.name} />
                        ) : (
                            <div className="place-image-placeholder" role="img" aria-label={`Image placeholder for ${place.name}`}>
                                <span className="placeholder-mark">◇</span>
                                <span>YOUR NEXT NASHIK DISCOVERY</span>
                            </div>
                        )}
                    </div>
                </section>

                <section className="travel-section">
                    <div className="section-heading-row">
                        <div>
                            <p className="eyebrow">PLAN YOUR JOURNEY</p>
                            <h2>Getting there</h2>
                        </div>
                        <p className="section-note">Published estimates where available; open Maps for a route</p>
                    </div>
                    <div className="travel-grid">
                        {travelOrigins.map((origin) => {
                            const route = place.distancesFromOrigins?.[origin.key];
                            return (
                                <article className="travel-card" key={origin.key}>
                                    <div className="travel-card-icon">{origin.key === "cbs" ? "📍" : origin.key === "airport" ? "✈️" : "🚉"}</div>
                                    <h3>{origin.label}</h3>
                                    <div className="travel-stat">
                                        <span>Road distance</span>
                                        <strong>{formatDistance(route?.distanceKm)}</strong>
                                    </div>
                                    <div className="travel-stat">
                                        <span>Estimated driving time</span>
                                        <strong>{formatDuration(route?.durationMinutes)}</strong>
                                    </div>
                                    <a href={getDirectionsUrl(origin.address, place)} target="_blank" rel="noreferrer" className="route-link">
                                        Get directions ↗
                                    </a>
                                </article>
                            );
                        })}
                    </div>
                    <p className="travel-disclaimer">Unverified figures are intentionally marked. Google Maps may show different routes and times depending on traffic, road conditions, and the selected entrance.</p>
                </section>

                <section className="visitor-info-grid">
                    <article className="visitor-info-card visit-season-card">
                        <p className="eyebrow">MAKE THE MOST OF IT</p>
                        <h2>When to visit</h2>
                        <p className="best-time">🌿 {place.bestTimeToVisit || "Check seasonal conditions"}</p>
                        <p>{place.bestTimeToVisitReason || "Check current local conditions before travelling."}</p>
                    </article>
                    <article className="visitor-info-card">
                        <p className="eyebrow">BEFORE YOU GO</p>
                        <h2>Entry information</h2>
                        <p className="entry-fee-label">🎟️ Entry fee</p>
                        <p>{place.entryFee || "Verify locally before visiting"}</p>
                        <a href={getPlaceMapUrl(place)} target="_blank" rel="noreferrer" className="details-button">Open in Google Maps ↗</a>
                    </article>
                </section>

                <footer className="place-footer">
                    <strong>NASHIK EXPLORER</strong>
                    <Link to="/places">Find your next discovery</Link>
                </footer>
            </div>
        </main>
    );
}

export default PlaceDetails;
