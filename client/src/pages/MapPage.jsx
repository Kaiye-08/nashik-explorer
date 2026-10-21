import { useEffect, useMemo, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./MapAbout.css";

const API_BASE = (`${import.meta.env.VITE_API_URL}/api/places`, "");
const categories = ["All", "Religious", "Historical", "Nature", "Wine & Leisure"];
const markerIcon = new L.Icon({
  iconUrl: new URL("leaflet/dist/images/marker-icon.png", import.meta.url).href,
  iconRetinaUrl: new URL("leaflet/dist/images/marker-icon-2x.png", import.meta.url).href,
  shadowUrl: new URL("leaflet/dist/images/marker-shadow.png", import.meta.url).href,
  iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41],
});

function MapFocus({ place }) {
  const map = useMap();
  useEffect(() => {
    if (place?.location?.latitude != null && place?.location?.longitude != null) {
      map.flyTo([Number(place.location.latitude), Number(place.location.longitude)], 13, { duration: 0.8 });
    }
  }, [map, place]);
  return null;
}

export default function MapPage() {
  const [places, setPlaces] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    async function loadPlaces() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/places`, { signal: controller.signal });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        const list = Array.isArray(data) ? data : data.places;
        if (!Array.isArray(list)) throw new Error("Unexpected API response");
        setPlaces(list);
      } catch (err) {
        if (err.name !== "AbortError") setError("Couldn't load destinations. Check that your backend is running and GET /api/places is available.");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    loadPlaces();
    return () => controller.abort();
  }, []);

  const mappedPlaces = useMemo(() => places.filter((p) => {
    const lat = Number(p.location?.latitude);
    const lng = Number(p.location?.longitude);
    const hasCoords = p.location?.latitude != null && p.location?.longitude != null && Number.isFinite(lat) && Number.isFinite(lng);
    const matchesCategory = category === "All" || p.category === category;
    const q = search.trim().toLowerCase();
    const matchesSearch = !q || [p.name, p.category, p.shortDescription, p.address]
      .filter(Boolean).some((v) => String(v).toLowerCase().includes(q));
    return hasCoords && matchesCategory && matchesSearch;
  }), [places, category, search]);

  const withCoords = places.filter((p) => p.location?.latitude != null && p.location?.longitude != null &&
    Number.isFinite(Number(p.location.latitude)) && Number.isFinite(Number(p.location.longitude))).length;

  return <main className="explorer-map-page">
    <section className="explorer-map-intro">
      <p className="explorer-eyebrow">FIND YOUR NEXT STOP</p>
      <h1>Explore Nashik on the map</h1>
      <p>From ancient temples and hilltop forts to waterfalls and vineyards, discover places worth adding to your Nashik itinerary.</p>
    </section>

    <section className="map-toolbar">
      <label className="map-search">
        <span aria-hidden="true">⌕</span><span className="sr-only">Search destinations</span>
        <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search temples, forts, waterfalls..." />
      </label>
      <div className="map-category-filters" aria-label="Filter by category">
        {categories.map((item) => <button key={item} type="button" className={category === item ? "is-active" : ""}
          aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}
      </div>
    </section>

    <div className="map-results-line"><span><strong>{mappedPlaces.length}</strong> destinations on the map</span>{loading && <span>Loading…</span>}</div>
    {error && <div className="map-message map-error" role="alert">{error}</div>}
    {!loading && !error && places.length === 0 && <div className="map-message">No destinations were returned by the API. Check your seed data and GET /api/places.</div>}
    {!loading && !error && withCoords < places.length && <p className="map-data-note">{places.length - withCoords} destination(s) have no valid coordinates and cannot be shown.</p>}

    <section className="map-layout">
      <div className="map-canvas">
        <MapContainer center={[19.9975, 73.7898]} zoom={11} scrollWheelZoom className="leaflet-map">
          <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {mappedPlaces.map((p) => <Marker key={p._id || p.slug || p.name} position={[Number(p.location.latitude), Number(p.location.longitude)]}
            icon={markerIcon} eventHandlers={{ click: () => setSelectedPlace(p) }}>
            <Popup><div className="map-popup"><span>{p.category}</span><strong>{p.name}</strong>{p.shortDescription && <p>{p.shortDescription}</p>}
              <a href={`/places/${p.slug}`}>Explore destination ↗</a></div></Popup>
          </Marker>)}
          <MapFocus place={selectedPlace} />
        </MapContainer>
      </div>
      <aside className="map-place-list">
        <div className="map-list-heading"><p className="explorer-eyebrow">YOUR DISCOVERY LIST</p><h2>Places nearby your curiosity</h2></div>
        <div className="map-place-items">
          {mappedPlaces.map((p) => <button key={p._id || p.slug || p.name} type="button"
            className={`map-place-item ${selectedPlace?.slug === p.slug ? "selected" : ""}`} onClick={() => setSelectedPlace(p)}>
            <span className="map-place-dot">↗</span><span className="map-place-item-copy"><strong>{p.name}</strong><small>{p.category}</small></span><span>›</span>
          </button>)}
          {!loading && mappedPlaces.length === 0 && <p className="map-empty">No matching destinations. Try another search or category.</p>}
        </div>
        <p className="map-list-note">Select a destination to fly to its marker. Open the marker popup to visit its details page.</p>
      </aside>
    </section>
  </main>;
}
