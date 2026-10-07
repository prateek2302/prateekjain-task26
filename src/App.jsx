import { useMemo, useState } from 'react'
import './App.css'

const destinations = [
  {
    id: 'amalfi',
    name: 'Amalfi Coast',
    country: 'Italy',
    region: 'Europe',
    category: 'Coastal escape',
    duration: '5 nights',
    price: '$1,240',
    rating: '4.98',
    image:
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1000&q=85',
    imageAlt: 'Colorful homes perched above the Italian coastline',
    tone: 'peach',
  },
  {
    id: 'kyoto',
    name: 'Kyoto in bloom',
    country: 'Japan',
    region: 'Asia',
    category: 'Culture & calm',
    duration: '7 nights',
    price: '$1,680',
    rating: '4.96',
    image:
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=85',
    imageAlt: 'Traditional Kyoto street framed by cherry blossoms',
    tone: 'lilac',
  },
  {
    id: 'bali',
    name: 'Ubud hideaway',
    country: 'Bali, Indonesia',
    region: 'Asia',
    category: 'Slow living',
    duration: '6 nights',
    price: '$980',
    rating: '4.94',
    image:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=85',
    imageAlt: 'A tropical Balinese temple surrounded by green palms',
    tone: 'mint',
  },
  {
    id: 'patagonia',
    name: 'Wild Patagonia',
    country: 'Argentina',
    region: 'Americas',
    category: 'Into the wild',
    duration: '8 nights',
    price: '$2,150',
    rating: '4.99',
    image:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=85',
    imageAlt: 'Snow-dusted peaks rising over a mountain range',
    tone: 'blue',
  },
  {
    id: 'santorini',
    name: 'Aegean mornings',
    country: 'Santorini, Greece',
    region: 'Europe',
    category: 'Coastal escape',
    duration: '4 nights',
    price: '$1,390',
    rating: '4.97',
    image:
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=85',
    imageAlt: 'Whitewashed island buildings overlooking blue water',
    tone: 'blue',
  },
  {
    id: 'marrakech',
    name: 'Marrakech, slowly',
    country: 'Morocco',
    region: 'Africa',
    category: 'City & souk',
    duration: '5 nights',
    price: '$890',
    rating: '4.93',
    image:
      'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=1000&q=85',
    imageAlt: 'Warm terracotta architecture in a Moroccan medina',
    tone: 'peach',
  },
]

const regions = ['Everywhere', 'Europe', 'Asia', 'Americas', 'Africa']

function BookmarkIcon({ filled }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6.5 4.75A1.75 1.75 0 0 1 8.25 3h7.5a1.75 1.75 0 0 1 1.75 1.75V21l-5.5-3.75L6.5 21V4.75Z" />
    </svg>
  )
}

function DestinationCard({ destination, isSaved, onToggleSave }) {
  const {
    id,
    name,
    country,
    category,
    duration,
    price,
    rating,
    image,
    imageAlt,
    tone,
  } = destination

  return (
    <article className="destination-card">
      <div className={`card-art card-art--${tone}`}>
        <img src={image} alt={imageAlt} loading="lazy" />
        <span className="card-category">{category}</span>
        <button
          className={`save-button${isSaved ? ' is-saved' : ''}`}
          type="button"
          aria-label={`${isSaved ? 'Remove' : 'Save'} ${name} ${
            isSaved ? 'from' : 'to'
          } saved trips`}
          aria-pressed={isSaved}
          onClick={() => onToggleSave(id)}
        >
          <BookmarkIcon filled={isSaved} />
        </button>
        <span className="photo-credit" aria-hidden="true">
          {country}
        </span>
      </div>

      <div className="card-content">
        <div className="card-heading">
          <div>
            <h3>{name}</h3>
            <p className="card-location">{country}</p>
          </div>
          <span className="rating">
            <span aria-hidden="true">★</span> {rating}
          </span>
        </div>

        <div className="card-footer">
          <span className="trip-length">
            <span className="calendar-icon" aria-hidden="true">↗</span>
            {duration}
          </span>
          <p className="price">
            <strong>{price}</strong> <span>/ person</span>
          </p>
        </div>
      </div>
    </article>
  )
}

function DestinationGallery({ destinations: items, savedIds, onToggleSave }) {
  return (
    <div className="destination-grid">
      {items.map((destination) => (
        <DestinationCard
          key={destination.id}
          destination={destination}
          isSaved={savedIds.includes(destination.id)}
          onToggleSave={onToggleSave}
        />
      ))}
    </div>
  )
}

function App() {
  const [activeRegion, setActiveRegion] = useState('Everywhere')
  const [savedIds, setSavedIds] = useState([])

  const visibleDestinations = useMemo(
    () =>
      activeRegion === 'Everywhere'
        ? destinations
        : destinations.filter((destination) => destination.region === activeRegion),
    [activeRegion],
  )

  function toggleSaved(id) {
    setSavedIds((currentIds) =>
      currentIds.includes(id)
        ? currentIds.filter((savedId) => savedId !== id)
        : [...currentIds, id],
    )
  }

  return (
    <main className="page-shell">
      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="Elsewhere home">
          <span className="wordmark-icon" aria-hidden="true">e</span>
          elsewhere<span className="wordmark-period">.</span>
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          <a className="nav-link nav-link--active" href="#destinations">Discover</a>
          <a className="nav-link" href="#destinations">Our journal</a>
        </nav>
        <a className="saved-link" href="#destinations">
          <BookmarkIcon filled={false} />
          <span>Saved</span>
          <span className="saved-count">{savedIds.length}</span>
        </a>
      </header>

      <section className="intro" id="home" aria-labelledby="page-title">
        <div className="eyebrow">
          <span className="eyebrow-line" />
          A little further, a little slower
        </div>
        <h1 id="page-title">
          Find your <span>somewhere.</span>
        </h1>
        <p className="intro-copy">
          Thoughtful stays for the days you’ll remember. Pick a place, leave a
          little room for wonder.
        </p>
        <div className="travel-note">
          <span className="travel-note-icon" aria-hidden="true">✳</span>
          Handpicked places, made for getting lost
        </div>
      </section>

      <section className="collection" id="destinations" aria-labelledby="collection-title">
        <div className="collection-heading">
          <div>
            <p className="section-kicker">The good places</p>
            <h2 id="collection-title">A change of scenery</h2>
          </div>
          <span className="collection-count">
            {String(visibleDestinations.length).padStart(2, '0')} stays
          </span>
        </div>

        <div className="region-filters" role="group" aria-label="Filter by region">
          {regions.map((region) => (
            <button
              className={`filter-chip${activeRegion === region ? ' is-active' : ''}`}
              type="button"
              key={region}
              aria-pressed={activeRegion === region}
              onClick={() => setActiveRegion(region)}
            >
              {region}
            </button>
          ))}
        </div>

        <DestinationGallery
          destinations={visibleDestinations}
          savedIds={savedIds}
          onToggleSave={toggleSaved}
        />
      </section>

      <footer className="site-footer">
        <a className="wordmark wordmark--footer" href="#home">
          <span className="wordmark-icon" aria-hidden="true">e</span>
          elsewhere<span className="wordmark-period">.</span>
        </a>
        <p>Go where the good days are.</p>
        <span className="footer-year">EST. 2024 · MADE FOR THE MOMENTS</span>
      </footer>
    </main>
  )
}

export default App
