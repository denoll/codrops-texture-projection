import * as THREE from 'three'
import { mapRange } from 'canvas-sketch-util/math'
import { ProjectedMaterial } from '../lib/ProjectedMaterial'

const AREA_WIDTH = 2.8
const AREA_HEIGHT = 1.7

export class Boxes extends THREE.Group {
  boxes = []

  constructor({ webgl, ...options }) {
    super(options)
    this.webgl = webgl

    const unitX = 0.1
    const unitY = 0.1
    const rows = Math.ceil(AREA_HEIGHT / unitX)
    const columns = Math.ceil(AREA_WIDTH / unitY)

    for (let row = 0; row < rows; row++) {
      for (let column = 0; column < columns; column++) {
        const geometry = new THREE.BoxBufferGeometry(unitX, unitY, unitY)
        const material = new THREE.MeshBasicMaterial({ color: 0xffffff * Math.random() })
        const box = new THREE.Mesh(geometry, material)

        box.position.x = mapRange(column, 0, columns, -AREA_WIDTH / 2, AREA_WIDTH / 2)
        box.position.y = mapRange(row, 0, rows, -AREA_HEIGHT / 2, AREA_HEIGHT / 2)

        box.updateMatrixWorld()
        // material.project(box.matrixWorld)

        this.add(box)
        this.boxes.push(box)
      }
    }
  }

  update(dt, time) {}
}
