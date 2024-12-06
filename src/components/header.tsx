import Logo from './ui/logo'
import { motion } from 'framer-motion'

export default function Header() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <header className="flex flex-col-reverse items-center justify-between pt-20 px-8">
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='flex flex-row items-center gap-8'
      >
        <a 
          onClick={() => scrollToSection('hero')} 
          className="text-secondary-green cursor-pointer hover-underline-animation"
        >
          Home
        </a>
        <a 
          onClick={() => scrollToSection('history')} 
          className="text-secondary-green cursor-pointer hover-underline-animation"
        >
          História
        </a>
        <a 
          onClick={() => scrollToSection('about')} 
          className="text-secondary-green cursor-pointer hover-underline-animation"
        >
          Sobre
        </a>
      </motion.nav>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='mb-14'
      >
        <Logo />
      </motion.div>
    </header>
  )
}
