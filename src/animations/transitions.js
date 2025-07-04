// Page transition animations
export const pageVariants = {
    initial: {
        opacity: 0,
        x: 100,
        scale: 0.98
    },
    in: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
            duration: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94]
        }
    },
    out: {
        opacity: 0,
        x: -100,
        scale: 0.98,
        transition: {
            duration: 0.3,
            ease: [0.55, 0.06, 0.68, 0.19]
        }
    }
}

// Staggered container animations
export const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            delayChildren: 0.1,
            staggerChildren: 0.1
        }
    }
}

// Individual item animations for staggered lists
export const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94]
        }
    }
}

// Button hover and tap animations
export const buttonVariants = {
    hover: {
        scale: 1.02,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        transition: {
            duration: 0.2
        }
    },
    tap: {
        scale: 0.98,
        transition: {
            duration: 0.1
        }
    }
}

// Progress bar animation
export const progressVariants = {
    initial: { width: 0 },
    animate: (progress) => ({
        width: `${progress}%`,
        transition: {
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94]
        }
    })
}

// Form field focus animations
export const fieldVariants = {
    focus: {
        scale: 1.01,
        boxShadow: "0 0 0 3px rgba(20, 184, 166, 0.1)",
        transition: {
            duration: 0.2
        }
    },
    blur: {
        scale: 1,
        boxShadow: "0 0 0 0px rgba(20, 184, 166, 0)",
        transition: {
            duration: 0.2
        }
    }
}

// Radio button selection animation
export const radioVariants = {
    selected: {
        scale: 1.02,
        borderColor: "#14b8a6",
        backgroundColor: "rgba(20, 184, 166, 0.05)",
        transition: {
            duration: 0.2
        }
    },
    unselected: {
        scale: 1,
        borderColor: "#e5e7eb",
        backgroundColor: "#ffffff",
        transition: {
            duration: 0.2
        }
    }
}

// Loading spinner animation
export const spinnerVariants = {
    animate: {
        rotate: 360,
        transition: {
            duration: 1,
            repeat: Infinity,
            ease: "linear"
        }
    }
}

// Error message animation
export const errorVariants = {
    initial: { opacity: 0, y: -10, scale: 0.95 },
    animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94]
        }
    },
    exit: {
        opacity: 0,
        y: -10,
        scale: 0.95,
        transition: {
            duration: 0.2
        }
    }
}

// Success animation
export const successVariants = {
    initial: { scale: 0 },
    animate: {
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 260,
            damping: 20
        }
    }
}

// Floating animation for illustrations
export const floatingVariants = {
    animate: {
        y: [0, -10, 0],
        transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
} 