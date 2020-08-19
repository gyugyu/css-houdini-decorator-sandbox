import './index.css'
import PixelArt from './PixelArt'

if ('paintWorklet' in CSS) {
  (CSS as any).paintWorklet.addModule('/paint_worklet_module.js')
} else {
  document.body.textContent = 'Paint API is not supported.'
}

const canvas: HTMLCanvasElement = document.getElementById('canvas')! as HTMLCanvasElement
const ctx = canvas.getContext('2d')

const pixelArt = new PixelArt()
pixelArt.pixelSize = '15'
pixelArt.pixelPaint = `
  transparent #d80200 #706800 #f1b000 /
  "0 0 1 1 1 1 1 1 0 0 0 0"
  "0 1 1 1 1 1 1 1 1 1 0 0"
  "0 0 2 2 2 3 2 3 0 0 0 0"
  "0 2 3 2 3 3 2 3 3 3 0 0"
  "0 2 3 2 2 3 3 2 3 3 3 0"
  "0 2 2 3 3 3 2 2 2 2 0 0"
  "0 0 0 3 3 3 3 3 3 0 0 0"
  "0 0 2 2 1 2 2 2 0 0 0 0"
  "0 2 2 2 1 2 2 1 2 2 2 0"
  "2 3 2 2 1 1 1 1 2 2 2 2"
  "3 3 2 1 3 1 1 3 1 2 3 3"
  "3 3 3 1 1 1 1 1 1 3 3 3"
  "0 0 1 1 1 0 0 1 1 1 0 0"
  "0 2 2 2 0 0 0 0 2 2 2 0"
  "2 2 2 2 0 0 0 0 2 2 2 2"
`
pixelArt.paint(ctx!)
