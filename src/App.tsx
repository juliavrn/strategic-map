import Sunburst from "./components/Sunburst"
import { themes } from "./data/themes"

function App() {
  return (
    <main>
      <h1>MAPA</h1>

      <Sunburst data={themes} />
    </main>
  )
}

export default App