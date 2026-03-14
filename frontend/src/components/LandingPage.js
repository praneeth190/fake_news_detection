import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/check");
  };

  const title = "Veri-Fact";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.2,
        staggerChildren: 0.4,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const styles = {
    container: {
      background: "linear-gradient(135deg, #0c0c0c, #1a1a2e, #16213e, #0f3460)",
      height: "100vh",
      color: "white",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "'Inter', sans-serif",
      flexDirection: "column",
      textAlign: "center",
      overflow: "hidden",
      position: "relative",
    },

    content: {
      zIndex: 2,
      position: "relative",
    },

    tagline: {
      color: "#e0e0e0",
      fontSize: "1.2rem",
      marginBottom: "1.5rem",
      letterSpacing: "2px",
      textTransform: "uppercase",
      fontWeight: "300",
    },

    title: {
      fontSize: "5rem",
      fontWeight: "900",
      margin: "0",
      letterSpacing: "3px",
      color: "white",
      fontFamily: "'Playfair Display', serif",
    },

    subtitle: {
      fontSize: "1.8rem",
      fontWeight: "400",
      marginBottom: "3rem",
      color: "#f0f0f0",
      letterSpacing: "1px",
    },

  };

  return (
    <>
      <style>
        {`
          .cosmic-button {
            position: relative;
            overflow: hidden;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            border: none;
            padding: 1.2rem 3rem;
            font-size: 1.2rem;
            font-weight: 600;
            border-radius: 50px;
            cursor: pointer;
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2);
            transition: all 0.3s ease;
          }
          .cosmic-button::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
            opacity: 0;
            transition: opacity 0.3s ease;
          }
          .cosmic-button:hover::before {
            opacity: 1;
          }
          .cosmic-button:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 40px rgba(102, 126, 234, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.3);
          }
          .cosmic-button:active {
            transform: translateY(-2px);
          }
        `}
      </style>
      <motion.div
        style={styles.container}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
      <motion.div style={styles.content} variants={containerVariants} initial="hidden" animate="visible">
        <motion.p style={styles.tagline} variants={itemVariants}>
          Transforming the way of beliefs...
        </motion.p>
        <motion.h1 style={styles.title} variants={itemVariants}>
          {title.split("").map((letter, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.h1>
        <motion.h3 style={styles.subtitle} variants={itemVariants}>
          A Fake News Detector
        </motion.h3>

        <motion.button
          className="cosmic-button"
          onClick={handleClick}
          variants={itemVariants}
        >
          Check Now
        </motion.button>
      </motion.div>

    </motion.div>
    </>
  );
};

export default LandingPage;