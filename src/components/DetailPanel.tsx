import { motion } from "framer-motion"

import type { Theme } from "../types"


interface DetailPanelProps {

  node: Theme | null

  onClose: () => void

}


export default function DetailPanel({
  node,
  onClose
}: DetailPanelProps) {


  if (!node) return null


  return (

    <>
      {/* Overlay derrière le panneau */}
      <motion.div

        initial={{ opacity: 0 }}

        animate={{ opacity: 1 }}

        exit={{ opacity: 0 }}

        onClick={onClose}

        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.35)",
          backdropFilter: "blur(4px)",
          zIndex: 20
        }}

      />


      {/* Panel */}
      <motion.aside

        initial={{
          x: "100%"
        }}

        animate={{
          x: 0
        }}

        exit={{
          x: "100%"
        }}

        transition={{
          duration: 0.35
        }}
        style={{
          position: "fixed",
          right: 0,
          top: 0,
          width: "420px",
          height: "100vh",
          background: "#ffffff",
          padding: "32px",
          zIndex: 30,
          overflowY: "auto",
          boxShadow: "-10px 0 30px rgba(0,0,0,0.15)"
        }}

      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            border: "none",
            background: "#f3f4f6",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            cursor: "pointer",
            fontSize: "18px"
          }}
        >
          ✕
        </button>
        <h2
          style={{
            marginTop: "20px",
            fontSize: "32px",
            color: "#111827"
          }}
        >
          {node.name}
        </h2>
        {node.image && (
          <img
            src={node.image}
            alt={node.name}
            style={{
              width: "100%",
              height: "220px",
              objectFit: "cover",
              borderRadius: "16px",
              marginTop: "20px"
            }}

          />

        )}



        <p
          style={{
            lineHeight: 1.6,
            color: "#4b5563",
            marginTop: "20px"
          }}
        >
          {node.description}

        </p>



        {node.objectives && (

          <>

            <h3>
              Strategic objectives
            </h3>


            <ul>

              {node.objectives.map((item)=> (

                <li key={item}>
                  {item}
                </li>

              ))}

            </ul>

          </>

        )}


      </motion.aside>


    </>

  )

}