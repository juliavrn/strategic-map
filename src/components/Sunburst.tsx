import { useEffect, useRef, useState } from "react"
import * as d3 from "d3"
import type { Theme } from "../types"

interface SunburstProps {
  data: Theme
  onSelect: (node: Theme) => void

}

const themeColors: Record<string, string> = {
  "Ambiente de Negócios": "#47536b",
  "Ambiente Econômico": "#9c4a2e",
  "Baixo Carbono e Recursos Naturais": "#2f6b4f",
  "Comércio e Integração Internacional": "#b8752e",
  "Desenvolvimento Humano e Trabalho": "#6b2a4e",
  "Desenvolvimento Produtivo, Tecnologia e Inovação": "#2e4374",
  "Educação": "#1c6e77",
  "Infraestrutura": "#8a6d1f",
}

export default function Sunburst({
    data,
    onSelect
  }: SunburstProps) {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const [focusName, setFocusName] = useState<string | null>(null)

  const getColor = (
    node: d3.HierarchyRectangularNode<Theme>,
  ) => {
    const theme =
      node.depth === 1
        ? node.data.name
        : node.ancestors().find(
            (ancestor) => ancestor.depth === 1,
          )?.data.name

    const baseColor = themeColors[theme ?? ""] ?? "#999999"

    if (node.depth === 1) {
      return baseColor
    }

    const childrenCount =
      node.parent?.children?.length ?? 1

    const index =
      node.parent?.children?.indexOf(node) ?? 0

    const color = d3.hsl(baseColor)

    const lightnessStep = 0.12

    const lightness = Math.max(
      0.25,
      Math.min(
        0.75,
        color.l +
          (index - (childrenCount - 1) / 2) *
            lightnessStep,
      ),
    )

    return d3
      .hsl(color.h, color.s, lightness)
      .formatHex()
  }


  useEffect(() => {
    if (!svgRef.current) return

    const width = 700
    const height = 700
    const radius = width / 2

    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", `0 0 ${width} ${height}`)

const rootGroup = svg.select("g.main-group")

if (!rootGroup.empty()) {
  rootGroup.remove()
}
    // -----------------------------------------
    // HIERARCHY
    // -----------------------------------------

    const root = d3
      .hierarchy(data)
      .sum((node) => node.value ?? 0) as d3.HierarchyRectangularNode<Theme>

    const partition = d3
      .partition<Theme>()
      .size([2 * Math.PI, radius])

    partition(root)

    const mainThemes = root.children ?? []

    const layoutChildren = (
  parent: d3.HierarchyRectangularNode<Theme>,
  startAngle: number,
  endAngle: number,
) => {
  const children = parent.children ?? []

  if (children.length === 0) return

  const totalValue = children.reduce(
    (sum, child) => sum + (child.value ?? 0),
    0,
  )

  let currentAngle = startAngle

  children.forEach((child) => {
    const proportion =
      totalValue > 0
        ? (child.value ?? 0) / totalValue
        : 1 / children.length

    const childStart = currentAngle
    const childEnd =
      childStart +
      (endAngle - startAngle) * proportion

    child.x0 = childStart
    child.x1 = childEnd

    layoutChildren(
      child,
      childStart,
      childEnd,
    )

    currentAngle = childEnd
  })
}

mainThemes.forEach((theme, index) => {
  const startAngle =
    (index / mainThemes.length) *
    2 *
    Math.PI

  const endAngle =
    ((index + 1) / mainThemes.length) *
    2 *
    Math.PI

  theme.x0 = startAngle
  theme.x1 = endAngle

  layoutChildren(
    theme,
    startAngle,
    endAngle,
  )
})

    const focus =
      focusName === null
        ? root
        : root.children?.find(
            (node) => node.data.name === focusName,
          ) ?? root

    const focusAngleSize = focus.x1 - focus.x0
    const focusRadiusStart = focus.y0

    // -----------------------------------------
    // MAIN GROUP
    // -----------------------------------------

    const group = svg
      .append("g")
      .attr("class", "main-group")
      .attr(
        "transform",
        `translate(${width / 2}, ${height / 2})`,
      )

    // -----------------------------------------
    // ARC GENERATOR
    // -----------------------------------------

    const arc = d3
      .arc<d3.HierarchyRectangularNode<Theme>>()
      .startAngle((node) => {
        const angle =
          ((node.x0 - focus.x0) / focusAngleSize) *
          2 *
          Math.PI

        return Math.max(0, Math.min(2 * Math.PI, angle))
      })
      .endAngle((node) => {
        const angle =
          ((node.x1 - focus.x0) / focusAngleSize) *
          2 *
          Math.PI

        return Math.max(0, Math.min(2 * Math.PI, angle))
      })
      .innerRadius((node) =>
        Math.max(0, node.y0 - focusRadiusStart),
      )
      .outerRadius((node) =>
        Math.max(
          0,
          node.y1 - focusRadiusStart - 2,
        ),
      )

    // -----------------------------------------
    // CENTER
    // -----------------------------------------

    const center = group
      .append("g")
      .attr("cursor", "pointer")

    center
      .append("circle")
      .attr("r", radius * 0.18)
      .attr("fill", "white")

    center
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "-0.1em")
      .attr("font-size", "24px")
      .attr("font-weight", "600")
      .text(
        focus === root
          ? "Mapa"
          : focus.data.name,
      )

    center
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "1.4em")
      .attr("font-size", "12px")
      .attr("fill", "#6b7280")
      .text(
        focus === root
          ? "Overview"
          : "Click to return",
      )

    // Return to MAPA
    center.on("click", () => {
      if (focus !== root) {
        setFocusName(null)
      }
    })

    // -----------------------------------------
    // VISIBLE NODES
    // -----------------------------------------

    const visibleNodes =
      focus === root
        ? root.descendants().filter(
            (node) => node.depth > 0,
          )
        : focus
            .descendants()
            .filter(
              (node) =>
                node.depth > focus.depth,
            )

// -----------------------------------------
// ARCS
// -----------------------------------------
const paths = group
  .selectAll<
    SVGPathElement,
    d3.HierarchyRectangularNode<Theme>
  >("path.arc")
  .data(
    visibleNodes,
    (node) => node.data.name,
  )
  .join("path")
  .attr("class", "arc")
  .attr("d", (node) => arc(node))
  .attr("fill", (node) => getColor(node))
  .attr("stroke", "white")
  .attr("stroke-width", 2)
  .attr(
    "cursor",
    (node) =>
      node.depth === 1 || node.depth === 2
        ? "pointer"
        : "default",
  )

// animation SEULEMENT ici
paths
  .attr("opacity", 0)
  .transition()
  .duration(700)
  .ease(d3.easeCubicOut)
  .attr("opacity", 1)


// CLICK EN DEHORS DE LA TRANSITION
paths.on("click", (_, node) => {

  if (node.depth === 1) {

    setFocusName(node.data.name)

    return
  }

  if (node.depth === 2) {

    onSelect(node.data)

  }

})

    // -----------------------------------------
    // LABELS
    // -----------------------------------------

    const labels = group
      .selectAll<
        SVGTextElement,
        d3.HierarchyRectangularNode<Theme>
      >("text.label")
      .data(
        visibleNodes,
        (node) => node.data.name,
      )
      .join("text")
      .attr("class", "label")
      .attr("text-anchor", "middle")
      .attr("fill", "white")
      .attr("font-size", (node) =>
        node.depth === 1 ? "13px" : "10px",
      )
      .attr("cursor", (node) =>
        node.depth === 1 ? "pointer" : "default",
      )
      .attr("transform", (node) => {
        const startAngle =
          ((node.x0 - focus.x0) / focusAngleSize) *
          2 *
          Math.PI

        const endAngle =
          ((node.x1 - focus.x0) / focusAngleSize) *
          2 *
          Math.PI

        const middleAngle =
          ((startAngle + endAngle) / 2) *
            (180 / Math.PI) -
          90

        const labelRadius =
          (Math.max(0, node.y0 - focusRadiusStart) +
            Math.max(
              0,
              node.y1 - focusRadiusStart,
            )) /
          2

        return `
          rotate(${middleAngle})
          translate(${labelRadius}, 0)
          rotate(${middleAngle > 90 ? 180 : 0})
        `
      })

// -----------------------------------------
// LABEL CONTENT
// -----------------------------------------

labels.each(function (node) {
  const text = d3.select(this)

  text.selectAll("tspan").remove()


  const startAngle =
    ((node.x0 - focus.x0) / focusAngleSize) *
    2 *
    Math.PI

  const endAngle =
    ((node.x1 - focus.x0) / focusAngleSize) *
    2 *
    Math.PI


  const labelRadius =
    (Math.max(0, node.y0 - focusRadiusStart) +
      Math.max(
        0,
        node.y1 - focusRadiusStart,
      )) /
    2

  const availableWidth =
    2 *
    labelRadius *
    Math.sin(
      Math.min(
        endAngle - startAngle,
        Math.PI,
      ) / 2,
    )

  /*
   * Main themes have more space.
   * Sub-themes use a smaller initial font.
   */
  let fontSize =
    node.depth === 1 ? 13 : 10

  const minimumFontSize =
    node.depth === 1 ? 11 : 7

  const horizontalPadding =
    node.depth === 1 ? 16 : 10

  const maxWidth = Math.max(
    20,
    availableWidth - horizontalPadding,
  )

  /*
   * Split the name into words.
   */
  const words = node.data.name.split(" ")

  let lines: string[] = []

  /*
   * Build the text using the actual SVG
   * text measurement.
   */
  const buildLines = () => {
    lines = []

    let currentLine = ""

    words.forEach((word) => {
      const testLine = currentLine
        ? `${currentLine} ${word}`
        : word

      const testTspan = text
        .append("tspan")
        .attr("x", 0)
        .text(testLine)

      const width =
        testTspan.node()?.getComputedTextLength() ?? 0

      testTspan.remove()

      if (
        !currentLine ||
        width <= maxWidth
      ) {
        currentLine = testLine
      } else {
        lines.push(currentLine)
        currentLine = word
      }
    })

    if (currentLine) {
      lines.push(currentLine)
    }
  }

  /*
   * Try progressively smaller font sizes
   * until the complete label fits.
   *
   * We NEVER truncate the text.
   */
  while (fontSize >= minimumFontSize) {
    text.attr(
      "font-size",
      `${fontSize}px`,
    )

    buildLines()

    const longestLineWidth = Math.max(
      ...lines.map((line) => {
        const tspan = text
          .append("tspan")
          .attr("x", 0)
          .text(line)

        const width =
          tspan.node()?.getComputedTextLength() ?? 0

        tspan.remove()

        return width
      }),
    )

    /*
     * Maximum two lines for readability.
     */
    if (
      longestLineWidth <= maxWidth &&
      lines.length <= 2
    ) {
      break
    }

    fontSize -= 0.5
  }

  /*
   * Rebuild the final label.
   */
  text
    .attr(
      "font-size",
      `${Math.max(fontSize, minimumFontSize)}px`,
    )

  text.selectAll("tspan").remove()

  const lineHeight =
    node.depth === 1
      ? fontSize + 2
      : fontSize + 2

  const startY =
    -((lines.length - 1) * lineHeight) / 2

  lines.forEach((line, index) => {
    text
      .append("tspan")
      .attr("x", 0)
      .attr(
        "y",
        startY + index * lineHeight,
      )
      .text(line)
  })
})


  // Click only on main theme labels
labels.on("click", (_, node) => {


  if (node.depth === 1) {
    setFocusName(node.data.name)
    return
  }

  if (node.depth === 2) {
    onSelect(node.data)
  }

})


}, [data, focusName])


return (

  <svg

    ref={svgRef}

    style={{
      width: "100%",
      height: "auto",
      display: "block",
    }}

  />

)

}

