import "./DetailPanel.css"
import { motion } from "framer-motion"

import type { Theme } from "../types"

interface DetailPanelProps {
  node: Theme | null
  onClose: () => void
}

export default function DetailPanel({
  node,
  onClose,
}: DetailPanelProps) {
  if (!node) return null

  return (
    <>
      {/* Background overlay */}
      <motion.div
        className="detail-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Detail panel */}
      <motion.aside
        className="detail-panel"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.35 }}
      >
        <button
          className="detail-panel__close"
          onClick={onClose}
          aria-label="Close details"
        >
          ✕
        </button>

        <h2 className="detail-panel__title">
          {node.name}
        </h2>

        {node.image && (
          <img
            className="detail-panel__image"
            src={node.image}
            alt={node.name}
          />
        )}

        <p className="detail-panel__description">
          {node.description}
        </p>

        {node.objectives && (
          <section className="detail-panel__objectives">
            <h3>Strategic objectives</h3>

            <ul>
              {node.objectives.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        )}
      </motion.aside>
    </>
  )
}

