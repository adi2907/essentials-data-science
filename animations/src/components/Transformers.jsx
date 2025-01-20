import React, { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion"; // For animations

const TransformerVisualizer = () => {
  const [activeView, setActiveView] = useState("architecture");
  const [step, setStep] = useState(0);

  const architectureExplanations = [
    {
      title: "Input Embeddings + Positional Encoding",
      explanation: "Converts words into vectors and adds position information.",
      example: `"The cat sits on the mat" → [[0.1, 0.5, 0.9], [0.8, 0.2, 0.3], [0.4, 0.9, 0.1], ..., [0.7, 0.1, 0.6]] + positional info.`,
    },
    {
      title: "Multi-Head Self-Attention",
      explanation: "Allows each word to look at other words in the sentence to understand context.",
      example: `For "The cat sits", self-attention computes weights based on "cat" and "sits" to capture subject-verb agreement.`,
    },
    {
      title: "Query, Key, Value Vectors",
      explanation: "Query (what I'm looking for), Key (what I match against), Value (what information I pass).",
      example: `For "cat": Query = "What's happening?", Key = "Does this match the subject?", Value = "Sitting info" → Attention focuses on "sits".`,
    },
    {
      title: "Feed Forward Network",
      explanation: "Transforms the attention output into a richer representation, capturing complex patterns.",
      example: `"The cat sits" becomes enriched with syntactic structure → e.g., subject-verb relationship encoded.`,
    },
    {
      title: "Layer Normalization",
      explanation: "Stabilizes values to prevent them from growing too large or small.",
      example: `"The cat sits": Normalize vector outputs → [0.25, 0.5, 1] scaled within a stable range.`,
    },
    {
      title: "Output Projection",
      explanation: "Final transformation to get the desired output format.",
      example: `Convert the enriched embeddings back to text: "The cat sits on the mat."`,
    },
  ];

  const trainingExplanations = [
    {
      title: "Pre-training: Data Collection",
      explanation: "Gather massive amounts of text data from various sources like books, websites, and articles.",
      example: `"The cat sits on the mat." is part of the pre-training corpus gathered from books, articles, and web data.`,
    },
    {
      title: "Pre-training: Self-Supervised Learning",
      explanation: "The model learns by predicting masked words.",
      example: `Masked input: "The [MASK] sits on the mat." → The model uses context ("The ... sits") to predict the word "cat".`,
    },
    {
      title: "Pre-training: Initial Model",
      explanation: "Result is a model with general understanding of language but not specialized for any task.",
      example: `At this stage, the model might correctly complete the sentence: "The cat sits on the mat." but doesn't understand specific nuances like sentiment.`,
    },
    {
      title: "Fine-tuning: Task-Specific Data",
      explanation: "Collect specific data for your task. For example, texts labeled positive/negative for sentiment analysis.",
      example: `For sentiment analysis: "The cat sits happily on the mat." → Positive; "The cat sits lazily on the mat." → Neutral.`,
    },
    {
      title: "Fine-tuning: Training",
      explanation: "Adjust the model weights based on the task-specific examples.",
      example: `The model adjusts to predict sentiment or masked words based on examples like "The cat [MASK] on the mat" → "happily".`,
    },
    {
      title: "Fine-tuning: Final Model",
      explanation: "The model is ready to use for your specific task, such as translation, summarization, or classification.",
      example: `Now, the model can output results for different tasks: "The cat sits on the mat." → Sentiment: Neutral. "Translate: 'The cat sits on the mat.'" → "Le chat est assis sur le tapis."`,
    },
  ];
  
  const getExplanation = () => (activeView === "architecture" ? architectureExplanations[step] : trainingExplanations[step]);

  const maxSteps = activeView === "architecture" ? architectureExplanations.length - 1 : trainingExplanations.length - 1;

  const LayerBlock = ({ title, active, highlight }) => (
    <motion.div
      style={{
        width: "200px",
        height: "80px",
        borderRadius: "8px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: "bold",
        backgroundColor: active ? "#e0f2ff" : "#f0f0f0",
        border: `2px solid ${highlight ? "#007bff" : "#ccc"}`,
        boxShadow: highlight ? "0px 4px 12px rgba(0, 123, 255, 0.2)" : "none",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {title}
    </motion.div>
  );

  const ArchitectureView = () => (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>{getExplanation().title}</h2>
      <p style={{ textAlign: "center", maxWidth: "600px", marginBottom: "10px", color: "#555" }}>{getExplanation().explanation}</p>
      <motion.p
        style={{
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
          padding: "12px",
          fontStyle: "italic",
          textAlign: "center",
          maxWidth: "600px",
        }}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <strong>Example:</strong> {getExplanation().example}
      </motion.p>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <LayerBlock title="Input Embeddings + Positional Encoding" active={step >= 0} highlight={step === 0} />
        {step >= 1 && (
          <div style={{ display: "flex", justifyContent: "center", gap: "16px" }}>
            <LayerBlock title="Multi-Head Self-Attention" active={step >= 1} highlight={step === 1} />
            <div style={{ display: "flex", gap: "8px" }}>
              <LayerBlock title="Q" active={step >= 2} highlight={step === 2} />
              <LayerBlock title="K" active={step >= 2} highlight={step === 2} />
              <LayerBlock title="V" active={step >= 2} highlight={step === 2} />
            </div>
          </div>
        )}
        {step >= 3 && <LayerBlock title="Feed Forward Network" active={step >= 3} highlight={step === 3} />}
        {step >= 4 && <LayerBlock title="Layer Normalization" active={step >= 4} highlight={step === 4} />}
        {step >= 5 && <LayerBlock title="Output Projection" active={step >= 5} highlight={step === 5} />}
      </div>
    </div>
  );

  const TrainingView = () => (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>{getExplanation().title}</h2>
      <p style={{ textAlign: "center", maxWidth: "600px", marginBottom: "10px", color: "#555" }}>{getExplanation().explanation}</p>
      <motion.p
        style={{
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
          padding: "12px",
          fontStyle: "italic",
          textAlign: "center",
          maxWidth: "600px",
        }}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <strong>Example:</strong> {getExplanation().example}
      </motion.p>
      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "16px", justifyContent: "center" }}>
        <LayerBlock title="Data Collection" active={step >= 0} highlight={step === 0} />
        <LayerBlock title="Self-Supervised Learning" active={step >= 1} highlight={step === 1} />
        <LayerBlock title="Initial Model" active={step >= 2} highlight={step === 2} />
        <LayerBlock title="Task-Specific Data" active={step >= 3} highlight={step === 3} />
        <LayerBlock title="Fine-tuning" active={step >= 4} highlight={step === 4} />
        <LayerBlock title="Final Model" active={step >= 5} highlight={step === 5} />
      </div>
    </div>
  );
  
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <div style={{ marginBottom: "20px" }}>
        <button
          style={{
            padding: "12px 24px",
            marginRight: "8px",
            backgroundColor: activeView === "architecture" ? "#007bff" : "#ddd",
            color: activeView === "architecture" ? "white" : "#333",
            borderRadius: "8px",
            cursor: "pointer",
            border: "none",
          }}
          onClick={() => {
            setActiveView("architecture");
            setStep(0);
          }}
        >
          Architecture
        </button>
        <button
          style={{
            padding: "12px 24px",
            backgroundColor: activeView === "training" ? "#007bff" : "#ddd",
            color: activeView === "training" ? "white" : "#333",
            borderRadius: "8px",
            cursor: "pointer",
            border: "none",
          }}
          onClick={() => {
            setActiveView("training");
            setStep(0);
          }}
        >
          Training Process
        </button>
      </div>

      {activeView === "architecture" ? <ArchitectureView /> : <TrainingView />}

      <div style={{ marginTop: "20px" }}>
        <button
          style={{
            padding: "12px 24px",
            marginRight: "8px",
            backgroundColor: step > 0 ? "#007bff" : "#ccc",
            color: "white",
            borderRadius: "8px",
            cursor: step > 0 ? "pointer" : "not-allowed",
            border: "none",
          }}
          onClick={() => setStep(step - 1)}
          disabled={step === 0}
        >
          <ChevronLeft /> Previous
        </button>
        <button
          style={{
            padding: "12px 24px",
            backgroundColor: step < maxSteps ? "#007bff" : "#ccc",
            color: "white",
            borderRadius: "8px",
            cursor: step < maxSteps ? "pointer" : "not-allowed",
            border: "none",
          }}
          onClick={() => setStep(step + 1)}
          disabled={step === maxSteps}
        >
          Next <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default TransformerVisualizer;
