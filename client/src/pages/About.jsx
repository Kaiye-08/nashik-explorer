import { Link } from "react-router-dom";
import "./MapAbout.css";

const highlights = [
  { n: "01", symbol: "✧", title: "Spiritual heritage", text: "Discover sacred places, temple architecture, and stories woven into Nashik's spiritual traditions." },
  { n: "02", symbol: "⌂", title: "History & culture", text: "Explore ancient caves, forts, museums, and historic corners that reveal the region's many chapters." },
  { n: "03", symbol: "❋", title: "Nature escapes", text: "Find hills, monsoon waterfalls, scenic viewpoints, and peaceful places to slow down." },
  { n: "04", symbol: "❧", title: "Vineyards & leisure", text: "Add a relaxed countryside stop and explore Nashik's well-known vineyard destinations." },
];

export default function About() {
  return <main className="about-page">
    <section className="about-hero">
      <div className="about-hero-content">
        <p className="explorer-eyebrow">A LITTLE MORE ABOUT US</p>
        <h1>Every corner has a story. <span>Let's find yours.</span></h1>
        <p className="about-hero-description">Nashik Explorer helps you discover the places, landscapes, and local treasures that make Nashik worth exploring, one destination at a time.</p>
        <div className="about-hero-actions"><Link className="about-primary-button" to="/places">Explore destinations ↗</Link><Link className="about-secondary-button" to="/map">Open the map</Link></div>
      </div>
      <div className="about-hero-art" role="img" aria-label="Stylized green hills inspired by Nashik">
        <div className="about-sun" /><div className="about-hill about-hill-back" /><div className="about-hill about-hill-front" />
        <div className="about-art-label"><span>DISCOVER</span><strong>NASHIK</strong><small>MAHARASHTRA · INDIA</small></div>
      </div>
    </section>

    <section className="about-story">
      <div><p className="explorer-eyebrow">THE IDEA</p><h2>A simpler way to plan your next outing.</h2></div>
      <div className="about-story-copy">
        <p>Planning a day out can mean jumping between maps, travel guides, and scattered websites. Nashik Explorer brings useful destination information together in one place, so you can spend less time searching and more time deciding where to go.</p>
        <p>Browse places by interest, compare approximate travel distances from key starting points, check suggested visiting seasons, and open directions when you're ready to head out.</p>
      </div>
    </section>

    <section className="about-discover">
      <div className="about-section-heading"><div><p className="explorer-eyebrow">A REGION OF MANY MOODS</p><h2>What would you like to discover?</h2></div><p>Temple mornings, green trails, history-filled afternoons, or a leisurely escape.</p></div>
      <div className="about-highlight-grid">{highlights.map((item) => <article className="about-highlight-card" key={item.n}>
        <div className="about-highlight-top"><span className="about-highlight-symbol">{item.symbol}</span><span className="about-highlight-number">{item.n}</span></div>
        <h3>{item.title}</h3><p>{item.text}</p>
      </article>)}</div>
    </section>

    <section className="about-how">
      <div><p className="explorer-eyebrow">MADE FOR EXPLORERS</p><h2>Your next trip starts with a little curiosity.</h2>
        <p>Destination details and travel estimates are intended to help with planning. Routes, access, entry fees, and local conditions can change, so check current information before travelling.</p></div>
      <div className="about-how-steps">
        <div><span>1</span><p><strong>Find a place</strong><small>Browse the destination collection.</small></p></div>
        <div><span>2</span><p><strong>Plan your visit</strong><small>Review distances and suggested seasons.</small></p></div>
        <div><span>3</span><p><strong>Head out</strong><small>Open directions and enjoy the journey.</small></p></div>
      </div>
    </section>

    <section className="about-cta"><p className="explorer-eyebrow">YOUR NASHIK STORY AWAITS</p><h2>Ready to see where the road takes you?</h2>
      <p>Start with a place you've never visited. You might find a new favourite.</p><Link className="about-primary-button" to="/places">Start exploring ↗</Link>
    </section>
  </main>;
}
