import "./DetailPanel.css"
import { motion } from "framer-motion"

import type { Theme } from "../types"

interface DetailPanelProps {
  node: Theme | null
  onClose: () => void
}

const themeColors: Record<string, string> = {
  "01": "#47536b",
  "02": "#9c4a2e",
  "03": "#2f6b4f",
  "04": "#b8752e",
  "05": "#6b2a4e",
  "06": "#2e4374",
  "07": "#1c6e77",
  "08": "#8a6d1f",
}

function hexToRgba(hex: string, alpha: number) {
  const normalized = hex.replace("#", "")
  const value = normalized.length === 3
    ? normalized
        .split("")
        .map((char) => char + char)
        .join("")
    : normalized

  const numeric = Number.parseInt(value, 16)
  const r = (numeric >> 16) & 255
  const g = (numeric >> 8) & 255
  const b = numeric & 255

  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

function getAccentColor(node: Theme) {
  const prefix = (node.id ?? "").split("-")[0] ?? ""
  return themeColors[prefix] ?? "#64748b"
}

export default function DetailPanel({
  node,
  onClose,
}: DetailPanelProps) {
  if (!node) return null

  const accentColor = getAccentColor(node)
  const accentSoft = hexToRgba(accentColor, 0.12)
  const accentStrong = hexToRgba(accentColor, 0.2)

  return (
    <>
      <motion.div
        className="detail-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
      />

      <motion.aside
        className="detail-panel"
        style={{
          ["--panel-accent" as string]: accentColor,
          ["--panel-accent-soft" as string]: accentSoft,
          ["--panel-accent-strong" as string]: accentStrong,
        }}
        role="dialog"
        aria-modal="true"
        initial={{ x: "105%", opacity: 0.2 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: "105%", opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 28,
          mass: 0.75,
        }}
      >
        <div className="detail-panel__header">
          <button
            className="detail-panel__close"
            onClick={onClose}
            aria-label="Close details"
          >
            ✕
          </button>
        </div>

        <motion.h2
          className="detail-panel__title"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.1 }}
        >
          {node.name}
        </motion.h2>

        <div className="detail-panel__content">
          {node.sections?.length ? (
            node.sections.map((section, sectionIndex) => (
              <motion.section
                key={section.title}
                className="detail-panel__section"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.15 + sectionIndex * 0.08 }}
              >
                <h3 className="detail-panel__section-title">
                  {section.title}
                </h3>

                <div className="detail-panel__items">
                  {section.items.map((item, itemIndex) => (
                    <motion.article
                      key={item.title}
                      className="detail-panel__item"
                      initial={{ opacity: 0, x: 18 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.28,
                        delay: 0.2 + sectionIndex * 0.08 + itemIndex * 0.05,
                      }}
                    >
                      <h4 className="detail-panel__item-title">
                        {item.title}
                      </h4>

                      <p className="detail-panel__item-description">
                        {item.description}
                      </p>
                    </motion.article>
                  ))}
                </div>
              </motion.section>
            ))
          ) : (
            <motion.div
              className="detail-panel__empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              No detailed information available for this selection.
            </motion.div>
          )}
        </div>
      </motion.aside>
    </>
  )
}

