import { useState } from 'react'
import './App.css'

const listings = [
  { image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=85', type: 'For sale', price: '$1,280,000', name: 'Cedar Ridge Residence', location: 'Park City, Utah', details: '4 beds  ·  4.5 baths  ·  3,850 sq ft' },
  { image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=85', type: 'For sale', price: '$895,000', name: 'Palm Grove House', location: 'Scottsdale, Arizona', details: '3 beds  ·  3 baths  ·  2,420 sq ft' },
  { image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=85', type: 'For rent', price: '$6,800 / mo', name: 'The Nolita Loft', location: 'New York, New York', details: '2 beds  ·  2 baths  ·  1,680 sq ft' },
]

const Icon = ({ name, size = 20 }) => {
  const paths = {
    search: <><circle cx="11" cy="11" r="6" /><path d="m16 16 4 4" /></>,
    pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    heart: <path d="M20.8 4.8a5.5 5.5 0 0 0-7.8 0L12 5.9l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.9-8.4a5.5 5.5 0 0 0-.1-7.8Z" />,
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>, menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>, close: <><path d="m6 6 12 12M18 6 6 18" /></>, check: <path d="m5 12 4 4L19 6" />,
  }
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

function App() {
  const [saved, setSaved] = useState([])
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchType, setSearchType] = useState('Buy')
  const [message, setMessage] = useState('')
  const toggleSaved = (name) => setSaved((items) => items.includes(name) ? items.filter((item) => item !== name) : [...items, name])
  const submitSearch = (event) => { event.preventDefault(); setMessage(`Showing ${searchType.toLowerCase()} homes in your selected area.`) }

  return <main>
    <section className="hero-section">
      <header className="nav-shell">
        <a className="brand" href="#top" aria-label="Haven home"><span>H</span> HAVEN</a>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Primary navigation"><a href="#listings" onClick={() => setMenuOpen(false)}>Properties</a><a href="#about" onClick={() => setMenuOpen(false)}>Our story</a><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a></nav>
        <div className="nav-actions"><button className="saved-link" type="button" onClick={() => setMessage(`${saved.length} saved ${saved.length === 1 ? 'home' : 'homes'}.`)}><Icon name="heart" size={17} /> Saved{saved.length ? ` (${saved.length})` : ''}</button><a className="nav-cta" href="#contact">Talk to an agent</a><button className="menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu"><Icon name={menuOpen ? 'close' : 'menu'} /></button></div>
      </header>
      <div className="hero-content" id="top"><p className="eyebrow">A more considered way home</p><h1>Find a place<br />that feels <em>like you.</em></h1><p className="hero-copy">Thoughtfully selected homes, expert guidance, and a move that feels entirely your own.</p>
        <form className="search-panel" onSubmit={submitSearch}><div className="search-tabs">{['Buy', 'Rent', 'Sell'].map((tab) => <button key={tab} type="button" onClick={() => setSearchType(tab)} className={searchType === tab ? 'active' : ''}>{tab}</button>)}</div><div className="search-row"><label><span><Icon name="pin" size={18} /> Location</span><input aria-label="Location" placeholder="City, neighborhood, or ZIP" /></label><label className="price-select"><span>Price range</span><select aria-label="Price range"><option>Any price</option><option>$500k – $1m</option><option>$1m – $2m</option><option>$2m+</option></select></label><button className="search-button" type="submit"><Icon name="search" size={19} /><span>Search homes</span></button></div></form>
        {message && <p className="form-message"><Icon name="check" size={15} /> {message}</p>}
      </div><div className="hero-caption"><span>01</span><span>Refined spaces, remarkable living</span><span>Scroll to explore ↓</span></div>
    </section>
    <section className="intro section-pad" id="about"><p className="eyebrow dark">Made for your next chapter</p><div className="intro-grid"><h2>More than an address.<br /><em>A feeling of belonging.</em></h2><div><p>At Haven, we believe finding a home should be as personal as the life you build inside it. Our local experts pair honest guidance with a sharp eye for the details that make a place special.</p><a className="text-link" href="#contact">Meet the Haven team <Icon name="arrow" size={17} /></a></div></div><div className="stat-row"><div><strong>12k+</strong><span>Homes matched</span></div><div><strong>18</strong><span>Neighborhoods</span></div><div><strong>4.9/5</strong><span>Client rating</span></div><div><strong>14 yrs</strong><span>Local expertise</span></div></div></section>
    <section className="listings section-pad" id="listings"><div className="section-heading"><div><p className="eyebrow dark">Just listed</p><h2>Spaces worth seeing<br /><em>in person.</em></h2></div><a className="outline-button" href="#contact">View all properties <Icon name="arrow" size={17} /></a></div><div className="listing-grid">{listings.map((listing) => <article className="listing-card" key={listing.name}><div className="listing-image"><img src={listing.image} alt={listing.name} /><span>{listing.type}</span><button onClick={() => toggleSaved(listing.name)} type="button" aria-label={`Save ${listing.name}`} className={saved.includes(listing.name) ? 'liked' : ''}><Icon name="heart" size={19} /></button></div><div className="listing-info"><p className="listing-price">{listing.price}</p><h3>{listing.name}</h3><p className="location"><Icon name="pin" size={15} /> {listing.location}</p><p className="details">{listing.details}</p></div></article>)}</div></section>
    <section className="feature-block"><div className="feature-image"></div><div className="feature-copy"><p className="eyebrow">The Haven difference</p><h2>Guidance that<br />moves <em>with you.</em></h2><p>From a first conversation to your front door, we make every decision feel clear, calm, and confidently yours.</p><ul><li><Icon name="check" size={18} /> A dedicated local advisor</li><li><Icon name="check" size={18} /> Curated home recommendations</li><li><Icon name="check" size={18} /> Full-service buying support</li></ul><a className="light-button" href="#contact">How we work <Icon name="arrow" size={17} /></a></div></section>
    <section className="contact section-pad" id="contact"><p className="eyebrow dark">Your move starts here</p><h2>Ready to find<br /><em>your haven?</em></h2><p>Tell us what you’re looking for. We’ll take it from there.</p><a className="dark-button" href="mailto:hello@havenhomes.com">Start a conversation <Icon name="arrow" size={18} /></a></section>
    <footer><a className="brand footer-brand" href="#top"><span>H</span> HAVEN</a><p>© 2026 Haven Homes. Made for living well.</p><div><a href="#top">Instagram</a><a href="#top">LinkedIn</a><a href="#top">Privacy</a></div></footer>
  </main>
}
export default App
