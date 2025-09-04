// ToastNotification.tsx - Componente de Toast Profissional
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, X } from "lucide-react";

interface ToastProps {
  show: boolean;
  type: 'success' | 'error';
  title: string;
  message: string;
  onClose: () => void;
}

const ToastNotification = ({ show, type, title, message, onClose }: ToastProps) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000); // Auto-close após 5 segundos

      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  const toastVariants = {
    hidden: {
      opacity: 0,
      y: -100,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: {
      opacity: 0,
      y: -100,
      scale: 0.8,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed top-0 left-0 right-0 z-[9999] flex justify-center pt-6 px-4">
          <motion.div
            variants={toastVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`max-w-md w-full bg-white rounded-lg shadow-2xl border-l-4 ${
              type === 'success' ? 'border-green-500' : 'border-red-500'
            } p-4`}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0">
                {type === 'success' ? (
                  <CheckCircle className="h-6 w-6 text-green-500" />
                ) : (
                  <XCircle className="h-6 w-6 text-red-500" />
                )}
              </div>
              
              <div className="ml-3 flex-1">
                <h3 className={`text-sm font-semibold ${
                  type === 'success' ? 'text-green-800' : 'text-red-800'
                }`}>
                  {title}
                </h3>
                <p className="text-sm text-gray-700 mt-1 leading-relaxed">
                  {message}
                </p>
              </div>

              <button
                onClick={onClose}
                className="ml-4 inline-flex text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Progress Bar */}
            <motion.div
              className={`mt-3 h-1 bg-gray-200 rounded-full overflow-hidden`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                className={`h-full ${
                  type === 'success' ? 'bg-green-500' : 'bg-red-500'
                }`}
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 5, ease: "linear" }}
              />
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ToastNotification;