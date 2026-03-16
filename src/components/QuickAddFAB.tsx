import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { TransactionSheet } from "./TransactionSheet";

export function QuickAddFAB() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-2xl bg-destaque text-destaque-foreground shadow-lg flex items-center justify-center z-50 hover:shadow-xl transition-shadow"
      >
        <Plus className="h-6 w-6" strokeWidth={2.5} />
      </motion.button>
      <TransactionSheet open={open} onOpenChange={setOpen} />
    </>
  );
}
