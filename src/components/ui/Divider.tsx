import { motion } from 'framer-motion';

interface DividerProps {
  color?: 'red' | 'green';
}

export function Divider({ color = 'green' }: DividerProps) {
  const bgColor = color === 'red' ? 'bg-red-500' : 'bg-green-700';
  
  return (
    <div className="flex items-center justify-center my-4">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: '60px' }}
        transition={{ duration: 1 }}
        className={`h-0.5 ${bgColor}`}
      />
      <div className="mx-3">
        <motion.div
          className={`w-6 h-6 rounded-full ${color === 'red' ? 'bg-red-50' : 'bg-green-50'} 
            flex items-center justify-center`}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ delay: 0.5, type: 'spring' }}
        >
          <span className={`text-lg ${color === 'red' ? 'text-red-500' : 'text-green-700'}`}>
            ★
          </span>
        </motion.div>
      </div>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: '60px' }}
        transition={{ duration: 1 }}
        className={`h-0.5 ${bgColor}`}
      />
    </div>
  );
}