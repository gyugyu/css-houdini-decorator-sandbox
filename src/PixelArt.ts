import { CSSPaint, CSSProperty, CSSPaintMethod } from './decorators'

@CSSPaint()
export default class PixelArt {

  @CSSProperty()
  pixelSize!: string

  @CSSProperty()
  pixelPaint!: string

  static get contextOptions() { return { alpha: true } }

  @CSSPaintMethod()
  paint(ctx: CanvasRenderingContext2D) {
    const pixelSize = parseInt(this.pixelSize, 10)
    const pixelPaint = this.pixelPaint.trim().split('/')
    const colorMap = pixelPaint[0].trim().split(' ')
    const pixelRows = pixelPaint[1].trim()
      .replace(/(['"])\s+\1/g, '$1|$1').split('|')
      .map(pixel => pixel.replace(/['"]/g, '').split(' '))

    for (let i = 0; i < pixelRows.length; i++) {
      const pixelRow = pixelRows[i]

      for (let q = 0; q < pixelRow.length; q++) {
        ctx.fillStyle = colorMap[parseInt(pixelRow[q], 10)]
        ctx.fillRect(pixelSize * q, pixelSize * i, pixelSize, pixelSize)
      }
    }
  }
}
