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
      .attr("r", radius * 0.25)
      .attr("fill", "#fdfaf6")
      .attr("stroke", "rgba(122, 104, 95, 0.18)")
      .attr("stroke-width", 1.5)

    const centerRadius = radius * 0.18
    const centerTitle =
      focus === root
        ? "PARA A NOVA INDÚSTRIA"
        : focus.data.name
    const centerTitleMaxWidth = centerRadius * 1.55
    const centerTitleWords = centerTitle.split(" ")
    let centerTitleFontSize = 24
    let centerTitleLines: string[] = []

    const buildCenterTitleLines = () => {
      centerTitleLines = []
      let currentLine = ""

      centerTitleWords.forEach((word) => {
        const candidate = currentLine
          ? `${currentLine} ${word}`
          : word
        const measurement = center
          .append("text")
          .attr("font-size", `${centerTitleFontSize}px`)
          .text(candidate)
        const candidateWidth =
          measurement.node()?.getComputedTextLength() ?? 0

        measurement.remove()

        if (!currentLine || candidateWidth <= centerTitleMaxWidth) {
          currentLine = candidate
        } else {
          centerTitleLines.push(currentLine)
          currentLine = word
        }
      })

      if (currentLine) centerTitleLines.push(currentLine)
    }

    while (centerTitleFontSize >= 10) {
      buildCenterTitleLines()
      const longestLineWidth = Math.max(
        ...centerTitleLines.map((line) => {
          const measurement = center
            .append("text")
            .attr("font-size", `${centerTitleFontSize}px`)
            .text(line)
          const lineWidth =
            measurement.node()?.getComputedTextLength() ?? 0

          measurement.remove()
          return lineWidth
        }),
      )

      if (
        longestLineWidth <= centerTitleMaxWidth &&
        centerTitleLines.length <= 3
      ) {
        break
      }

      centerTitleFontSize -= 1
    }

    const titleLineHeight = centerTitleFontSize * 1.1
    const titleStartY =
      -((centerTitleLines.length - 1) * titleLineHeight) / 2

    if (focus === root) {
      center
        .append("text")
        .attr("text-anchor", "middle")
        .attr("y", titleStartY - 22)
        .attr("font-size", "9px")
        .attr("fill", "#6b7280")
        .text("O CAMINHO")
    }

    const title = center
      .append("text")
      .attr("text-anchor", "middle")
      .attr("font-size", `${centerTitleFontSize}px`)
      .attr("font-weight", "600")
      .attr("transform", "translate(0, 10)")
    centerTitleLines.forEach((line, index) => {
      title
        .append("tspan")
        .attr("x", 0)
        .attr("y", titleStartY + index * titleLineHeight)
        .attr(
          "font-family",
          centerTitle === "PARA A NOVA INDÚSTRIA" ? "Fraunces, serif" : null,
        )
        .text(line)
    })

    if (focus !== root) {
      center
        .append("text")
        .attr("text-anchor", "middle")
        .attr(
          "y",
          titleStartY +
            centerTitleLines.length * titleLineHeight +
            14,
        )
        .attr("font-size", "9px")
        .attr("fill", "#6b7280")
        .text("Clique para voltar")
    }

    // Return to MAPA
    center.on("click", () => {
      if (focus !== root) {
        setFocusName(null)
      }
    })

    // -----------------------------------------
    // VISIBLE NODES
    // -----------------------------------------

    const mainNodes =
      focus === root
        ? root.descendants().filter(
            (node) => node.depth === 1,
          )
        : []

    const subThemeNodes =
      focus === root
        ? root.descendants().filter(
            (node) => node.depth === 2,
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
const mainPaths = group
  .selectAll<
    SVGPathElement,
    d3.HierarchyRectangularNode<Theme>
  >("path.arc")
  .data(
    mainNodes,
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
    "pointer",
  )

const subThemePaths = group
  .selectAll<
    SVGPathElement,
    d3.HierarchyRectangularNode<Theme>
  >("path.sub-theme-arc")
  .data(
    subThemeNodes,
    (node) => node.data.name,
  )
  .join("path")
  .attr("class", "sub-theme-arc")
  .attr("d", (node) => arc(node))
  .attr("fill", (node) => getColor(node))
  .attr("stroke", "white")
  .attr("stroke-width", 2)
  .attr("cursor", "pointer")
  .attr("opacity", focus === root ? 0 : 1)

mainPaths
  .attr("opacity", 0)
  .transition()
  .duration(700)
  .ease(d3.easeCubicOut)
  .attr("opacity", 1)


const handleNodeClick = (node: d3.HierarchyRectangularNode<Theme>) => {
  if (node.depth === 1) {
    setFocusName(node.data.name)
    return
  }

  if (node.depth === 2) {
    onSelect({
      ...node.data,
      parentName: node.parent?.data.name,
    })
  }
}

// CLICK EN DEHORS DE LA TRANSITION
mainPaths.on("click", (_, node) => {
  handleNodeClick(node)
})

subThemePaths.on("click", (_, node) => {
  handleNodeClick(node)
})

    // -----------------------------------------
    // LABELS
    // -----------------------------------------

    const mainLabels = group
      .selectAll<
        SVGTextElement,
        d3.HierarchyRectangularNode<Theme>
      >("text.label")
      .data(
        mainNodes,
        (node) => node.data.name,
      )
      .join("text")
      .attr("class", "label")
      .attr("text-anchor", "middle")
      .attr("fill", "white")
      .attr("font-size", (node) =>
        node.depth === 1 ? "11px" : "8px",
      )
      .attr("cursor", (node) =>
        node.depth === 1 ? "pointer" : "default",
      )
      .style("user-select", "none")
      .style("-webkit-user-select", "none")
      .on("click", (_, node) => {
        handleNodeClick(node)
      })
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

    const subThemeLabels = group
  .selectAll<
    SVGTextElement,
    d3.HierarchyRectangularNode<Theme>
  >("text.sub-theme-label")
  .data(
    subThemeNodes,
    (node) => node.data.name,
  )
  .join("text")
  .attr("class", "sub-theme-label")
  .attr("text-anchor", "middle")
  .attr("fill", "white")
  .attr("font-size", "10px")
  .attr("cursor", "pointer")
  .style("user-select", "none")
  .style("-webkit-user-select", "none")
  .attr("opacity", focus === root ? 0 : 1)
.each(function (node) {
  const text = d3.select(this)
  const words = node.data.name.split(" ").flatMap((word) => {
    if (word.length <= 12) return [word]

    const chunks = word.match(/.{1,10}/g) ?? [word]
    return chunks.map((chunk, index) =>
      index < chunks.length - 1 ? `${chunk}-` : chunk,
    )
  })

  const maxCharsPerLine = 14
  const lines: string[] = []
  let currentLine = ""

  words.forEach((word) => {
    const testLine = currentLine
      ? `${currentLine} ${word}`
      : word

    if (testLine.length <= maxCharsPerLine) {
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

  text.selectAll("tspan").remove()

  const lineHeight = 10
  const startY =
    -((lines.length - 1) * lineHeight) / 2

  lines.forEach((line, index) => {
    text
      .append("tspan")
      .attr("x", 0)
      .attr("y", startY + index * lineHeight)
      .text(line)
  })
})  .attr("transform", (node) => {
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
        Math.max(0, node.y1 - focusRadiusStart)) /
      2

    return `
      rotate(${middleAngle})
      translate(${labelRadius}, 0)
      rotate(${middleAngle > 90 ? 180 : 0})
    `
  })
  .on("click", (_, node) => {
    handleNodeClick(node)
  })

    const labels = mainLabels.merge(subThemeLabels)

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
    node.depth === 1 ? 11 : 8

  const minimumFontSize =
    node.depth === 1 ? 9 : 6

  const horizontalPadding =
    node.depth === 1 ? 28 : 10

  const maxWidth = Math.max(8, availableWidth - horizontalPadding)

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

      if (!currentLine || width <= maxWidth) {
        currentLine = testLine
      } else {
        lines.push(currentLine)
        currentLine = word
      }
    })

    if (currentLine) {
      lines.push(currentLine)
    }

    const isClickedSubtheme =
      focus !== root && node.depth === focus.depth + 1

    if (isClickedSubtheme && words.length > 1) {
      let bestLines = [words[0], words.slice(1).join(" ")]
      let bestWidth = Number.POSITIVE_INFINITY

      for (let splitIndex = 1; splitIndex < words.length; splitIndex += 1) {
        const candidateLines = [
          words.slice(0, splitIndex).join(" "),
          words.slice(splitIndex).join(" "),
        ]
        const candidateWidth = Math.max(
          ...candidateLines.map((line) => {
            const measurement = text
              .append("tspan")
              .attr("x", 0)
              .text(line)
            const width =
              measurement.node()?.getComputedTextLength() ?? 0

            measurement.remove()
            return width
          }),
        )

        if (candidateWidth < bestWidth) {
          bestWidth = candidateWidth
          bestLines = candidateLines
        }
      }

      lines = bestLines
    }
  }

  /*
   * Try progressively smaller font sizes
   * until the complete label fits.
   *
   * We NEVER truncate the text.
   */
  while (fontSize > minimumFontSize) {
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
    if (longestLineWidth <= maxWidth && lines.length <= 2) {
      break
    }

    fontSize -= 0.5
  }

  /*
   * Rebuild the final label.
   */
  fontSize = Math.max(fontSize, minimumFontSize)
  text.attr("font-size", `${fontSize}px`)

  text.selectAll("tspan").remove()

  buildLines()
  const lineHeight = fontSize + 2

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

if (focus === root) {
  const revealSubThemes = (themeName: string, opacity: number) => {
    subThemePaths
      .filter(
        (node) => node.parent?.data.name === themeName,
      )
      .transition()
      .duration(450)
      .ease(d3.easeCubicOut)
      .attr("opacity", opacity)

    subThemeLabels
      .filter(
        (node) => node.parent?.data.name === themeName,
      )
      .transition()
      .duration(450)
      .ease(d3.easeCubicOut)
      .attr("opacity", opacity)
  }

  mainPaths
    .on("mouseenter", (_, node) => {
      revealSubThemes(node.data.name, 1)
    })
    .on("mouseleave", (_, node) => {
      revealSubThemes(node.data.name, 0)
    })

  mainLabels
    .on("mouseenter", (_, node) => {
      revealSubThemes(node.data.name, 1)
    })
    .on("mouseleave", (_, node) => {
      revealSubThemes(node.data.name, 0)
    })

  subThemePaths
    .on("mouseenter", (_, node) => {
      if (node.parent) {
        revealSubThemes(node.parent.data.name, 1)
      }
    })
    .on("mouseleave", (_, node) => {
      if (node.parent) {
        revealSubThemes(node.parent.data.name, 0)
      }
    })

  subThemeLabels
    .on("mouseenter", (_, node) => {
      if (node.parent) {
        revealSubThemes(node.parent.data.name, 1)
      }
    })
    .on("mouseleave", (_, node) => {
      if (node.parent) {
        revealSubThemes(node.parent.data.name, 0)
      }
    })
}

}, [data, focusName])


return (

  <svg

    ref={svgRef}
    className="sunburst"

    style={{
      width: "100%",
      height: "auto",
      display: "block",
    }}

  />

)

}

