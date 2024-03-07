import './Home.css'
import SearchFilter from '../../components/SearchFilter/SearchFilter'
import MainList from '../../components/MainList/MainList'
import { useCharacterContext } from '../../context/characterContext'
import { motion } from 'framer-motion'
import LoadBar from '../../components/LoadBar/LoadBar'
function Home() {
  const { favoriteMode, isLoading } = useCharacterContext()
  return (
    <>
      {isLoading && <LoadBar />}
      <motion.main
        className="main-content-wrapper"
        initial={{ opacity: 0 }} // Estado inicial opcional, por ejemplo, invisible
        animate={{ opacity: 1 }} // Estado final deseado, por ejemplo, completamente visible
        exit={{ opacity: 0 }} // Estado al salir, si estás usando AnimatePresence para animaciones de salida
        transition={{
          delay: 1,
          type: 'spring',
          mass: 1,
          stiffness: 100,
          damping: 15,
        }}
      >
        {favoriteMode && (
          <div className="page-title">
            <h2>FAVORITES</h2>
          </div>
        )}
        <SearchFilter></SearchFilter>
        <MainList></MainList>
      </motion.main>
    </>
  )
}

export default Home
