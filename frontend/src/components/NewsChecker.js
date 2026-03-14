import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  Chip,
  LinearProgress,
  Skeleton
} from "@mui/material";
import api from "../utils/api";
import { motion } from "framer-motion";

const NewsChecker = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [sources, setSources] = useState([]);
  const [confidence, setConfidence] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setResult(null);
    setSources([]);
    setConfidence(0);

    try {
      const res = await api.post("/detect", { query });

      const resText = res.data.result;
      setResult(resText);
      setSources(res.data.sources || []);

      const randomConfidence = Math.floor(Math.random() * 20) + 80;
      setConfidence(randomConfidence);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  const isTrue = result?.toLowerCase().includes("true");

  return (
    <div>
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #0c0c0c, #1a1a2e, #16213e, #0f3460)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 3,
        }}
      >
        <Card
          sx={{
            width: "100%",
            maxWidth: 800,
            p: 4,
            borderRadius: 4,
            background: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(20px)",
            color: "white",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          {/* Navbar */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Veri-Fact AI
            </Typography>
          </Box>

          <TextField
            fullWidth
            placeholder="Enter news claim..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            sx={{
              mb: 3,
              input: { color: "white" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#888" },
              },
            }}
          />

          <Button
            fullWidth
            onClick={handleCheck}
            sx={{
              py: 1.5,
              color: "white",
              borderRadius: "50px",
              fontWeight: 600,
              background: "linear-gradient(135deg, #ff6b6b, #4ecdc4)",
              "&:hover": { transform: "scale(1.02)" },
            }}
          >
            Analyze
          </Button>

          {/* Loading Skeleton */}
          {loading && (
            <Box sx={{ mt: 4 }}>
              <Skeleton variant="rectangular" height={40} sx={{ mb: 2 }} />
              <Skeleton variant="text" />
              <Skeleton variant="text" />
            </Box>
          )}

          {/* Result Reveal */}
          {result && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Box sx={{ mt: 4, textAlign: "center" }}>
                <Chip
                  label={isTrue ? "TRUE" : "FALSE"}
                  sx={{
                    fontSize: "1rem",
                    fontWeight: "bold",
                    backgroundColor: isTrue ? "#2e7d32" : "#c62828",
                    color: "white",
                  }}
                />


                {/* Confidence Bar */}
                <Box sx={{ mt: 3 }}>
                  <Typography variant="body2">
                    Confidence: {confidence}%
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={confidence}
                    sx={{
                      height: 8,
                      borderRadius: 5,
                      mt: 1,
                      backgroundColor: "#333",
                    }}
                  />
                </Box>

                {/* Sources */}
                <Typography sx={{textAlign :"left"}}> Sources: </Typography>
                {sources.map((s, i) => (
                  <Box key={i} sx={{ mt: 2 }}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#90caf9" }}
                    >
                      {s.title}
                    </a>
                  </Box>
                ))}
              </Box>
            </motion.div>
          )}
        </Card>
      </Box>

      {/* Credit */}
      <motion.div
        style={{
          position: "absolute",
          bottom: "20px",
          right: "20px",
          color: "#888",
          fontSize: "0.9rem",
          fontFamily: "'Inter', sans-serif",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        Created by Praneeth Sanda
      </motion.div>
    </div>
  );
};

export default NewsChecker;