import PixelArt from './PixelArt'

declare var registerPaint: any

if (typeof registerPaint !== 'undefined') {
  registerPaint('pixelArt', PixelArt)
}
