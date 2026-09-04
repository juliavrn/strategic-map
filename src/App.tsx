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
          src="/logo_original.png"
          alt="Observatório da Indústria e Sistema FIEPA"
        />
        <h1>Mapa Estratégico da Indústria do Pará</h1>
        <p className="app-intro">O MAPA ESTRATÉGICO DA INDÚSTRIA DO PARÁ traduz as prioridades e desafios do setor industrial paraense, alinhados à agenda nacional da CNI. A partir das particularidades do Estado, o mapa organiza os principais eixos estratégicos e as ações necessárias para fortalecer a indústria, promover seu desenvolvimento e ampliar sua competitividade de forma sustentável.</p>
        <p>Esta síntese organiza o Mapa Estratégico da Indústria do Pará 2026-2032 na hierarquia Fator-Chave → Tema Prioritário → Objetivo → Iniciativas, reunindo em macroiniciativas as 620 ações estaduais mapeadas no documento-fonte, sem alterar seu sentido original. O Mapa organiza a agenda de competitividade em 8 Fatores-Chave — sem hierarquia entre eles —, desdobrados em 32 Temas Prioritários e 96 Objetivos. Cada fator recebe aqui uma cor de referência inspirada em materiais e produtos do próprio Pará, usada de forma consistente como sistema de navegação ao longo do documento.</p>
      </header>

      <section className="map-stats">
        <div className="map-stat">
          <strong>08</strong>
          <span>Fatores-Chave</span>
        </div>
        <div className="map-stat">
          <strong>32</strong>
          <span>Temas Prioritários</span>
        </div>
        <div className="map-stat">
          <strong>96</strong>
          <span>Objetivos</span>
        </div>
        <div className="map-stat">
          <strong>620</strong>
          <span>Iniciativas · Pará</span>
        </div>
      </section>

      <Sunburst data={themes} onSelect={setSelectedNode} />

      <DetailPanel
        node={selectedNode}
        onClose={() => setSelectedNode(null)}
      />
    </main>
  )
}

export default App