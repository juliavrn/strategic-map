import { useEffect, useRef, useState } from "react"
import * as d3 from "d3"
import type { Theme } from "../types"

interface SunburstProps {
  data: Theme
  onSelect: (node: Theme) => void

}

const themeColors: Record<string, string> = {
  Environment: "#2E7D32",
  Health: "#C62828",
  Education: "#1565C0",
  Economy: "#EF6C00",
  Technology: "#6A1B9A",
  Society: "#00838F",
  Governance: "#5D4037",
  Infrastructure: "#455A64",
}

export default function Sunburst({
    data,
    onSelect
  }: SunburstProps) {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const previousFocus = useRef<string | null>(null)
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

  const wrapText = (
    text: string,
    maxCharacters: number,
  ) => {
    const words = text.split(" ")
    const lines: string[] = []
    let currentLine = ""

    words.forEach((word) => {
      const testLine = currentLine
        ? `${currentLine} ${word}`
        : word

      if (testLine.length <= maxCharacters) {
        currentLine = testLine
      } else {
        if (currentLine) {
          lines.push(currentLine)
        }

        currentLine = word
      }
    })

    if (currentLine) {
      lines.push(currentLine)
    }

    return lines
  }

  const animateArc = (
  selection: d3.Selection<
    SVGPathElement,
    d3.HierarchyRectangularNode<Theme>,
    SVGGElement,
    unknown
  >,
  arcGenerator: d3.Arc<
    d3.HierarchyRectangularNode<Theme>,
    d3.DefaultArcObject
  >
) => {

  selection
    .transition()
    .duration(900)
    .ease(d3.easeCubicInOut)
    .attrTween("d", function (node) {

      const element = d3.select(this)

      const previous = element.datum() as any

      const interpolate = d3.interpolate(
        previous,
        node
      )

      return (t) => {

        const current = interpolate(t)

        return arcGenerator(current) ?? ""

      }

    })

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

    // We only allow MAPA or a main theme as the focus.
    const focus =
      focusName === null
        ? root
        : root.children?.find(
            (node) => node.data.name === focusName,
          ) ?? root
    const previousFocus = focusName

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
      .attr("stroke", "#e5e7eb")
      .attr("stroke-width", 2)

    center
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "-0.1em")
      .attr("font-size", "24px")
      .attr("font-weight", "600")
      .text(
        focus === root
          ? "MAPA"
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
  .attr("d", arc)
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

    console.log("Focus:", node.data.name)

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

      const maxCharacters =
        node.depth === 1 ? 18 : 14

      const lines = wrapText(
        node.data.name,
        maxCharacters,
      )

      const lineHeight =
        node.depth === 1 ? 14 : 12

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
    console.log("Focus:", node.data.name)
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

