"use client";

import { MotionConfig, motion } from "framer-motion";

type AnimatedHamburgerButtonProps = {
  active: boolean;
  onClick: () => void;
  className?: string;
};

export function AnimatedHamburgerButton({
  active,
  onClick,
  className = "",
}: AnimatedHamburgerButtonProps) {
  return (
    <MotionConfig
      transition={{
        duration: 0.5,
        ease: "easeInOut",
      }}
    >
      <motion.button
        type="button"
        initial={false}
        animate={active ? "open" : "closed"}
        onClick={onClick}
        aria-expanded={active}
        aria-label={active ? "Fechar menu" : "Abrir menu"}
        className={`relative h-20 w-20 rounded-full bg-white/0 text-zinc-900 transition-colors hover:bg-zinc-200/60 dark:text-white dark:hover:bg-white/20 ${className}`}
      >
        <motion.span
          variants={VARIANTS.top}
          className="absolute h-1 w-10 bg-current"
          style={{ y: "-50%", left: "50%", x: "-50%", top: "35%" }}
        />
        <motion.span
          variants={VARIANTS.middle}
          className="absolute h-1 w-10 bg-current"
          style={{ left: "50%", x: "-50%", top: "50%", y: "-50%" }}
        />
        <motion.span
          variants={VARIANTS.bottom}
          className="absolute h-1 w-5 bg-current"
          style={{
            x: "-50%",
            y: "50%",
            bottom: "35%",
            left: "calc(50% + 10px)",
          }}
        />
      </motion.button>
    </MotionConfig>
  );
}

export const Example = () => {
  return (
    <div className="grid h-screen place-content-center bg-linear-to-br from-violet-500 to-indigo-500">
      <AnimatedHamburgerButton active={false} onClick={() => {}} className="text-white" />
    </div>
  );
};

const VARIANTS = {
  top: {
    open: {
      rotate: ["0deg", "0deg", "45deg"],
      top: ["35%", "50%", "50%"],
    },
    closed: {
      rotate: ["45deg", "0deg", "0deg"],
      top: ["50%", "50%", "35%"],
    },
  },
  middle: {
    open: {
      rotate: ["0deg", "0deg", "-45deg"],
    },
    closed: {
      rotate: ["-45deg", "0deg", "0deg"],
    },
  },
  bottom: {
    open: {
      rotate: ["0deg", "0deg", "45deg"],
      bottom: ["35%", "50%", "50%"],
      left: "50%",
    },
    closed: {
      rotate: ["45deg", "0deg", "0deg"],
      bottom: ["50%", "50%", "35%"],
      left: "calc(50% + 10px)",
    },
  },
};
