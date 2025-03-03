import { useNavigate } from "react-router-dom";
import Logo from './ui/logo';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Header() {
  const navigate = useNavigate();
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showNav, setShowNav] = useState(false);

  // Detecta o scroll e a direção
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Exibe a navegação flutuante quando o scroll for maior que 200px
      if (currentScrollY > 200 && !showNav) {
        setShowNav(true); // Começa a exibir a navegação flutuante
      } else if (currentScrollY <= 200 && showNav) {
        setShowNav(false); // Esconde a navegação quando o usuário voltar para o topo
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    // Limpeza do evento quando o componente for desmontado
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, showNav]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleNavigation = (path: string, sectionId?: string) => {
    navigate(path);
    if (sectionId) {
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 300); // Delay um pouco para garantir que a navegação tenha ocorrido
    }
  };

  return (
    <header className="flex flex-col-reverse items-center justify-between pt-20 px-8">
      {/* Navegação fixa inicialmente */}
      <motion.nav 
        initial={{ opacity: 1, y: 0 }}
        animate={{ 
          opacity: showNav ? 1 : 1, // A visibilidade fica 1 tanto quando está fixo quanto flutuante
        }}
        transition={{ duration: 0.6 }}
        className={`flex flex-row items-center gap-8 ${showNav ? 'fixed top-8  bg-background bg-opacity-85 px-5 py-2 rounded-xl shadow-xl z-20' : 'relative'}`}
      >
        <a 
          onClick={() => handleNavigation('/', 'hero')} 
          className="text-secondary-green text-sm cursor-pointer hover-underline-animation"
        >
          Início
        </a>
        <a 
          onClick={() => handleNavigation('/', 'history')} 
          className="text-secondary-green text-sm cursor-pointer hover-underline-animation"
        >
          História
        </a>
        <a 
          onClick={() => handleNavigation('/', 'about')} 
          className="text-secondary-green text-sm cursor-pointer hover-underline-animation"
        >
          Sobre
        </a>
        <a 
          onClick={() => navigate('/presentes')}
          className="text-secondary-green text-sm cursor-pointer hover-underline-animation"
        >
          Presentes
        </a>
      </motion.nav>

      {/* Logo */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='mb-14'
      >
        <Logo />
      </motion.div>
    </header>
  );
}
