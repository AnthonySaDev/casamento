import { motion } from 'framer-motion'
import { IoIosArrowUp } from "react-icons/io"
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

const navigate = useNavigate();

  return (
    <footer className='flex flex-col items-center justify-center mt-20 bg-primary-green px-8 sm:px-12 md:px-30 xl:px-48 py-16 relative'>
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={scrollToTop}
        className='absolute -top-6 bg-secondary-green text-white p-4 rounded-full shadow-lg'
      >
        <IoIosArrowUp size={24} />
      </motion.button>

      <div className='flex flex-col items-center gap-8 max-w-3xl text-center'>
        <h2 className='head text-white'>Hemilly & Anthony</h2>
        <div className='flex flex-col gap-6'>
          <p className='text text-secondary-green leading-7'>
            &ldquo;O amor é paciente, o amor é bondoso. Não inveja, não se vangloria, não se orgulha. 
            Não maltrata, não procura seus interesses, não se ira facilmente, não guarda rancor. 
            O amor não se alegra com a injustiça, mas se alegra com a verdade. 
            Tudo sofre, tudo crê, tudo espera, tudo suporta.&rdquo;
          </p>
          <p className='text-sm text-zinc-200 italic'>1 Coríntios 13:4-7</p>
        </div>
        <div className='flex flex-col gap-4 mt-4'>
          <p className='text text-secondary-green leading-7'>
            Agradecemos imensamente por fazerem parte deste momento tão especial em nossas vidas.
            Cada um de vocês tem um lugar especial em nossos corações.
          </p>
          <p className='text text-secondary-green leading-7'>
            Com amor, <button className='cursor-default' onClick={() => navigate("/secret-names")}
            >Hemilly</button> e Anthony
          </p>
          <p className='text text-zinc-200 font-cormorant text-xl'>
            26 de Julho de 2025
          </p>
        </div>
      </div>
    </footer>
  )
}
