import React from 'react';
import { motion } from 'framer-motion';

function AnimatedCompareWrapper({ children }) {
  return (
    <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', gap: '40px' }}>
      <motion.div
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 15 }}
        style={{ zIndex: 1 }}
      >
        {children[0]}
      </motion.div>

      <motion.div
        initial={{ x: 200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 100, damping: 15 }}
        style={{ zIndex: 0 }}
      >
        {children[1]}
      </motion.div>
    </div>
  );
}

export default AnimatedCompareWrapper;