import { motion } from 'framer-motion';
import { Heart, Shield, Users } from 'lucide-react';

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  return (
    <div className="fixed inset-0 soulace-gradient flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        onAnimationComplete={() => setTimeout(onComplete, 1500)}
        className="text-center"
      >
        {/* Logo Animation */}
        <motion.div
          initial={{ rotateY: -180 }}
          animate={{ rotateY: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-6"
        >
          <div className="relative mx-auto w-24 h-24 rounded-2xl overflow-hidden shadow-lg">
            <img
              src="/logo.jpg"
              alt="Soulace logo"
              className="w-full h-full object-cover"
            />
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-2xl bg-white/10"
            />
          </div>
        </motion.div>

        {/* App Name */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-4xl font-bold text-white mb-2"
        >
          SOULACE
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-white/80 text-lg mb-8"
        >
          Your Digital Mental Health Companion
        </motion.p>

        {/* Feature Icons */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex justify-center space-x-8"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, delay: 1, repeat: Infinity }}
            className="flex flex-col items-center space-y-2"
          >
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-white/70 text-sm">Safe</span>
          </motion.div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, delay: 1.2, repeat: Infinity }}
            className="flex flex-col items-center space-y-2"
          >
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <span className="text-white/70 text-sm">Connected</span>
          </motion.div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, delay: 1.4, repeat: Infinity }}
            className="flex flex-col items-center space-y-2"
          >
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-white/70 text-sm">Caring</span>
          </motion.div>
        </motion.div>

        {/* Loading Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-12"
        >
          <div className="w-32 h-1 bg-white/20 rounded-full mx-auto overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, delay: 1.5 }}
              className="h-full bg-white rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}