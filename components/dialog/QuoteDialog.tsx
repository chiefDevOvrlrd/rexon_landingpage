"use client";

import { motion, AnimatePresence } from "motion/react";
import QuoteForm from "@/components/form/RequestQuote";
import styles from "./quote-dialog.module.scss"; // optional if you want styling

export default function QuoteDialog({ isOpen, toggleDialog }: { isOpen: boolean; toggleDialog: () => void }) {

  return (
    <>
      {/* Animated modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={toggleDialog}
          >
            <motion.div
              className={styles.dialog}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 150 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className={styles.close} onClick={toggleDialog}>
                ✕
              </button>
              <QuoteForm />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
