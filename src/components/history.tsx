import { motion } from 'framer-motion'

export default function History() {
  return (
    <main className='px-8 sm:px-12 md:px-30 xl:px-48 mt-32 overflow-visible relative'>
      <div className='flex flex-col-reverse xl:flex-row gap-12 items-center pb-20 relative'>
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className='w-full xl:w-1/2 h-[600px] relative'
        >
          <motion.img 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            src="/food.webp"
            loading='lazy'
            alt="Decoração" 
            width={200}
            height={100}
            className='absolute -bottom-24 right-24 z-10'
          />
          <motion.img 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          src="/history.webp"
          loading='lazy'
          alt="Imagem da História" 
          width={1200}
          height={800}
          className="w-full h-full object-cover object-[center_40%] rounded-tr-[80px]"
        />

        </motion.section>

        <section className='w-full xl:w-1/2 mt-10 xl:mt-0'>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className='flex flex-col gap-4'
          >
            <h2 className='head text-secondary-green text-left'>NOSSA HISTÓRIA</h2>
            <div className='flex flex-col gap-6 text-lg'>
              <p className='text text-[#767676] leading-7 text-left xl:text-left'>
                Nem sempre o amor acontece à primeira vista, às vezes, ele surge de forma sutil, como um laço que se fortalece a cada conversa, risada e momentos compartilhados. Nossa história começou em um lugar especial: a mesma paróquia, em plena pandemia. Foi ali que nossos caminhos se cruzaram.
              </p>
              <p className='text text-[#767676] leading-7 text-left xl:text-left'>
                Tudo começou com muitas conversas, brincadeiras e longas ligações. Discord foi nosso cupido, o espaço onde dividimos muitos filmes, sonhos e histórias. Aos poucos, algo especial começou a surgir. Sem pressa, fomos nos conhecendo, nos apaixonando e descobrindo que nossos propósitos se alinhavam de maneira única.
              </p>
              <p className='text text-[#767676] leading-7 text-left xl:text-left'>
                Deus esteve presente em cada detalhe da nossa história. Ele nos guiou, nos fortaleceu e nos mostrou que seu amor é a base de tudo. E agora, ao darmos esse passo tão importante, seguimos confiando na vontade d&apos;Ele, gratos por cada bênção que nos trouxe até aqui.
              </p>
              <p className='text text-[#767676] leading-7 text-left xl:text-left'>
                Que alegria é viver essa jornada juntos e, mais ainda, compartilhar com vocês este momento tão especial.  
              </p>
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  )
}
