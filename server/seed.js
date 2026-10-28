const dotenv = require("dotenv");
const connectDB = require("./config/db");
const Place = require("./models/Place");

dotenv.config();

const places = [
    {
        name: "Panchavati", slug: "panchavati", category: "Religious",
        description: "A historic and sacred neighbourhood on the Godavari's banks, home to many of Nashik's best-known temples and pilgrimage sites.",
        shortDescription: "Historic pilgrimage neighbourhood by the Godavari",
        address: "Panchavati, Nashik, Maharashtra, India", location: { latitude: 20.008300, longitude: 73.791400 },
        distancesFromOrigins: { cbs: { distanceKm: 3, durationMinutes: 15 }, airport: { distanceKm: 24, durationMinutes: 40 }, railwayStation: { distanceKm: 10, durationMinutes: 25 } },
        bestTimeToVisit: "October to March", bestTimeToVisitReason: "Cooler weather is generally more comfortable for walking between temples. Festival days can be crowded.", entryFee: "Generally free; individual attractions may differ", images: ["/images/panchavati.jpg"], googlePlaceId: "", featured: true
    },
    {
        name: "Ramkund", slug: "ramkund", category: "Religious",
        description: "A sacred bathing tank on the Godavari River, closely associated with Nashik's religious traditions and pilgrimage rituals.",
        shortDescription: "Sacred riverside bathing tank in Panchavati",
        address: "Ramkund, Panchavati, Nashik, Maharashtra, India", location: { latitude: 20.005600, longitude: 73.787500 },
        distancesFromOrigins: { cbs: { distanceKm: 2, durationMinutes: 10 }, airport: { distanceKm: 24, durationMinutes: 40 }, railwayStation: { distanceKm: 10, durationMinutes: 25 } },
        bestTimeToVisit: "October to March", bestTimeToVisitReason: "The cooler months are generally comfortable for exploring the riverfront and nearby temples.", entryFee: "Generally free", images: ["/images/ramkund.jpg"], googlePlaceId: "", featured: true
    },
    {
        name: "Kalaram Temple", slug: "kalaram-temple", category: "Religious",
        description: "A prominent temple in Panchavati dedicated to Lord Rama, noted for its dark-stone architecture and important place in Nashik's religious history.",
        shortDescription: "Historic Lord Rama temple in Panchavati",
        address: "Kalaram Temple, Panchavati, Nashik, Maharashtra, India", location: { latitude: 20.006910, longitude: 73.795606 },
        distancesFromOrigins: { cbs: { distanceKm: 3, durationMinutes: 15 }, airport: { distanceKm: 24, durationMinutes: 40 }, railwayStation: { distanceKm: 10, durationMinutes: 25 } },
        bestTimeToVisit: "October to March", bestTimeToVisitReason: "Pleasant weather helps with exploring the temple and nearby heritage sites. Expect larger crowds during festivals.", entryFee: "Generally free; verify locally", images: ["/images/kalaram-temple.jpg"], googlePlaceId: "", featured: true
    },
    {
        name: "Trimbakeshwar Temple", slug: "trimbakeshwar-temple", category: "Religious",
        description: "A revered Shiva temple near Brahmagiri Hill and one of India's twelve Jyotirlingas, making it a major pilgrimage destination.",
        shortDescription: "One of India's twelve Jyotirlinga temples",
        address: "Trimbakeshwar Temple, Trimbak, Nashik, Maharashtra, India", location: { latitude: 19.932130, longitude: 73.530750 },
        distancesFromOrigins: { cbs: { distanceKm: 30, durationMinutes: 45 }, airport: { distanceKm: 55, durationMinutes: 80 }, railwayStation: { distanceKm: 40, durationMinutes: 60 } },
        bestTimeToVisit: "October to March", bestTimeToVisitReason: "Cooler weather is generally more comfortable for the pilgrimage. Monsoon weather can affect nearby hill routes, and festival days can be very busy.", entryFee: "Temple entry generally free; special rituals may cost extra", images: ["/images/trimbakeshwar-temple.jpg"], googlePlaceId: "", featured: true
    },
    {
        name: "Kushavart Tirtha", slug: "kushavart-tirtha", category: "Religious",
        description: "A historic sacred water tank in Trimbak, about 300–400 metres from Trimbakeshwar Temple and associated with the Godavari's sacred traditions.",
        shortDescription: "Sacred historic tank in Trimbak",
        address: "Kushavart Tirtha, Trimbak, Nashik, Maharashtra, India", location: { latitude: 19.932735, longitude: 73.527729 },
        distancesFromOrigins: { cbs: { distanceKm: 30, durationMinutes: 50 }, airport: { distanceKm: 55, durationMinutes: 80 }, railwayStation: { distanceKm: 40, durationMinutes: 60 } },
        bestTimeToVisit: "October to March", bestTimeToVisitReason: "The cooler season is more comfortable for visiting Trimbak and its temple precincts.", entryFee: "Generally free; verify locally", images: ["/images/kushavart-tirtha.jpg"], googlePlaceId: "", featured: false
    },
    {
        name: "Muktidham Temple", slug: "muktidham-temple", category: "Religious",
        description: "A white-marble temple complex near Nashik Road Railway Station, known for its replicas of important Hindu shrines and pilgrimage significance.",
        shortDescription: "White-marble temple complex near Nashik Road",
        address: "Muktidham Temple, Nashik Road, Nashik, Maharashtra, India", location: { latitude: 19.951802, longitude: 73.836952 },
        distancesFromOrigins: { cbs: { distanceKm: 8, durationMinutes: 20 }, airport: { distanceKm: 21, durationMinutes: 40 }, railwayStation: { distanceKm: 1.5, durationMinutes: 10 } },
        bestTimeToVisit: "October to March", bestTimeToVisitReason: "The cooler months are generally comfortable for visiting the temple complex.", entryFee: "Generally free; verify locally", images: ["/images/muktidham-temple.jpg"], googlePlaceId: "", featured: false
    },
    {
        name: "Someshwar Temple", slug: "someshwar-temple", category: "Religious",
        description: "A riverside temple dedicated to Lord Shiva and Lord Hanuman in a green area along the Gangapur Road side of Nashik.",
        shortDescription: "Riverside Shiva temple on Gangapur Road",
        address: "Someshwar Temple, Gangapur Road, Nashik, Maharashtra, India", location: { latitude: 20.029500, longitude: 73.723400 },
        distancesFromOrigins: { cbs: { distanceKm: 8, durationMinutes: 20 }, airport: { distanceKm: 24, durationMinutes: 40 }, railwayStation: { distanceKm: 15, durationMinutes: 30 } },
        bestTimeToVisit: "October to March", bestTimeToVisitReason: "The riverside setting is pleasant in cooler months. Take care near the water, especially during monsoon.", entryFee: "Generally free; verify locally", images: ["/images/someshwar-temple.jpg"], googlePlaceId: "", featured: false
    },
    {
        name: "Navshya Ganpati Temple", slug: "navshya-ganpati-temple", category: "Religious",
        description: "A well-known Ganesh temple in Anandvalli, traditionally associated with the Peshwa-era history of the area.",
        shortDescription: "Beloved Ganesh temple in Anandvalli",
        address: "Navshya Ganpati Temple, Anandvalli, Nashik, Maharashtra, India", location: { latitude: 19.997158, longitude: 73.752639 },
        distancesFromOrigins: { cbs: { distanceKm: 8, durationMinutes: 20 }, airport: { distanceKm: 24, durationMinutes: 40 }, railwayStation: { distanceKm: 15, durationMinutes: 30 } },
        bestTimeToVisit: "October to March", bestTimeToVisitReason: "Comfortable weather is ideal for a temple visit; Ganesh festival periods may be busier.", entryFee: "Generally free; verify locally", images: ["/images/navshya-ganpati-temple.jpg"], googlePlaceId: "", featured: false
    },
    {
        name: "Pandav Leni Caves", slug: "pandav-leni-caves", category: "Historical",
        description: "Ancient Buddhist rock-cut caves on Trirashmi Hill, known for their inscriptions, carvings and archaeological significance.",
        shortDescription: "Ancient Buddhist rock-cut caves near Nashik",
        address: "Pandav Leni, Nashik, Maharashtra, India", location: { latitude: 19.940800, longitude: 73.748900 },
        distancesFromOrigins: { cbs: { distanceKm: 8, durationMinutes: 20 }, airport: { distanceKm: 24, durationMinutes: 40 }, railwayStation: { distanceKm: 10, durationMinutes: 25 } },
        bestTimeToVisit: "November to February", bestTimeToVisitReason: "Cooler, generally drier weather makes the uphill walk and cave exploration more comfortable.", entryFee: "Verify current ASI entry fee and timings", images: ["/images/pandav-leni-caves.jpg"], googlePlaceId: "", featured: true
    },
    {
        name: "Dadasaheb Phalke Smarak", slug: "dadasaheb-phalke-smarak", category: "Historical",
        description: "A memorial and park named for Dadasaheb Phalke, the pioneering Indian filmmaker, near the Pandav Leni area.",
        shortDescription: "Memorial celebrating the pioneer of Indian cinema",
        address: "Dadasaheb Phalke Smarak, Nashik, Maharashtra, India", location: { latitude: 19.943350, longitude: 73.750040 },
        distancesFromOrigins: { cbs: { distanceKm: 8, durationMinutes: 20 }, airport: { distanceKm: 24, durationMinutes: 40 }, railwayStation: { distanceKm: 10, durationMinutes: 25 } },
        bestTimeToVisit: "November to February", bestTimeToVisitReason: "Cooler weather is more comfortable for walking around the grounds. Confirm current opening status before visiting.", entryFee: "Verify current entry fee and opening status", images: ["/images/dadasaheb-phalke-smarak.jpg"], googlePlaceId: "", featured: false
    },
    {
        name: "Coin Museum", slug: "coin-museum", category: "Historical",
        description: "A specialist museum on the Nashik–Trimbakeshwar Road documenting the history of Indian currency and numismatics.",
        shortDescription: "Museum dedicated to Indian currency history",
        address: "Coin Museum, INHCRF Campus, Trimbakeshwar Road, Nashik, Maharashtra, India", location: { latitude: 19.957703, longitude: 73.610941 },
        distancesFromOrigins: { cbs: { distanceKm: 20, durationMinutes: 35 }, airport: { distanceKm: 34, durationMinutes: 50 }, railwayStation: { distanceKm: 29, durationMinutes: 45 } },
        bestTimeToVisit: "October to March", bestTimeToVisitReason: "An indoor museum visit works year-round, but cooler weather makes combining it with nearby outdoor stops easier.", entryFee: "Verify current entry fee and opening days", images: ["/images/coin-museum.jpg"], googlePlaceId: "", featured: false
    },
    {
        name: "Gargoti Museum", slug: "gargoti-museum", category: "Historical",
        description: "A mineral and crystal museum in Sinnar featuring specimens, mineral formations and geological displays.",
        shortDescription: "Minerals, crystals and geological exhibits in Sinnar",
        address: "Gargoti Museum, Malegaon MIDC, Sinnar, Nashik district, Maharashtra, India", location: { latitude: 19.871822, longitude: 73.972304 },
        distancesFromOrigins: { cbs: { distanceKm: 27, durationMinutes: 25 }, airport: { distanceKm: 45, durationMinutes: 65 }, railwayStation: { distanceKm: 31, durationMinutes: 50 } },
        bestTimeToVisit: "Year-round", bestTimeToVisitReason: "Most of the experience is indoors; check current visitor hours and booking requirements.", entryFee: "Paid admission; verify current rates", images: ["/images/gargoti-museum.jpg"], googlePlaceId: "", featured: false
    },
    {
        name: "Sarkar Wada", slug: "sarkar-wada", category: "Historical",
        description: "A historic wada in Nashik associated with the city's Maratha-era architectural and civic heritage.",
        shortDescription: "Historic wada in old Nashik",
        address: "Sarkar Wada, old city, Nashik, Maharashtra, India", location: { latitude: 20.006039, longitude: 73.790100 },
        distancesFromOrigins: { cbs: { distanceKm: 2, durationMinutes: 10 }, airport: { distanceKm: 24, durationMinutes: 40 }, railwayStation: { distanceKm: 10, durationMinutes: 25 } },
        bestTimeToVisit: "October to March", bestTimeToVisitReason: "Cooler weather is better for exploring old-city streets on foot. Confirm public access before visiting.", entryFee: "Verify access and any fee locally", images: ["/images/sarkar-wada.jpg"], googlePlaceId: "", featured: false
    },
    {
        name: "Dudhsagar Waterfall", slug: "dudhsagar-waterfall", category: "Nature",
        description: "A small seasonal cascade near Someshwar Temple on the Godavari, named for its milky-white appearance when flowing well.",
        shortDescription: "Milky cascade near Someshwar Temple",
        address: "Dudhsagar Waterfall, near Someshwar Temple, Nashik, Maharashtra, India", location: { latitude: 20.029800, longitude: 73.722200 },
        distancesFromOrigins: { cbs: { distanceKm: 8, durationMinutes: 20 }, airport: { distanceKm: 28, durationMinutes: 45 }, railwayStation: { distanceKm: 15, durationMinutes: 30 } },
        bestTimeToVisit: "June to September", bestTimeToVisitReason: "Monsoon rains usually strengthen the cascade. Avoid slippery rocks and dangerous water conditions.", entryFee: "Verify locally", images: ["/images/dudhsagar-waterfall.jpg"], googlePlaceId: "", featured: false
    },
    {
        name: "Someshwar Waterfall", slug: "someshwar-waterfall", category: "Nature",
        description: "A small waterfall on the Godavari near Someshwar Temple, popular for its monsoon scenery and nearby riverside setting.",
        shortDescription: "Seasonal waterfall near Someshwar Temple",
        address: "Someshwar Waterfall, Nashik, Maharashtra, India", location: { latitude: 20.029200, longitude: 73.723400 },
        distancesFromOrigins: { cbs: { distanceKm: 8, durationMinutes: 20 }, airport: { distanceKm: 24, durationMinutes: 40 }, railwayStation: { distanceKm: 15, durationMinutes: 30 } },
        bestTimeToVisit: "June to September", bestTimeToVisitReason: "Monsoon rainfall generally brings stronger flow and greener surroundings. Stay away from fast-moving water.", entryFee: "Verify locally", images: ["/images/someshwar-waterfall.jpg"], googlePlaceId: "", featured: false
    },
    {
        name: "Dugarwadi Waterfall", slug: "dugarwadi-waterfall", category: "Nature",
        description: "A forest-fringed waterfall near Trimbakeshwar, known for its lush monsoon landscape and short approach from the road.",
        shortDescription: "Forest waterfall near Trimbakeshwar",
        address: "Dugarwadi Waterfall, near Trimbakeshwar, Nashik district, Maharashtra, India", location: { latitude: 19.940600, longitude: 73.468400 },
        distancesFromOrigins: { cbs: { distanceKm: 35, durationMinutes: 55 }, airport: { distanceKm: 55, durationMinutes: 85 }, railwayStation: { distanceKm: 45, durationMinutes: 70 } },
        bestTimeToVisit: "July to October", bestTimeToVisitReason: "The waterfall is most impressive during and after monsoon rainfall. Access can be slippery or unsafe in heavy rain.", entryFee: "Verify local parking/access fees", images: ["/images/dugarwadi-waterfall.jpg"], googlePlaceId: "", featured: false
    },
    {
        name: "Mahiravani Waterfall", slug: "mahiravani-waterfall", category: "Nature",
        description: "A seasonal waterfall and green escape in the Mahiravani area west of Nashik, especially visited during the monsoon.",
        shortDescription: "Seasonal waterfall in the Mahiravani area",
        address: "Mahiravani Waterfall, Mahiravani, Nashik district, Maharashtra, India", location: { latitude: 19.966340, longitude: 73.661170 },
        distancesFromOrigins: { cbs: { distanceKm: 13, durationMinutes: 20 }, airport: { distanceKm: 30, durationMinutes: 50 }, railwayStation: { distanceKm: 20, durationMinutes: 35 } },
        bestTimeToVisit: "July to September", bestTimeToVisitReason: "Monsoon rains bring greener scenery and seasonal flow. Verify access locally and avoid entering floodwater.", entryFee: "Verify locally", images: ["/images/mahiravani-waterfall.jpg"], googlePlaceId: "", featured: false
    },
    {
        name: "Pahine Waterfall", slug: "pahine-waterfall", category: "Nature",
        description: "A monsoon-season waterfall in the hilly Pahine area near Trimbakeshwar, surrounded by the Western Ghats landscape.",
        shortDescription: "Monsoon waterfall in the Trimbak hills",
        address: "Pahine Waterfall, Pahine, Nashik district, Maharashtra, India", location: { latitude: 19.899390, longitude: 73.552740 },
        distancesFromOrigins: { cbs: { distanceKm: 40, durationMinutes: 60 }, airport: { distanceKm: 60, durationMinutes: 90 }, railwayStation: { distanceKm: 50, durationMinutes: 75 } },
        bestTimeToVisit: "July to October", bestTimeToVisitReason: "Seasonal flow is strongest around the monsoon. Use caution on wet trails and check local conditions.", entryFee: "Verify locally", images: ["/images/pahine-waterfall.jpg"], googlePlaceId: "", featured: false
    },
    {
        name: "Sula Vineyards", slug: "sula-vineyards", category: "Wine & Leisure",
        description: "A well-known winery in the Nashik wine region offering vineyard scenery and visitor experiences. Activities and booking requirements vary.",
        shortDescription: "Vineyard destination near Gangapur Dam",
        address: "Sula Vineyards, Gangapur-Savargaon Road, Nashik, Maharashtra, India", location: { latitude: 20.006600, longitude: 73.687780 },
        distancesFromOrigins: { cbs: { distanceKm: 12, durationMinutes: 25 }, airport: { distanceKm: 32.4, durationMinutes: 31 }, railwayStation: { distanceKm: 15, durationMinutes: 30 } },
        bestTimeToVisit: "November to February", bestTimeToVisitReason: "Cooler weather is generally pleasant for the vineyard landscape. Check the venue's current visitor schedule and booking options.", entryFee: "Depends on the experience; verify with the venue", images: ["/images/sula-vineyards.jpg"], googlePlaceId: "", featured: true
    },
    {
        name: "York Winery", slug: "york-winery", category: "Wine & Leisure",
        description: "A winery on Gangapur-Savargaon Road in the Nashik wine region, known for vineyard views and visitor experiences.",
        shortDescription: "Winery overlooking the Nashik countryside",
        address: "York Winery, Gangapur-Savargaon Road, Gangavhare, Nashik, Maharashtra, India", location: { latitude: 20.011880, longitude: 73.673430 },
        distancesFromOrigins: { cbs: { distanceKm: 12, durationMinutes: 25 }, airport: { distanceKm: 32, durationMinutes: 50 }, railwayStation: { distanceKm: 10.5, durationMinutes: 25 } },
        bestTimeToVisit: "November to February", bestTimeToVisitReason: "The cooler season is generally pleasant for a vineyard visit. Confirm current timings and experiences in advance.", entryFee: "Depends on the experience; verify with the venue", images: ["/images/york-winery.jpg"], googlePlaceId: "", featured: false
    },
    {
        name: "Anjaneri Hills", slug: "anjaneri-hills", category: "Nature",
        description: "A prominent hill and trekking destination between Nashik and Trimbakeshwar, associated with Hanuman and containing historic Jain caves.",
        shortDescription: "Scenic trekking hill between Nashik and Trimbak",
        address: "Anjaneri Hills, Trimbak Road, Nashik district, Maharashtra, India", location: { latitude: 19.937500, longitude: 73.581861 },
        distancesFromOrigins: { cbs: { distanceKm: 20, durationMinutes: 35 }, airport: { distanceKm: 40, durationMinutes: 60 }, railwayStation: { distanceKm: 30, durationMinutes: 45 } },
        bestTimeToVisit: "October to February; monsoon for experienced trekkers", bestTimeToVisitReason: "Post-monsoon and winter weather is generally more comfortable. Monsoon trails can be slippery and require extra caution.", entryFee: "Verify local entry/parking rules", images: ["/images/anjaneri-hills.jpg"], googlePlaceId: "", featured: true
    },
    {
        name: "Harihar Fort", slug: "harihar-fort", category: "Historical",
        description: "A hill fort famous for its steep rock-cut stairway and views across the Nashik district. The final ascent is exposed and demanding.",
        shortDescription: "Dramatic fort with steep rock-cut steps",
        address: "Harihar Fort, Harshewadi/Nirgudpada area, Nashik district, Maharashtra, India", location: { latitude: 19.906100, longitude: 73.472100 },
        distancesFromOrigins: { cbs: { distanceKm: 40, durationMinutes: 60 }, airport: { distanceKm: 60, durationMinutes: 90 }, railwayStation: { distanceKm: 50, durationMinutes: 75 } },
        bestTimeToVisit: "October to February", bestTimeToVisitReason: "Dryer weather is safer for the exposed rock-cut steps. Avoid attempting the climb in heavy rain or strong winds.", entryFee: "Verify local rules; guide recommended for inexperienced trekkers", images: ["/images/harihar-fort.jpg"], googlePlaceId: "", featured: false
    },
    {
        name: "Ramshej Fort", slug: "ramshej-fort", category: "Historical",
        description: "A historic hill fort north-west of Nashik associated with Maratha resistance and offering a relatively short local trekking outing.",
        shortDescription: "Historic hill fort near Nashik",
        address: "Ramshej Fort, Ramshej, Nashik district, Maharashtra, India", location: { latitude: 20.113680, longitude: 73.767050 },
        distancesFromOrigins: { cbs: { distanceKm: 15, durationMinutes: 20 }, airport: { distanceKm: 32, durationMinutes: 50 }, railwayStation: { distanceKm: 22, durationMinutes: 40 } },
        bestTimeToVisit: "October to February", bestTimeToVisitReason: "Cooler, drier weather is generally better for the approach trail and summit.", entryFee: "Verify locally", images: ["/images/ramshej-fort.jpg"], googlePlaceId: "", featured: false
    },
    {
        name: "Saptashrungi Gad", slug: "saptashrungi-gad", category: "Religious",
        description: "A major hilltop shrine dedicated to the goddess Saptashrungi, surrounded by seven peaks in the Vani area of Nashik district.",
        shortDescription: "Hilltop goddess shrine near Vani",
        address: "Saptashrungi Gad, Vani, Kalwan, Nashik district, Maharashtra, India", location: { latitude: 20.390280, longitude: 73.908610 },
        distancesFromOrigins: { cbs: { distanceKm: 65, durationMinutes: 105 }, airport: { distanceKm: 88, durationMinutes: 140 }, railwayStation: { distanceKm: 75, durationMinutes: 120 } },
        bestTimeToVisit: "October to March", bestTimeToVisitReason: "Cooler weather is more comfortable for the hilltop visit. Major Navratri periods draw large crowds.", entryFee: "Generally free; verify ropeway and special services if used", images: ["/images/saptashrungi-gad.jpg"], googlePlaceId: "", featured: false
    },
    {
        name: "Brahmagiri Hills", slug: "brahmagiri-hills", category: "Nature",
        description: "A mountain near Trimbakeshwar associated with the source region of the Godavari and a popular trekking and pilgrimage landscape.",
        shortDescription: "Sacred mountain above Trimbakeshwar",
        address: "Brahmagiri Hills, Trimbak, Nashik district, Maharashtra, India", location: { latitude: 19.933000, longitude: 73.533000 },
        distancesFromOrigins: { cbs: { distanceKm: 31, durationMinutes: 50 }, airport: { distanceKm: 55, durationMinutes: 80 }, railwayStation: { distanceKm: 40, durationMinutes: 60 } },
        bestTimeToVisit: "October to February", bestTimeToVisitReason: "Cooler, drier conditions are generally better for hiking. Check trail access and weather before setting out.", entryFee: "Verify local access rules", images: ["/images/brahmagiri-hills.jpg"], googlePlaceId: "", featured: false
    },
    {
        name: "Sita Gufa", slug: "sita-gufa", category: "Religious",
        description: "A small cave shrine in Panchavati associated with the Ramayana tradition and visited as part of the area's pilgrimage circuit.",
        shortDescription: "Cave shrine in Panchavati",
        address: "Sita Gufa Road, Panchavati, Nashik, Maharashtra, India", location: { latitude: 20.007720, longitude: 73.796160 },
        distancesFromOrigins: { cbs: { distanceKm: 3, durationMinutes: 15 }, airport: { distanceKm: 24, durationMinutes: 40 }, railwayStation: { distanceKm: 10, durationMinutes: 25 } },
        bestTimeToVisit: "October to March", bestTimeToVisitReason: "The cooler months are comfortable for exploring nearby temples on foot. The cave passage may be narrow and crowded.", entryFee: "Verify locally", images: ["/images/sita-gufa.jpg"], googlePlaceId: "", featured: false
    },
    {
        name: "Kapaleshwar Mahadev Temple", slug: "kapaleshwar-mahadev-temple", category: "Religious",
        description: "An old Shiva temple near Ramkund in Panchavati, forming part of Nashik's dense cluster of riverside pilgrimage sites.",
        shortDescription: "Historic Shiva temple near Ramkund",
        address: "Kapaleshwar Mahadev Temple, Panchavati, Nashik, Maharashtra, India", location: { latitude: 20.005400, longitude: 73.787800 },
        distancesFromOrigins: { cbs: { distanceKm: 2, durationMinutes: 10 }, airport: { distanceKm: 24, durationMinutes: 40 }, railwayStation: { distanceKm: 10, durationMinutes: 25 } },
        bestTimeToVisit: "October to March", bestTimeToVisitReason: "Pleasant weather is ideal for walking between the temples of Panchavati.", entryFee: "Generally free; verify locally", images: ["/images/kapaleshwar-mahadev-temple.jpg"], googlePlaceId: "", featured: false
    },
    {
        name: "Sundar Narayan Temple", slug: "sundar-narayan-temple", category: "Religious",
        description: "A historic Vishnu temple in old Nashik, noted for its traditional architecture and location near the Godavari riverfront.",
        shortDescription: "Historic Vishnu temple in old Nashik",
        address: "Sundar Narayan Temple, Ahillyabai Holkar Bridge area, Nashik, Maharashtra, India", location: { latitude: 20.008110, longitude: 73.790040 },
        distancesFromOrigins: { cbs: { distanceKm: 2, durationMinutes: 10 }, airport: { distanceKm: 24, durationMinutes: 40 }, railwayStation: { distanceKm: 10, durationMinutes: 25 } },
        bestTimeToVisit: "October to March", bestTimeToVisitReason: "Cooler weather is more comfortable for visiting old Nashik on foot.", entryFee: "Generally free; verify locally", images: ["/images/sundar-narayan-temple.jpg"], googlePlaceId: "", featured: false
    },
    {
        name: "Tapovan", slug: "tapovan", category: "Religious",
        description: "A religious and riverside area in Panchavati connected with local Ramayana traditions and several shrines.",
        shortDescription: "Riverside pilgrimage area in Panchavati",
        address: "Tapovan, Panchavati, Nashik, Maharashtra, India", location: { latitude: 19.999883, longitude: 73.815243 },
        distancesFromOrigins: { cbs: { distanceKm: 4.5, durationMinutes: 18 }, airport: { distanceKm: 24, durationMinutes: 40 }, railwayStation: { distanceKm: 10, durationMinutes: 25 } },
        bestTimeToVisit: "October to March", bestTimeToVisitReason: "The cooler season is generally comfortable for exploring the area. Follow local guidance around riverbanks.", entryFee: "Generally free; individual sites may differ", images: ["/images/tapovan.jpg"], googlePlaceId: "", featured: false
    },
    {
        name: "Nandur Madhmeshwar Bird Sanctuary", slug: "nandur-madhmeshwar-bird-sanctuary", category: "Nature",
        description: "A wetland sanctuary in Nashik district known for migratory and resident birds, especially during the winter birding season.",
        shortDescription: "Wetland sanctuary and birdwatching destination",
        address: "Nandur Madhmeshwar Bird Sanctuary, Niphad, Nashik district, Maharashtra, India", location: { latitude: 20.024500, longitude: 74.107700 },
        distancesFromOrigins: { cbs: { distanceKm: 48, durationMinutes: 70 }, airport: { distanceKm: 70, durationMinutes: 100 }, railwayStation: { distanceKm: 55, durationMinutes: 80 } },
        bestTimeToVisit: "November to February", bestTimeToVisitReason: "Winter is typically the best season for migratory birdwatching. Check sanctuary timings and access rules before travelling.", entryFee: "Verify current sanctuary entry and vehicle fees", images: ["/images/nandur-madhmeshwar-bird-sanctuary.jpg"], googlePlaceId: "", featured: false
    },
    {
        name: "Dhodap Fort", slug: "dhodap-fort", category: "Historical",
        description: "A major hill fort in Nashik district with a distinctive rocky profile and expansive views; the trek requires preparation and suitable conditions.",
        shortDescription: "Impressive hill fort in Nashik district",
        address: "Dhodap Fort, Hatti village area, Nashik district, Maharashtra, India", location: { latitude: 20.385400, longitude: 74.030900 },
        distancesFromOrigins: { cbs: { distanceKm: 61, durationMinutes: 67 }, airport: { distanceKm: 75, durationMinutes: 110 }, railwayStation: { distanceKm: 70, durationMinutes: 100 } },
        bestTimeToVisit: "October to February", bestTimeToVisitReason: "Dryer weather is generally better for trekking. Plan daylight hours, carry water, and check local trail conditions.", entryFee: "Verify locally; guide recommended for unfamiliar routes", images: ["/images/dhodap-fort.jpg"], googlePlaceId: "", featured: false
    },
    {
        name: "Dehergad Fort", slug: "dehergad-fort", category: "Historical",
        description: "A lesser-known hill fort in the Nashik region that appeals to trekkers interested in local history and rugged landscapes.",
        shortDescription: "Offbeat fort trek near Nashik",
        address: "Dehergad Fort, Nashik district, Maharashtra, India", location: { latitude: 20.126900, longitude: 73.744900 },
        distancesFromOrigins: { cbs: { distanceKm: 15, durationMinutes: 25 }, airport: { distanceKm: 30, durationMinutes: 50 }, railwayStation: { distanceKm: 12.2, durationMinutes: 30 } },
        bestTimeToVisit: "October to February", bestTimeToVisitReason: "Drier weather is generally better for hiking. Confirm the trailhead and local access conditions before departure.", entryFee: "Verify locally", images: ["/images/dehergad-fort.jpg"], googlePlaceId: "", featured: false
    },
    {
        name: "Kumaramangalam Artillery Museum", slug: "kumar-mangalam-artillery-museum", category: "Historical",
        description: "A military museum in the Deolali area displaying artillery history and equipment. Visitor access may be subject to security and current rules.",
        shortDescription: "Military history museum in Deolali",
        address: "Kumaramangalam Artillery Museum, Artillery Centre, Deolali, Nashik, Maharashtra, India", location: { latitude: 19.943506, longitude: 73.809136 },
        distancesFromOrigins: { cbs: { distanceKm: 12, durationMinutes: 25 }, airport: { distanceKm: 30, durationMinutes: 45 }, railwayStation: { distanceKm: 2.3, durationMinutes: 10 } },
        bestTimeToVisit: "Year-round, subject to access", bestTimeToVisitReason: "Check public visiting hours, identification requirements, and access permission before travelling.", entryFee: "Confirm public access and fees before visiting", images: ["/images/kumar-mangalam-artillery-museum.jpg"], googlePlaceId: "", featured: false
    }
];

const seedDatabase = async () => {
    try {
        await connectDB();

        for (const placeData of places) {
            await Place.findOneAndUpdate(
                { slug: placeData.slug },
                {
                    $set: placeData,
                    $unset: { distancefromCBS: "" }
                },
                {
                    upsert: true,
                    new: true,
                    runValidators: true,
                    setDefaultsOnInsert: true
                }
            );

            console.log(`Seeded: ${placeData.name}`);
        }

        console.log(`\nSeeding complete! Processed ${places.length} places.`);
    } catch (error) {
        console.error("Seeding failed:", error);
        process.exitCode = 1;
    } finally {
        const mongoose = require("mongoose");
        await mongoose.connection.close();
    }
};

seedDatabase();
