import Sunburst from "./components/Sunburst"
import DetailPanel from "./components/DetailPanel"
import themes  from "./data/themes.json"
import { useState } from "react"
import type { Theme } from "./types"

function App() {

  const [selectedNode, setSelectedNode] = useState<Theme | null>(null)

  return (

    <main
      style={{
        minHeight: "100vh",
        background: "white",
      }}
    >
      <h1>Mapa Estratégico</h1>
      <Sunburst
        data={themes}
        onSelect={setSelectedNode}
      />

      <DetailPanel
        node={selectedNode}
        onClose={() => setSelectedNode(null)}
      />

    </main>
  )
}
export default App