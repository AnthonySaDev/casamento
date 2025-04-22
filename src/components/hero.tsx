import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className='xl:px-48 mt-16'
    >
      <div className='flex flex-col xl:flex-row gap-12 items-center'>
        <section className='flex flex-col gap-4 w-9/12 xl:w-1/2'>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="title-montserrat"
          >
            CASAMENTO
          </motion.h1>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className='head text-secondary-green'
          >
            HEMILLY E <br /> ANTHONY
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className='text text-[#767676] max-w-[620px] leading-7'
          >
            Estamos muito felizes por compartilhar esse momento tão especial com vocês! 
            Cada detalhe deste dia foi pensado com amor e carinho, e tê-los ao nosso 
            lado torna tudo ainda mais perfeito. Aqui, vocês encontram todas as 
            informações para celebrar conosco e fazer parte da nossa história.
          </motion.p>
        </section>
        
        <section className='w-10/12 xl:w-1/2 overflow-hidden'>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
          >
            <motion.img 
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 1.2,
                ease: "easeOut"
              }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.4, ease: "easeOut" }
              }}
              src="/igreja.png" 
              alt="Imagem da Igreja"
              className="w-full h-[900px] object-cover object-[42%_15%] sm:object-center"
              />
          </motion.div>
        </section>
      </div>
    </motion.main>
  )
}
