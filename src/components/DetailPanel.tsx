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

        {node.sections?.map((section) => (
          <section
            key={section.title}
            className="detail-panel__section"
          >
            <h3 className="detail-panel__section-title">
              {section.title}
            </h3>

            {section.items.map((item) => (
              <article
                key={item.title}
                className="detail-panel__item"
              >
                <h4 className="detail-panel__item-title">
                  - {item.title}:
                </h4>

                <p className="detail-panel__item-description">
                  {item.description}
                </p>
              </article>
            ))}
          </section>
        ))}
      </motion.aside>
    </>
  )
}

