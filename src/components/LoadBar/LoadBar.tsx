import { motion } from 'framer-motion'

function LoadBar() {
  return (
    <motion.div
      className="loading-bar"
      initial={{ width: '1px' }}
      animate={{ width: '100%' }}
      transition={{
        delay: 0.3,
        type: 'spring',
        mass: 1,
        stiffness: 177.8,
        damping: 20,
      }}
    />
  )
}
export default LoadBar
