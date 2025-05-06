import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { IoTimeOutline, IoLocationOutline } from 'react-icons/io5'
import { PiChurchBold } from 'react-icons/pi'

export default function About() {
  const [timeLeft, setTimeLeft] = useState({
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const weddingDate = new Date('2025-07-26T16:00:00')

    const calculateTimeLeft = () => {
      const now = new Date()
      const difference = weddingDate.getTime() - now.getTime()

      const months = Math.floor(difference / (1000 * 60 * 60 * 24 * 30.44)) // Média de dias por mês
      const days = Math.floor((difference / (1000 * 60 * 60 * 24)) % 30.44)
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
      const minutes = Math.floor((difference / (1000 * 60)) % 60)
      const seconds = Math.floor((difference / 1000) % 60)

      setTimeLeft({ months, days, hours, minutes, seconds })
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000) // Atualiza a cada segundo

    return () => clearInterval(timer)
  }, [])

  return (
    <main className='mt-32'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className='px-8 sm:px-12 md:px-30 xl:px-48'
      >
        <h1 className='head text-secondary-green text-center mb-6'>
          SOBRE O <br />GRANDE DIA
        </h1>
        <p className='subtitle text-center text-[#767676] max-w-3xl mx-auto mb-16'>
          Com grande alegria, convidamos você para celebrar conosco este momento único em nossas vidas. 
          Cada minuto que passa nos aproxima deste dia tão especial.
        </p>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className='bg-foreground p-6 sm:p-12 md:p-20 rounded-br-[200px] shadow-sm max-w-[90%] ml-0'
      >
        <div className='flex flex-col gap-6 sm:gap-8 max-w-4xl'>
          <div className='flex items-center gap-2 sm:gap-4'>
            <PiChurchBold className='text-3xl sm:text-4xl md:text-5xl text-secondary-green' />
            <div>
              <h2 className='font-cormorant text-2xl sm:text-3xl md:text-4xl font-medium text-secondary-green'>
              Paróquia São João Paulo II
              </h2>
            </div>
          </div>
          
          <div className='flex items-start gap-2 sm:gap-4'>
            <IoLocationOutline className='text-2xl sm:text-3xl md:text-4xl text-secondary-green mt-1' />
            <p className='text-lg sm:text-xl md:text-2xl text-[#767676] font-cormorant'>
              Av. Olímpio Prates, 736 - Maj. Prates, <br />
              Montes Claros - MG, 39403-261
            </p>
          </div>

          <div className='flex items-center gap-2 sm:gap-4'>
            <IoTimeOutline className='text-2xl sm:text-3xl md:text-4xl text-secondary-green' />
            <div className='flex flex-col'>
              <p className='font-cormorant text-lg sm:text-xl md:text-2xl text-[#767676]'>
                26 de Julho de 2025
              </p>
              <p className='text-lg sm:text-xl md:text-2xl text-[#767676] font-cormorant'>
                16 horas
              </p>
            </div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className='flex flex-wrap justify-center sm:justify-start gap-6 sm:gap-12 mt-8 sm:mt-16'
        >
          {[
            { value: timeLeft.months, label: 'Meses' },
            { value: timeLeft.days, label: 'Dias' },
            { value: timeLeft.hours, label: 'Horas' },
            { value: timeLeft.minutes, label: 'Minutos' },
            { value: timeLeft.seconds, label: 'Segundos' }
          ].map((item) => (
            <motion.div 
              key={item.label}
              initial={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className='text-center min-w-[90px] sm:min-w-[120px]'
            >
              <span className='font-cormorant text-4xl sm:text-5xl md:text-6xl font-bold text-secondary-green block'>
                {item.value}
              </span>
              <p className='font-cormorant text-base sm:text-lg md:text-xl text-[#767676] mt-1 sm:mt-2'>
                {item.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </main>
  )
}
