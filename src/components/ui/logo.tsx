
export default function Logo() {
  return (
    <div className='relative w-[150px] sm:w-[200px] md:w-[250px] lg:w-[300px] h-auto'>
      <img 
        src="/logo.webp"
        loading="lazy"
        alt="Logo Casamento" 
        width={300}
        height={160}
        className='w-full h-auto'
      />
    </div>
  )
}
