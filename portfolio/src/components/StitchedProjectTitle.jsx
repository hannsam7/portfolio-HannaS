import { motion, useReducedMotion } from 'framer-motion'

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.055,
      delayChildren: 0.04,
    },
  },
}

const letterMotion = {
  hidden: {
    opacity: 0,
    y: 10,
    scale: 0.92,
    filter: 'blur(3px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.28,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

/**
 * Splits the title into characters and reveals each one in sequence in view.
 */
export function StitchedProjectTitle({ title, onClick, className }) {
  const chars = [...title]
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={className}
        aria-label={title}
        data-thread-interactive
      >
        {title}
      </button>
    )
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={title}
      data-thread-interactive
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.45, margin: '0% 0% -12% 0%' }}
      variants={container}
      className={className}
    >
      {chars.map((char, i) => (
        <motion.span
          key={`${i}-${char}`}
          variants={letterMotion}
          className="inline-block"
          aria-hidden="true"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.button>
  )
}
