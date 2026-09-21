import Header from './components/Header'
import Hero from './components/Hero'
import MenuHighlights from './components/MenuHighlights'
import BookingSection from './components/booking/BookingSection'
import Footer from './components/Footer'

// The whole page, top to bottom. Each piece is its own component file.
export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <MenuHighlights />
        <BookingSection />
      </main>
      <Footer />
    </>
  )
}
