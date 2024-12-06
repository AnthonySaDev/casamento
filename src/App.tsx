import Header from './components/header'
import Hero from './components/hero'
import History from './components/history'
import About from './components/about'
import Footer from './components/footer'

export default function App() {
  return (
    <div className="bg-background w-screen">
      <Header />
      <div id="hero">
        <Hero />
      </div>
      <div id="history">
        <History />
      </div>
      <div id="about">
        <About />
      </div>
      <Footer />
    </div>
  )
}
