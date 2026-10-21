
import { Link } from "react-router-dom";

function PlaceCard({ place }) {
    const origins = [
        { key: "cbs", label: "CBS Nashik" },
        { key: "airport", label: "Nashik Airport" },
        {
            key: "railwayStation",
            label: "Nashik Road Railway Station"
        }
    ];

    return (
        <article className="place-card">
            <Link
                to={`/places/${place.slug}`}
                className="place-card-image-link"
                aria-label={`Explore ${place.name}`}
            >
                {place.images?.length > 0 ? (
                    <img
                        className="place-card-image"
                        src={place.images[0]}
                        alt={place.name}
                        loading="lazy"
                    />
                ) : (
                    <div className="place-card-placeholder">
                        <span aria-hidden="true">◈</span>
                        <p>DISCOVER NASHIK</p>
                    </div>
                )}
            </Link>

            <div className="place-card-content">
                <span className="place-card-category">
                    {place.category}
                </span>

                <h3>{place.name}</h3>

                <p className="place-card-description">
                    {place.shortDescription}
                </p>

                <div className="place-card-travel">
                    <h4>Getting here</h4>

                    {origins.map((origin) => {
                        const route =
                            place.distancesFromOrigins?.[origin.key];

                        return (
                            <div
                                className="place-card-distance"
                                key={origin.key}
                            >
                                <span>{origin.label}</span>

                                <strong>
                                    {route?.distanceKm != null
                                        ? `${route.distanceKm} km`
                                        : "N/A"}
                                </strong>

                                <span className="distance-time">
                                    {route?.durationMinutes != null
                                        ? `${route.durationMinutes} min`
                                        : "N/A"}
                                </span>
                            </div>
                        );
                    })}
                </div>

                <Link
                    to={`/places/${place.slug}`}
                    className="details-button"
                >
                    Explore destination <span aria-hidden="true">↗</span>
                </Link>
            </div>
        </article>
    );
}

export default PlaceCard;
