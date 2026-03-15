export interface CanvasChannels { h: number; s: number; l: number; boost: number }

function readVar(style: CSSStyleDeclaration, name: string, fallback: number): number {
  const v = parseFloat(style.getPropertyValue(name))
  return Number.isNaN(v) ? fallback : v
}

export function getCanvasChannels(el: Element = document.documentElement): CanvasChannels {
  const style = getComputedStyle(el)
  return {
    h: readVar(style, "--canvas-h", 0),
    s: readVar(style, "--canvas-s", 0),
    l: readVar(style, "--canvas-l", 100),
    boost: readVar(style, "--canvas-alpha-boost", 1),
  }
}

export function canvasColor(ch: CanvasChannels, alpha: number): string {
  return `hsla(${ch.h},${ch.s}%,${ch.l}%,${Math.min(alpha * ch.boost, 1)})`
}
