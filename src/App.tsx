import Sunburst from "./components/Sunburst"
import DetailPanel from "./components/DetailPanel"
import themes from "./data/themes.json"
import { useState } from "react"
import type { Theme } from "./types"

function App() {
  const [selectedNode, setSelectedNode] = useState<Theme | null>(null)

  return (
    <main className="app-shell">
      <header className="app-header">
        <img
          className="app-logo"
          src="/logo_preto.png"
          alt="Observatório da Indústria e Sistema FIEPA"
        />
        <p className="app-kicker">Visão estratégica</p>
        <h1>Mapa Estratégico</h1>
        <p className="app-intro">
          Um mapa visual dos principais pilares estratégicos, suas prioridades
          e as ações que impulsionam o desenvolvimento industrial e territorial.
          Explore os temas e subtemas para compreender como as diferentes iniciativas se conectam e contribuem para os objetivos estratégicos.
        </p>
      </header>

      <Sunburst data={themes} onSelect={setSelectedNode} />

      <DetailPanel
        node={selectedNode}
        onClose={() => setSelectedNode(null)}
      />
    </main>
  )
}

export default App