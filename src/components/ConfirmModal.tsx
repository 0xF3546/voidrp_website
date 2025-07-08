import { ReactNode, FC } from "react";
import { motion } from "framer-motion";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  children: ReactNode;
}

export const ConfirmModal: FC<ModalProps> = ({ open, onClose, onConfirm, children }) => {
  if (!open) return null;

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="p-6 bg-neutral-900 rounded-lg border border-neutral-700/50 shadow-lg relative w-full max-w-md font-satoshi backdrop-blur-sm"
      >
        <h3 className="text-lg font-medium text-white mb-4">{children}</h3>
        <div className="flex justify-end space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 text-sm font-medium text-orange-500 bg-neutral-900/80 rounded-lg hover:bg-neutral-800/80 hover:text-orange-400 transition-all duration-200 backdrop-blur-sm"
            onClick={onConfirm}
          >
            Ja
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 text-sm font-medium text-neutral-400 bg-neutral-900/80 rounded-lg hover:bg-neutral-800/80 hover:text-neutral-300 transition-all duration-200 backdrop-blur-sm"
            onClick={onClose}
          >
            Nein
        </motion.button>
        </div>
      </motion.div>
    </div>
  );
};