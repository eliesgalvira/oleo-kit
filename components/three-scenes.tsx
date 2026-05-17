"use client"

import * as React from "react"
import * as THREE from "three"

type SceneKind = "puck" | "boat" | "squeezer"

type ThreeSceneProps = {
  kind: SceneKind
  label: string
}

type SceneRuntime = {
  root: THREE.Group
  update: (delta: number, elapsed: number) => void
}

type PathPoint = {
  x: number
  z: number
}

function createFoamTexture() {
  const canvas = document.createElement("canvas")
  canvas.width = 256
  canvas.height = 256
  const ctx = canvas.getContext("2d")

  if (!ctx) {
    return null
  }

  ctx.fillStyle = "#d6c06f"
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  for (let i = 0; i < 420; i += 1) {
    const x = Math.random() * canvas.width
    const y = Math.random() * canvas.height
    const radius = 2 + Math.random() * 11
    const alpha = 0.08 + Math.random() * 0.22

    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(59, 45, 25, ${alpha})`
    ctx.fill()
  }

  for (let i = 0; i < 80; i += 1) {
    const x = Math.random() * canvas.width
    const y = Math.random() * canvas.height
    const radius = 5 + Math.random() * 18

    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.strokeStyle = "rgba(246, 229, 149, 0.32)"
    ctx.lineWidth = 1
    ctx.stroke()
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(2.5, 1.5)
  texture.colorSpace = THREE.SRGBColorSpace

  return texture
}

function createWaterMaterial(opacity = 0.82) {
  return new THREE.MeshStandardMaterial({
    color: 0x5f9da3,
    emissive: 0x0a2528,
    emissiveIntensity: 0.08,
    metalness: 0.05,
    roughness: 0.42,
    transparent: true,
    opacity,
  })
}

function createOilMaterial(opacity = 0.72) {
  return new THREE.MeshStandardMaterial({
    color: 0x25190f,
    emissive: 0x351e0a,
    emissiveIntensity: 0.12,
    roughness: 0.28,
    transparent: true,
    opacity,
  })
}

function addLights(scene: THREE.Scene) {
  scene.add(new THREE.HemisphereLight(0xfff4cb, 0x17575d, 2.2))

  const key = new THREE.DirectionalLight(0xffe7a8, 2.8)
  key.position.set(4, 5, 4)
  scene.add(key)

  const rim = new THREE.DirectionalLight(0x84e3ef, 1.1)
  rim.position.set(-3, 2, -5)
  scene.add(rim)
}

function addSeaPlane(root: THREE.Group, size = 8, opacity = 0.58) {
  const sea = new THREE.Mesh(
    new THREE.PlaneGeometry(size, size, 48, 48),
    createWaterMaterial(opacity)
  )
  sea.rotation.x = -Math.PI / 2
  sea.position.y = -0.05
  root.add(sea)

  const grid = new THREE.GridHelper(size, 12, 0xa1c7b3, 0x6b9588)
  grid.position.y = -0.035
  const gridMaterial = grid.material as THREE.Material
  gridMaterial.transparent = true
  gridMaterial.opacity = 0.18
  root.add(grid)

  return sea
}

function createPuckRuntime() {
  const root = new THREE.Group()
  root.rotation.x = -0.08
  addSeaPlane(root, 6.2, 0.5)

  const oil = new THREE.Mesh(
    new THREE.CircleGeometry(1.9, 96),
    createOilMaterial(0.55)
  )
  oil.rotation.x = -Math.PI / 2
  oil.scale.set(1.35, 0.42, 1)
  oil.position.y = -0.028
  oil.position.z = -0.18
  root.add(oil)

  const foamTexture = createFoamTexture()
  const puckMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xd9c46e,
    map: foamTexture ?? undefined,
    roughness: 0.86,
    clearcoat: 0.12,
    clearcoatRoughness: 0.8,
  })

  const puck = new THREE.Mesh(new THREE.SphereGeometry(1, 96, 48), puckMaterial)
  puck.scale.set(1.45, 0.24, 1.45)
  puck.position.y = 0.22
  root.add(puck)

  const edge = new THREE.Mesh(
    new THREE.TorusGeometry(1.45, 0.018, 10, 160),
    new THREE.MeshStandardMaterial({
      color: 0x684a21,
      roughness: 0.72,
      transparent: true,
      opacity: 0.56,
    })
  )
  edge.rotation.x = Math.PI / 2
  edge.position.y = 0.22
  root.add(edge)

  const poreGeometry = new THREE.SphereGeometry(0.026, 6, 6)
  const poreMaterial = new THREE.MeshStandardMaterial({
    color: 0x2b2114,
    roughness: 0.92,
  })
  const pores = new THREE.InstancedMesh(poreGeometry, poreMaterial, 150)
  const dummy = new THREE.Object3D()

  for (let i = 0; i < 150; i += 1) {
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(0.3 + Math.random() * 0.64)
    const x = 1.47 * Math.sin(phi) * Math.cos(theta)
    const y = 0.22 + 0.25 * Math.cos(phi)
    const z = 1.47 * Math.sin(phi) * Math.sin(theta)
    dummy.position.set(x, y, z)
    dummy.scale.setScalar(0.45 + Math.random() * 1.5)
    dummy.updateMatrix()
    pores.setMatrixAt(i, dummy.matrix)
  }

  pores.instanceMatrix.needsUpdate = true
  root.add(pores)

  const capillary = new THREE.Mesh(
    new THREE.CylinderGeometry(0.012, 0.012, 0.5, 10),
    new THREE.MeshStandardMaterial({
      color: 0x1b6f78,
      emissive: 0x0d5963,
      emissiveIntensity: 0.45,
    })
  )
  capillary.position.set(-0.86, 0.26, 0.78)
  root.add(capillary)

  const radiusLine = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0.51, -1.45),
      new THREE.Vector3(0, 0.51, 1.45),
    ]),
    new THREE.LineBasicMaterial({
      color: 0x1f5b62,
      transparent: true,
      opacity: 0.75,
    })
  )
  root.add(radiusLine)

  const thicknessLine = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(1.68, -0.03, 0),
      new THREE.Vector3(1.68, 0.47, 0),
    ]),
    new THREE.LineBasicMaterial({
      color: 0x7f4b16,
      transparent: true,
      opacity: 0.85,
    })
  )
  root.add(thicknessLine)

  return {
    root,
    update: (_delta: number, elapsed: number) => {
      root.rotation.y += 0.0025
      oil.material.opacity = 0.47 + Math.sin(elapsed * 1.4) * 0.05
      puck.rotation.y = Math.sin(elapsed * 0.42) * 0.08
    },
  } satisfies SceneRuntime
}

function makeBlobShape(radiusX = 2.8, radiusZ = 1.55) {
  const shape = new THREE.Shape()

  for (let i = 0; i <= 80; i += 1) {
    const t = (i / 80) * Math.PI * 2
    const r =
      1 +
      Math.sin(t * 3.1) * 0.08 +
      Math.cos(t * 5.4) * 0.065 +
      Math.sin(t * 7.2) * 0.035
    const x = Math.cos(t) * radiusX * r
    const y = Math.sin(t) * radiusZ * r

    if (i === 0) {
      shape.moveTo(x, y)
    } else {
      shape.lineTo(x, y)
    }
  }

  return shape
}

function createSpongeCylinder(length: number, radius: number) {
  const material = new THREE.MeshStandardMaterial({
    color: 0xd0b55c,
    roughness: 0.86,
  })
  const mesh = new THREE.Mesh(
    new THREE.CapsuleGeometry(radius, length, 6, 16),
    material
  )
  mesh.rotation.z = Math.PI / 2
  return mesh
}

function pathLength(points: PathPoint[]) {
  let length = 0

  for (let i = 1; i < points.length; i += 1) {
    length += Math.hypot(
      points[i].x - points[i - 1].x,
      points[i].z - points[i - 1].z
    )
  }

  return length
}

function samplePath(points: PathPoint[], distance: number) {
  let remaining = distance

  for (let i = 1; i < points.length; i += 1) {
    const from = points[i - 1]
    const to = points[i]
    const segment = Math.hypot(to.x - from.x, to.z - from.z)

    if (remaining <= segment) {
      const t = remaining / segment
      const x = from.x + (to.x - from.x) * t
      const z = from.z + (to.z - from.z) * t
      const heading = Math.atan2(to.x - from.x, to.z - from.z)

      return { x, z, heading }
    }

    remaining -= segment
  }

  const last = points[points.length - 1]
  const previous = points[points.length - 2]

  return {
    x: last.x,
    z: last.z,
    heading: Math.atan2(last.x - previous.x, last.z - previous.z),
  }
}

function createBoatRuntime() {
  const root = new THREE.Group()
  root.rotation.x = -0.14
  addSeaPlane(root, 8.5, 0.7)

  const slick = new THREE.Mesh(
    new THREE.ShapeGeometry(makeBlobShape()),
    createOilMaterial(0.7)
  )
  slick.rotation.x = -Math.PI / 2
  slick.position.y = -0.012
  slick.position.z = 0.1
  root.add(slick)

  const lanePoints = [
    new THREE.Vector3(-2.8, 0.025, -1.25),
    new THREE.Vector3(2.8, 0.025, -1.25),
    new THREE.Vector3(2.8, 0.025, -0.55),
    new THREE.Vector3(-2.8, 0.025, -0.55),
    new THREE.Vector3(-2.8, 0.025, 0.15),
    new THREE.Vector3(2.8, 0.025, 0.15),
    new THREE.Vector3(2.8, 0.025, 0.85),
    new THREE.Vector3(-2.8, 0.025, 0.85),
  ]
  const pathLine = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(lanePoints),
    new THREE.LineBasicMaterial({
      color: 0xf5c84c,
      transparent: true,
      opacity: 0.9,
    })
  )
  root.add(pathLine)

  const boat = new THREE.Group()

  const hull = new THREE.Mesh(
    new THREE.BoxGeometry(0.32, 0.16, 0.78),
    new THREE.MeshStandardMaterial({
      color: 0xd9e4d4,
      roughness: 0.48,
      metalness: 0.05,
    })
  )
  hull.position.y = 0.18
  boat.add(hull)

  const bow = new THREE.Mesh(
    new THREE.ConeGeometry(0.18, 0.36, 4),
    new THREE.MeshStandardMaterial({
      color: 0xe2c84d,
      roughness: 0.52,
    })
  )
  bow.rotation.y = Math.PI / 4
  bow.rotation.x = Math.PI / 2
  bow.position.set(0, 0.18, 0.56)
  boat.add(bow)

  const cabin = new THREE.Mesh(
    new THREE.BoxGeometry(0.22, 0.14, 0.24),
    new THREE.MeshStandardMaterial({
      color: 0x23525a,
      roughness: 0.54,
    })
  )
  cabin.position.set(0, 0.32, 0.03)
  boat.add(cabin)

  const boom = new THREE.Group()
  boom.position.z = -0.75

  const towMaterial = new THREE.LineBasicMaterial({
    color: 0x23352f,
    transparent: true,
    opacity: 0.82,
  })

  const leftTow = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0.15, 0.1),
      new THREE.Vector3(-0.88, 0.08, -0.72),
    ]),
    towMaterial
  )
  const rightTow = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0.15, 0.1),
      new THREE.Vector3(0.88, 0.08, -0.72),
    ]),
    towMaterial
  )
  boom.add(leftTow, rightTow)

  for (let side = -1; side <= 1; side += 2) {
    for (let i = 0; i < 7; i += 1) {
      const sponge = createSpongeCylinder(0.28, 0.055)
      sponge.position.set(side * (0.34 + i * 0.17), 0.075, -0.62 - i * 0.095)
      sponge.rotation.y = side * 0.54
      boom.add(sponge)
    }
  }

  for (let i = -2; i <= 2; i += 1) {
    const puck = new THREE.Mesh(
      new THREE.SphereGeometry(0.09, 24, 12),
      new THREE.MeshStandardMaterial({
        color: 0xcdb45a,
        roughness: 0.85,
      })
    )
    puck.scale.set(1.2, 0.25, 1.2)
    puck.position.set(i * 0.18, 0.08, -1.42)
    boom.add(puck)
  }

  boat.add(boom)
  root.add(boat)

  const points: PathPoint[] = lanePoints.map((point) => ({
    x: point.x,
    z: point.z,
  }))
  const total = pathLength(points)

  return {
    root,
    update: (_delta: number, elapsed: number) => {
      const sample = samplePath(points, (elapsed * 0.58) % total)
      boat.position.set(
        sample.x,
        0.05 + Math.sin(elapsed * 2.2) * 0.012,
        sample.z
      )
      boat.rotation.y = sample.heading
      slick.scale.setScalar(1 + Math.sin(elapsed * 0.6) * 0.015)
      boom.rotation.z = Math.sin(elapsed * 1.8) * 0.03
    },
  } satisfies SceneRuntime
}

function createSqueezerRuntime() {
  const root = new THREE.Group()
  root.rotation.x = -0.08
  addSeaPlane(root, 6.4, 0.38)

  const base = new THREE.Mesh(
    new THREE.BoxGeometry(4.3, 0.08, 1.25),
    new THREE.MeshStandardMaterial({
      color: 0x314944,
      roughness: 0.62,
    })
  )
  base.position.y = 0.02
  root.add(base)

  const rollerMaterial = new THREE.MeshStandardMaterial({
    color: 0xb7b18a,
    roughness: 0.36,
    metalness: 0.15,
  })
  const rollerA = new THREE.Mesh(
    new THREE.CylinderGeometry(0.18, 0.18, 1.36, 32),
    rollerMaterial
  )
  rollerA.rotation.x = Math.PI / 2
  rollerA.position.set(-0.2, 0.34, 0)
  root.add(rollerA)

  const rollerB = new THREE.Mesh(
    new THREE.CylinderGeometry(0.18, 0.18, 1.36, 32),
    rollerMaterial
  )
  rollerB.rotation.x = Math.PI / 2
  rollerB.position.set(0.28, 0.34, 0)
  root.add(rollerB)

  const puck = new THREE.Mesh(
    new THREE.SphereGeometry(1, 64, 24),
    new THREE.MeshStandardMaterial({
      color: 0xc9b155,
      roughness: 0.88,
    })
  )
  puck.scale.set(0.42, 0.08, 0.42)
  puck.position.set(-1.9, 0.26, 0)
  root.add(puck)

  const oilBand = new THREE.Mesh(
    new THREE.TorusGeometry(0.44, 0.018, 8, 80),
    createOilMaterial(0.8)
  )
  oilBand.rotation.x = Math.PI / 2
  oilBand.position.y = 0.265
  puck.add(oilBand)

  const nozzle = new THREE.Mesh(
    new THREE.BoxGeometry(0.12, 0.18, 1.18),
    new THREE.MeshStandardMaterial({
      color: 0x203f46,
      roughness: 0.5,
      metalness: 0.18,
    })
  )
  nozzle.position.set(1.02, 0.64, 0)
  root.add(nozzle)

  const jetMaterial = new THREE.LineBasicMaterial({
    color: 0xb8f1ed,
    transparent: true,
    opacity: 0.72,
  })
  const jets = new THREE.Group()

  for (let i = 0; i < 9; i += 1) {
    const z = -0.48 + i * 0.12
    const jet = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0.95, 0.55, z),
        new THREE.Vector3(1.55, 0.32, z * 0.72),
      ]),
      jetMaterial
    )
    jets.add(jet)
  }

  root.add(jets)

  const dropletGeometry = new THREE.SphereGeometry(0.035, 10, 10)
  const dropletMaterial = createOilMaterial(0.72)
  const droplets = new THREE.InstancedMesh(dropletGeometry, dropletMaterial, 18)
  const dummy = new THREE.Object3D()

  for (let i = 0; i < 18; i += 1) {
    dummy.position.set(
      1.3 + Math.random() * 1.2,
      0.16 + Math.random() * 0.35,
      -0.52 + Math.random() * 1.04
    )
    dummy.scale.setScalar(0.6 + Math.random() * 1.2)
    dummy.updateMatrix()
    droplets.setMatrixAt(i, dummy.matrix)
  }

  root.add(droplets)

  return {
    root,
    update: (_delta: number, elapsed: number) => {
      const pass = (elapsed * 0.45) % 3.8
      puck.position.x = -1.9 + pass
      puck.scale.y =
        0.08 - Math.max(0, 1 - Math.abs(puck.position.x - 0.03) * 3.2) * 0.035
      rollerA.rotation.z += 0.045
      rollerB.rotation.z -= 0.045
      jets.scale.x = 0.85 + Math.sin(elapsed * 8) * 0.08
      dropletMaterial.opacity = 0.52 + Math.sin(elapsed * 3) * 0.14
    },
  } satisfies SceneRuntime
}

function disposeMaterial(material: THREE.Material) {
  const candidate = material as THREE.Material & {
    map?: THREE.Texture
    normalMap?: THREE.Texture
    roughnessMap?: THREE.Texture
    emissiveMap?: THREE.Texture
  }

  candidate.map?.dispose()
  candidate.normalMap?.dispose()
  candidate.roughnessMap?.dispose()
  candidate.emissiveMap?.dispose()
  material.dispose()
}

function disposeObject(object: THREE.Object3D) {
  object.traverse((child) => {
    const mesh = child as THREE.Mesh
    mesh.geometry?.dispose()

    if (Array.isArray(mesh.material)) {
      mesh.material.forEach(disposeMaterial)
    } else if (mesh.material) {
      disposeMaterial(mesh.material)
    }
  })
}

function createRuntime(kind: SceneKind) {
  if (kind === "boat") {
    return createBoatRuntime()
  }

  if (kind === "squeezer") {
    return createSqueezerRuntime()
  }

  return createPuckRuntime()
}

export function ThreeScene({ kind, label }: ThreeSceneProps) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null)

  React.useEffect(() => {
    const canvas = canvasRef.current

    if (!canvas) {
      return
    }

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      canvas,
      preserveDrawingBuffer: true,
      powerPreference: "high-performance",
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace

    const scene = new THREE.Scene()
    addLights(scene)

    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100)
    camera.position.set(0, 3.2, kind === "boat" ? 6.6 : 5.1)
    camera.lookAt(0, 0, 0)

    const runtime = createRuntime(kind)
    scene.add(runtime.root)

    let isDragging = false
    let lastX = 0
    let lastY = 0
    let raf = 0
    let previous = performance.now()
    const start = previous

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const width = Math.max(1, rect.width)
      const height = Math.max(1, rect.height)
      renderer.setSize(width, height, false)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }

    const observer = new ResizeObserver(resize)
    observer.observe(canvas)
    resize()

    const onPointerDown = (event: PointerEvent) => {
      isDragging = true
      lastX = event.clientX
      lastY = event.clientY
      canvas.setPointerCapture(event.pointerId)
    }

    const onPointerMove = (event: PointerEvent) => {
      if (!isDragging) {
        return
      }

      const dx = event.clientX - lastX
      const dy = event.clientY - lastY
      runtime.root.rotation.y += dx * 0.006
      runtime.root.rotation.x += dy * 0.003
      runtime.root.rotation.x = THREE.MathUtils.clamp(
        runtime.root.rotation.x,
        -0.55,
        0.32
      )
      lastX = event.clientX
      lastY = event.clientY
    }

    const onPointerUp = (event: PointerEvent) => {
      isDragging = false

      if (canvas.hasPointerCapture(event.pointerId)) {
        canvas.releasePointerCapture(event.pointerId)
      }
    }

    canvas.addEventListener("pointerdown", onPointerDown)
    canvas.addEventListener("pointermove", onPointerMove)
    canvas.addEventListener("pointerup", onPointerUp)
    canvas.addEventListener("pointercancel", onPointerUp)

    const animate = (now: number) => {
      const delta = Math.min((now - previous) / 1000, 0.05)
      previous = now
      runtime.update(delta, (now - start) / 1000)
      renderer.render(scene, camera)
      raf = requestAnimationFrame(animate)
    }

    raf = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
      canvas.removeEventListener("pointerdown", onPointerDown)
      canvas.removeEventListener("pointermove", onPointerMove)
      canvas.removeEventListener("pointerup", onPointerUp)
      canvas.removeEventListener("pointercancel", onPointerUp)
      scene.remove(runtime.root)
      disposeObject(runtime.root)
      renderer.dispose()
    }
  }, [kind])

  return (
    <canvas
      ref={canvasRef}
      aria-label={label}
      className="h-full min-h-[360px] w-full touch-none"
      role="img"
    />
  )
}
