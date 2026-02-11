"use client";

import React from "react";

class Point3D {
  constructor(public x: number, public y: number, public z: number) {}
}

export default function InteractiveCanvasBackground() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const animationFrameId = React.useRef<number | null>(null);
  const mouseRef = React.useRef<{
    x: number | undefined;
    y: number | undefined;
    radius: number;
  }>({
    x: undefined,
    y: undefined,
    radius: 25,
  });

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const FL = 800;
    let frameCount = 0;
    const matrixChars =
      "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッн0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const rainFontSize = 14;
    const isTouchDevice =
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches;
    const rainFallSpeed = isTouchDevice ? 1.0 : 1.2;

    let rainStreams: MatrixRainStream[] = [];
    let cubes: Cube[] = [];

    class MatrixRainCharacter {
      x: number;
      y: number;
      speed: number;
      isLeading: boolean;
      value: string;
      switchInterval: number;

      constructor(x: number, y: number, speed: number, isLeading: boolean) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.isLeading = isLeading;
        this.value = "";
        this.switchInterval = Math.round(
          Math.random() * (isTouchDevice ? 30 : 20) + 5
        );
        this.setRandomSymbol();
      }
      setRandomSymbol() {
        this.value =
          matrixChars[Math.floor(Math.random() * matrixChars.length)];
      }
      update() {
        if (frameCount % this.switchInterval === 0) this.setRandomSymbol();
        this.y -= this.speed;
      }
    }

    class MatrixRainStream {
      x: number;
      characters: MatrixRainCharacter[];
      totalChars: number;
      speed: number;
      canvasHeight: number;

      constructor(x: number, canvasHeight: number) {
        this.x = x;
        this.characters = [];
        this.totalChars = Math.round(
          Math.random() * (isTouchDevice ? 12 : 15) + 10
        );
        this.speed = (Math.random() * 0.5 + 0.5) * rainFallSpeed;
        this.canvasHeight = canvasHeight;
        this.generateCharacters();
      }
      generateCharacters() {
        this.characters = [];
        let currentY =
          this.canvasHeight + Math.random() * this.canvasHeight * 0.3;
        for (let i = 0; i < this.totalChars; i++) {
          this.characters.push(
            new MatrixRainCharacter(
              this.x,
              currentY,
              this.speed,
              i === this.totalChars - 1
            )
          );
          currentY += rainFontSize;
        }
      }
      draw(currentCtx: CanvasRenderingContext2D) {
        for (let i = 0; i < this.characters.length; i++) {
          const char = this.characters[i];
          char.update();

          if (
            char.y > -rainFontSize &&
            char.y < this.canvasHeight + rainFontSize
          ) {
            const leadFactor = (i + 1) / this.characters.length;
            if (char.isLeading) {
              currentCtx.fillStyle = `rgba(230, 230, 230, ${
                0.85 + leadFactor * 0.15
              })`;
            } else {
              currentCtx.fillStyle = `rgba(150, 150, 150, ${
                0.5 + leadFactor * 0.3
              })`;
            }
            currentCtx.font =
              rainFontSize + "px 'Consolas', 'Monaco', monospace";
            currentCtx.fillText(char.value, char.x, char.y);
          }
        }
        if (
          this.characters.length > 0 &&
          this.characters[this.characters.length - 1].y < -rainFontSize
        ) {
          this.generateCharacters();
        }
      }
    }

    function project3D(
      x: number,
      y: number,
      z: number,
      canvasWidth: number,
      canvasHeight: number
    ) {
      if (FL + z <= 0.1) return { x: 0, y: 0, scale: -1 };
      const scale = FL / (FL + z);
      const screenX = canvasWidth / 2 + x * scale;
      const screenY = canvasHeight / 2 + y * scale;
      return { x: screenX, y: screenY, scale: scale };
    }

    class WhiteDebrisParticle {
      pos: Point3D;
      baseSize: number;
      vel: Point3D;
      alpha: number;
      gravityY: number;
      lifeSpan: number;
      decay: number;
      rotation: number;
      rotationSpeed: number;

      constructor(
        x: number,
        y: number,
        z: number,
        baseSize: number,
        initialVelocity?: Point3D
      ) {
        this.pos = new Point3D(x, y, z);
        this.baseSize = Math.max(1, baseSize);
        this.vel =
          initialVelocity ||
          new Point3D(
            (Math.random() - 0.5) * 3.0,
            (Math.random() - 0.5) * 3.0 - Math.random() * 0.5,
            (Math.random() - 0.5) * 3.0
          );
        this.alpha = 1.0;
        this.gravityY = 0.06;
        this.lifeSpan = Math.random() * 50 + 30;
        this.decay = 1.0 / this.lifeSpan;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.15;
      }
      update() {
        this.vel.y += this.gravityY;
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
        this.pos.z += this.vel.z;
        this.alpha -= this.decay;
        if (this.alpha < 0) this.alpha = 0;
        this.rotation += this.rotationSpeed;
      }
      draw(
        currentCtx: CanvasRenderingContext2D,
        canvasWidth: number,
        canvasHeight: number
      ) {
        const projected = project3D(
          this.pos.x,
          this.pos.y,
          this.pos.z,
          canvasWidth,
          canvasHeight
        );
        if (projected.scale <= 0.01 || this.alpha <= 0) return;
        const currentSize = Math.max(0.5, this.baseSize * projected.scale);
        currentCtx.fillStyle = `rgba(200, 200, 200, ${0.1 * this.alpha})`;
        currentCtx.save();
        currentCtx.translate(projected.x, projected.y);
        currentCtx.rotate(this.rotation);
        currentCtx.fillRect(
          -currentSize / 2,
          -currentSize / 2,
          currentSize,
          currentSize
        );
        currentCtx.restore();
      }
    }

    class FaceParticle {
      pos: Point3D;
      rotationX: number;
      rotationY: number;
      rotationZ: number;
      localVertices: Point3D[];
      originalCubeSize: number;
      vel: Point3D;
      rotationSpeedX: number;
      rotationSpeedY: number;
      rotationSpeedZ: number;
      alpha: number;
      lifeSpan: number;
      decay: number;
      gravityY: number;

      constructor(
        initialWorldCenter: Point3D,
        initialWorldRotation: { x: number; y: number; z: number },
        shapeLocalVertices: Point3D[],
        worldNormal: Point3D,
        originalCubeSize: number
      ) {
        this.pos = initialWorldCenter;
        this.rotationX = initialWorldRotation.x;
        this.rotationY = initialWorldRotation.y;
        this.rotationZ = initialWorldRotation.z;
        this.localVertices = shapeLocalVertices;
        this.originalCubeSize = originalCubeSize;

        const speedFactor = 2.0 + Math.random() * 1.0;
        this.vel = new Point3D(
          worldNormal.x * speedFactor,
          worldNormal.y * speedFactor - (0.05 + Math.random() * 0.15),
          worldNormal.z * speedFactor
        );
        this.rotationSpeedX = (Math.random() - 0.5) * 0.07;
        this.rotationSpeedY = (Math.random() - 0.5) * 0.07;
        this.rotationSpeedZ = (Math.random() - 0.5) * 0.07;

        this.alpha = 1.0;
        this.lifeSpan = 55 + Math.random() * 20;
        this.decay = 1.0 / this.lifeSpan;
        this.gravityY = 0.035;
      }

      _rotateVertex(
        vertex: Point3D,
        rx: number,
        ry: number,
        rz: number
      ): Point3D {
        let x = vertex.x;
        let y = vertex.y;
        let z = vertex.z;
        const ty = y;
        y = ty * Math.cos(rx) - z * Math.sin(rx);
        z = ty * Math.sin(rx) + z * Math.cos(rx);
        const tx = x;
        x = tx * Math.cos(ry) + z * Math.sin(ry);
        z = -tx * Math.sin(ry) + z * Math.cos(ry);
        const txx = x;
        x = txx * Math.cos(rz) - y * Math.sin(rz);
        y = txx * Math.sin(rz) + y * Math.cos(rz);
        return new Point3D(x, y, z);
      }

      update() {
        this.vel.y += this.gravityY;
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
        this.pos.z += this.vel.z;
        this.rotationX += this.rotationSpeedX;
        this.rotationY += this.rotationSpeedY;
        this.rotationZ += this.rotationSpeedZ;
        this.alpha -= this.decay;
        if (this.alpha < 0) this.alpha = 0;
      }

      draw(
        currentCtx: CanvasRenderingContext2D,
        canvasWidth: number,
        canvasHeight: number
      ) {
        if (this.alpha <= 0) return;

        const worldRotatedVertices = this.localVertices.map((vLocal) => {
          const rotated = this._rotateVertex(
            vLocal,
            this.rotationX,
            this.rotationY,
            this.rotationZ
          );
          return new Point3D(
            rotated.x + this.pos.x,
            rotated.y + this.pos.y,
            rotated.z + this.pos.z
          );
        });

        const projectedVertices = worldRotatedVertices.map((v) =>
          project3D(v.x, v.y, v.z, canvasWidth, canvasHeight)
        );

        const validProjectedPoints = projectedVertices.filter(
          (p) => p && p.scale > 0 && isFinite(p.x) && isFinite(p.y)
        );

        if (validProjectedPoints.length < 2) return;

        currentCtx.strokeStyle = `rgba(200, 200, 200, ${0.1 * this.alpha})`;
        currentCtx.lineWidth = 1.5;
        currentCtx.beginPath();
        currentCtx.moveTo(validProjectedPoints[0].x, validProjectedPoints[0].y);
        for (let i = 1; i < validProjectedPoints.length; i++) {
          currentCtx.lineTo(
            validProjectedPoints[i].x,
            validProjectedPoints[i].y
          );
        }
        currentCtx.closePath();
        currentCtx.stroke();

        if (validProjectedPoints.length === 4) {
          currentCtx.lineWidth = 1.0;
          currentCtx.strokeStyle = `rgba(200, 200, 200, ${0.1 * this.alpha})`;
          const numHatchLines = 2;
          const [P0, P1, P2, P3] = validProjectedPoints as {
            x: number;
            y: number;
            scale: number;
          }[];

          for (let i = 1; i <= numHatchLines; i++) {
            const t = i / (numHatchLines + 1);
            const pA_h = {
              x: P0.x + (P3.x - P0.x) * t,
              y: P0.y + (P3.y - P0.y) * t,
            };
            const pB_h = {
              x: P1.x + (P2.x - P1.x) * t,
              y: P1.y + (P2.y - P1.y) * t,
            };
            if (
              isFinite(pA_h.x) &&
              isFinite(pA_h.y) &&
              isFinite(pB_h.x) &&
              isFinite(pB_h.y)
            ) {
              currentCtx.beginPath();
              currentCtx.moveTo(pA_h.x, pA_h.y);
              currentCtx.lineTo(pB_h.x, pB_h.y);
              currentCtx.stroke();
            }
            const pC_h = {
              x: P0.x + (P1.x - P0.x) * t,
              y: P0.y + (P1.y - P0.y) * t,
            };
            const pD_h = {
              x: P3.x + (P2.x - P3.x) * t,
              y: P3.y + (P2.y - P3.y) * t,
            };
            if (
              isFinite(pC_h.x) &&
              isFinite(pC_h.y) &&
              isFinite(pD_h.x) &&
              isFinite(pD_h.y)
            ) {
              currentCtx.beginPath();
              currentCtx.moveTo(pC_h.x, pC_h.y);
              currentCtx.lineTo(pD_h.x, pD_h.y);
              currentCtx.stroke();
            }
          }
        }
      }
    }

    class Cube {
      pos: Point3D;
      size: number;
      baseColor: string;
      speedY: number;
      rotationX: number;
      rotationY: number;
      rotationZ: number;
      rotationSpeedX: number;
      rotationSpeedY: number;
      rotationSpeedZ: number;
      isShattered: boolean;
      faceParticles: FaceParticle[];
      debrisParticles: WhiteDebrisParticle[];
      worldVertices: Point3D[];
      localVertices: Point3D[];
      faces: number[][];

      constructor(x: number, y: number, z: number, size: number) {
        this.pos = new Point3D(x, y, z);
        this.size = size;
        this.baseColor = "rgba(200, 200, 200, 0.1)";
        this.speedY = Math.random() * 1 + 0.5;
        this.rotationX = Math.random() * Math.PI * 2;
        this.rotationY = Math.random() * Math.PI * 2;
        this.rotationZ = Math.random() * Math.PI * 2;
        this.rotationSpeedX = (Math.random() - 0.5) * 0.01;
        this.rotationSpeedY = (Math.random() - 0.5) * 0.01;
        this.rotationSpeedZ = (Math.random() - 0.5) * 0.01;
        this.isShattered = false;
        this.faceParticles = [];
        this.debrisParticles = [];
        this.worldVertices = [];

        const s2 = this.size / 2;
        this.localVertices = [
          new Point3D(-s2, -s2, -s2),
          new Point3D(s2, -s2, -s2),
          new Point3D(s2, s2, -s2),
          new Point3D(-s2, s2, -s2),
          new Point3D(-s2, -s2, s2),
          new Point3D(s2, -s2, s2),
          new Point3D(s2, s2, s2),
          new Point3D(-s2, s2, s2),
        ];
        this.faces = [
          [0, 1, 2, 3],
          [1, 5, 6, 2],
          [5, 4, 7, 6],
          [4, 0, 3, 7],
          [3, 2, 6, 7],
          [4, 5, 1, 0],
        ];
      }

      _rotateVertex(
        vertex: Point3D,
        rx: number,
        ry: number,
        rz: number
      ): Point3D {
        let x = vertex.x,
          y = vertex.y,
          z = vertex.z;
        const ty = y;
        y = ty * Math.cos(rx) - z * Math.sin(rx);
        z = ty * Math.sin(rx) + z * Math.cos(rx);
        const tx = x;
        x = tx * Math.cos(ry) + z * Math.sin(ry);
        z = -tx * Math.sin(ry) + z * Math.cos(ry);
        const txx = x;
        x = txx * Math.cos(rz) - y * Math.sin(rz);
        y = txx * Math.sin(rz) + y * Math.cos(rz);
        return new Point3D(x, y, z);
      }

      shatter(canvasWidth: number, canvasHeight: number) {
        if (this.isShattered) return;
        this.isShattered = true;
        this.faceParticles = [];
        this.debrisParticles = [];

        const currentWorldVertices = this.localVertices.map((v) => {
          const rotated = this._rotateVertex(
            v,
            this.rotationX,
            this.rotationY,
            this.rotationZ
          );
          return new Point3D(
            rotated.x + this.pos.x,
            rotated.y + this.pos.y,
            rotated.z + this.pos.z
          );
        });

        this.faces.forEach((faceIndices) => {
          const worldFaceVertices = faceIndices.map(
            (idx) => currentWorldVertices[idx]
          );
          const faceCenter = new Point3D(0, 0, 0);
          worldFaceVertices.forEach((v) => {
            faceCenter.x += v.x;
            faceCenter.y += v.y;
            faceCenter.z += v.z;
          });
          faceCenter.x /= 4;
          faceCenter.y /= 4;
          faceCenter.z /= 4;

          const s2 = this.size / 2;
          const faceShapeLocalVertices = [
            new Point3D(-s2, -s2, 0),
            new Point3D(s2, -s2, 0),
            new Point3D(s2, s2, 0),
            new Point3D(-s2, s2, 0),
          ];
          const initialFaceRotation = {
            x: this.rotationX,
            y: this.rotationY,
            z: this.rotationZ,
          };
          let normal = new Point3D(
            faceCenter.x - this.pos.x,
            faceCenter.y - this.pos.y,
            faceCenter.z - this.pos.z
          );
          const nMag = Math.hypot(normal.x, normal.y, normal.z) || 1;
          normal = new Point3D(
            normal.x / nMag,
            normal.y / nMag,
            normal.z / nMag
          );

          this.faceParticles.push(
            new FaceParticle(
              faceCenter,
              initialFaceRotation,
              faceShapeLocalVertices,
              normal,
              this.size
            )
          );
        });

        const debrisCount = 35 + Math.floor(this.size / 2.5);
        const debrisBaseSize = 1.5 + this.size / 25;
        for (let i = 0; i < debrisCount; i++) {
          const offsetX = (Math.random() - 0.5) * this.size * 0.7;
          const offsetY = (Math.random() - 0.5) * this.size * 0.7;
          const offsetZ = (Math.random() - 0.5) * this.size * 0.7;
          this.debrisParticles.push(
            new WhiteDebrisParticle(
              this.pos.x + offsetX,
              this.pos.y + offsetY,
              this.pos.z + offsetZ,
              debrisBaseSize
            )
          );
        }
        this.worldVertices = [];
      }

      update(
        canvasWidth: number,
        canvasHeight: number,
        currentMouse: {
          x: number | undefined;
          y: number | undefined;
          radius: number;
        },
        isTouchDev: boolean
      ) {
        if (!this.isShattered) {
          this.pos.y += this.speedY;
          this.rotationX += this.rotationSpeedX;
          this.rotationY += this.rotationSpeedY;
          this.rotationZ += this.rotationSpeedZ;

          this.worldVertices = this.localVertices.map((v) => {
            const rotated = this._rotateVertex(
              v,
              this.rotationX,
              this.rotationY,
              this.rotationZ
            );
            return new Point3D(
              rotated.x + this.pos.x,
              rotated.y + this.pos.y,
              rotated.z + this.pos.z
            );
          });

          if (
            this.pos.y > canvasHeight / 2 + this.size * 2 ||
            this.pos.z > FL * 1.5
          ) {
            this.pos.y =
              -canvasHeight / 2 -
              this.size -
              Math.random() * canvasHeight * 0.8;
            this.pos.x = (Math.random() - 0.5) * canvasWidth * 1.2;
            this.pos.z = Math.random() * (FL / 1.5) - FL / 3;
            this.rotationX = Math.random() * Math.PI * 2;
            this.rotationY = Math.random() * Math.PI * 2;
            this.rotationZ = Math.random() * Math.PI * 2;
            this.speedY = Math.random() * 1 + 0.5;
          }

          if (currentMouse.x !== undefined && currentMouse.y !== undefined) {
            const projectedCenter = project3D(
              this.pos.x,
              this.pos.y,
              this.pos.z,
              canvasWidth,
              canvasHeight
            );
            if (projectedCenter.scale > 0) {
              const distToMouse = Math.hypot(
                projectedCenter.x - currentMouse.x,
                projectedCenter.y - currentMouse.y
              );
              const projectedRadius = (this.size * projectedCenter.scale) / 1.5;
              const interactionRadius = isTouchDev ? 60 : currentMouse.radius;
              if (distToMouse < interactionRadius + projectedRadius) {
                this.shatter(canvasWidth, canvasHeight);
              }
            }
          }
        } else {
          this.faceParticles.forEach((fp) => fp.update());
          this.faceParticles = this.faceParticles.filter((fp) => fp.alpha > 0);
          this.debrisParticles.forEach((dp) => dp.update());
          this.debrisParticles = this.debrisParticles.filter(
            (dp) => dp.alpha > 0
          );
          this.worldVertices = [];
        }
      }

      getAABB() {
        if (this.isShattered || this.worldVertices.length === 0) return null;
        let minX = Infinity,
          maxX = -Infinity,
          minY = Infinity,
          maxY = -Infinity,
          minZ = Infinity,
          maxZ = -Infinity;
        this.worldVertices.forEach((v) => {
          minX = Math.min(minX, v.x);
          maxX = Math.max(maxX, v.x);
          minY = Math.min(minY, v.y);
          maxY = Math.max(maxY, v.y);
          minZ = Math.min(minZ, v.z);
          maxZ = Math.max(maxZ, v.z);
        });
        return { minX, maxX, minY, maxY, minZ, maxZ };
      }

      draw(
        currentCtx: CanvasRenderingContext2D,
        canvasWidth: number,
        canvasHeight: number
      ) {
        if (!this.isShattered) {
          if (this.worldVertices.length === 0) return;
          const projectedVertices = this.worldVertices.map((v) =>
            project3D(v.x, v.y, v.z, canvasWidth, canvasHeight)
          );

          const facesWithZ = this.faces.map((faceIndices) => {
            let avgZ = 0,
              validVerticesForZ = 0;
            faceIndices.forEach((vertexIndex) => {
              if (this.worldVertices[vertexIndex]) {
                avgZ += this.worldVertices[vertexIndex].z;
                validVerticesForZ++;
              }
            });
            return {
              indices: faceIndices,
              z: validVerticesForZ > 0 ? avgZ / validVerticesForZ : -Infinity,
            };
          });
          facesWithZ.sort((a, b) => b.z - a.z);

          currentCtx.strokeStyle = this.baseColor;
          facesWithZ.forEach((faceData) => {
            const screenFacePoints = faceData.indices.map(
              (idx) => projectedVertices[idx]
            );
            if (
              screenFacePoints.some(
                (p) => !p || p.scale <= 0 || !isFinite(p.x) || !isFinite(p.y)
              ) ||
              screenFacePoints.length !== faceData.indices.length
            )
              return;

            currentCtx.beginPath();
            currentCtx.moveTo(screenFacePoints[0].x, screenFacePoints[0].y);
            for (let i = 1; i < screenFacePoints.length; i++)
              currentCtx.lineTo(screenFacePoints[i].x, screenFacePoints[i].y);
            currentCtx.closePath();
            currentCtx.lineWidth = 2;
            currentCtx.stroke();

            if (screenFacePoints.length === 4) {
              currentCtx.lineWidth = 0.5;
              currentCtx.strokeStyle = `rgba(200, 200, 200, 0.1)`;
              const [P0, P1, P2, P3] = screenFacePoints as {
                x: number;
                y: number;
                scale: number;
              }[];
              const numHatchLines = 5;
              for (let i = 1; i <= numHatchLines; i++) {
                const t = i / (numHatchLines + 1);
                const pA = {
                  x: P0.x + (P3.x - P0.x) * t,
                  y: P0.y + (P3.y - P0.y) * t,
                };
                const pB = {
                  x: P1.x + (P2.x - P1.x) * t,
                  y: P1.y + (P2.y - P1.y) * t,
                };
                if (
                  isFinite(pA.x) &&
                  isFinite(pA.y) &&
                  isFinite(pB.x) &&
                  isFinite(pB.y)
                ) {
                  currentCtx.beginPath();
                  currentCtx.moveTo(pA.x, pA.y);
                  currentCtx.lineTo(pB.x, pB.y);
                  currentCtx.stroke();
                }
                const pC = {
                  x: P0.x + (P1.x - P0.x) * t,
                  y: P0.y + (P1.y - P0.y) * t,
                };
                const pD = {
                  x: P3.x + (P2.x - P3.x) * t,
                  y: P3.y + (P2.y - P3.y) * t,
                };
                if (
                  isFinite(pC.x) &&
                  isFinite(pC.y) &&
                  isFinite(pD.x) &&
                  isFinite(pD.y)
                ) {
                  currentCtx.beginPath();
                  currentCtx.moveTo(pC.x, pC.y);
                  currentCtx.lineTo(pD.x, pD.y);
                  currentCtx.stroke();
                }
              }
            }
          });
        } else {
          this.faceParticles.forEach((fp) =>
            fp.draw(currentCtx, canvasWidth, canvasHeight)
          );
          this.debrisParticles.forEach((dp) =>
            dp.draw(currentCtx, canvasWidth, canvasHeight)
          );
        }
      }
    }

    function initScene(canvasWidth: number, canvasHeight: number) {
      rainStreams = [];
      const streamCount = Math.floor(
        canvasWidth / (rainFontSize * (isTouchDevice ? 2.5 : 2))
      );
      for (let i = 0; i < streamCount; i++) {
        rainStreams.push(
          new MatrixRainStream(
            i * (canvasWidth / streamCount) +
              Math.random() * (canvasWidth / streamCount / 2),
            canvasHeight
          )
        );
      }

      cubes = [];
      const currentNumberOfCubes = isTouchDevice
        ? Math.floor(canvasWidth / 40 + canvasHeight / 60)
        : Math.floor(canvasWidth / 50 + canvasHeight / 70);
      const currentCubeMinSize = isTouchDevice ? 25 : 35;
      const currentCubeMaxSize = isTouchDevice ? 50 : 65;

      for (let i = 0; i < currentNumberOfCubes; i++) {
        const size =
          Math.random() * (currentCubeMaxSize - currentCubeMinSize) +
          currentCubeMinSize;
        const x = (Math.random() - 0.5) * canvasWidth * 1.2;
        const y = -canvasHeight / 2 - size - Math.random() * canvasHeight * 0.8;
        const z = Math.random() * (FL / 2.0) - FL / 4;
        cubes.push(new Cube(x, y, z, size));
      }
      frameCount = 0;
    }

    function animateScene() {
      const currentCanvas = canvasRef.current;
      if (!currentCanvas || !ctx) {
        animationFrameId.current = requestAnimationFrame(animateScene);
        return;
      }

      frameCount++;
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, currentCanvas.width, currentCanvas.height);

      ctx.save();
      ctx.globalAlpha = 0.35;
      rainStreams.forEach((stream) => stream.draw(ctx));
      ctx.restore();

      cubes.forEach((cube) =>
        cube.update(
          currentCanvas.width,
          currentCanvas.height,
          mouseRef.current,
          isTouchDevice
        )
      );

      for (let i = 0; i < cubes.length; i++) {
        const cube1 = cubes[i];
        if (cube1.isShattered) continue;
        const aabb1 = cube1.getAABB();
        if (!aabb1) continue;
        for (let j = i + 1; j < cubes.length; j++) {
          const cube2 = cubes[j];
          if (cube2.isShattered) continue;
          const aabb2 = cube2.getAABB();
          if (!aabb2) continue;
          const overlapX = aabb1.maxX >= aabb2.minX && aabb1.minX <= aabb2.maxX;
          const overlapY = aabb1.maxY >= aabb2.minY && aabb1.minY <= aabb2.maxY;
          const overlapZ = aabb1.maxZ >= aabb2.minZ && aabb1.minZ <= aabb2.maxZ;
          if (overlapX && overlapY && overlapZ) {
            if (!cube1.isShattered)
              cube1.shatter(currentCanvas.width, currentCanvas.height);
            if (!cube2.isShattered)
              cube2.shatter(currentCanvas.width, currentCanvas.height);
          }
        }
      }

      cubes.sort((a, b) => {
        const zA =
          a.isShattered && a.faceParticles.length > 0
            ? a.faceParticles[0].pos.z
            : a.pos.z;
        const zB =
          b.isShattered && b.faceParticles.length > 0
            ? b.faceParticles[0].pos.z
            : b.pos.z;
        return zB - zA;
      });

      cubes.forEach((cube) =>
        cube.draw(ctx, currentCanvas.width, currentCanvas.height)
      );

      const blurZoneHeight = 450;
      const horizonLineY = currentCanvas.height - blurZoneHeight;
      ctx.save();
      const bottomFadeGradient = ctx.createLinearGradient(
        0,
        horizonLineY,
        0,
        currentCanvas.height
      );
      bottomFadeGradient.addColorStop(0, "rgba(0, 0, 0, 0.0)");
      bottomFadeGradient.addColorStop(0.4, "rgba(0, 0, 0, 0.75)");
      bottomFadeGradient.addColorStop(1, "rgba(0, 0, 0, 1.0)");
      ctx.fillStyle = bottomFadeGradient;
      ctx.fillRect(0, horizonLineY, currentCanvas.width, blurZoneHeight);
      ctx.restore();

      cubes = cubes.filter(
        (cube) =>
          !cube.isShattered ||
          cube.faceParticles.length > 0 ||
          cube.debrisParticles.length > 0
      );

      const targetNumberOfCubes = isTouchDevice
        ? Math.floor(currentCanvas.width / 60 + currentCanvas.height / 80)
        : Math.floor(currentCanvas.width / 70 + currentCanvas.height / 90);
      const currentCubeMinSize = isTouchDevice ? 25 : 35;
      const currentCubeMaxSize = isTouchDevice ? 50 : 65;

      while (
        cubes.length < targetNumberOfCubes &&
        currentCanvas.width > 0 &&
        currentCanvas.height > 0
      ) {
        const size =
          Math.random() * (currentCubeMaxSize - currentCubeMinSize) +
          currentCubeMinSize;
        const x = (Math.random() - 0.5) * currentCanvas.width * 1.2;
        const y = -currentCanvas.height / 2 - size - Math.random() * 150;
        const z = Math.random() * (FL / 2.0) - FL / 4;
        cubes.push(new Cube(x, y, z, size));
      }

      animationFrameId.current = requestAnimationFrame(animateScene);
    }

    const performResizeAndInit = () => {
      const currentCanvas = canvasRef.current;
      if (!currentCanvas || !ctx) {
        console.warn("Canvas or context not available for resize.");
        return;
      }

      const parent = currentCanvas.parentElement;
      const newWidth = window.innerWidth;

      let newHeight = parent ? parent.offsetHeight : window.innerHeight;

      if (parent && parent.offsetHeight <= 0) {
        console.warn(
          "Parent offsetHeight is 0 or less during resize. Consider CSS for parent. Falling back to window.innerHeight."
        );
        newHeight = window.innerHeight;
      }

      if (newWidth > 0 && newHeight > 0) {
        if (
          currentCanvas.width !== newWidth ||
          currentCanvas.height !== newHeight
        ) {
          currentCanvas.width = newWidth;
          currentCanvas.height = newHeight;
          console.log(
            "Canvas resized and scene re-initialized to:",
            newWidth,
            "x",
            newHeight
          );
          initScene(newWidth, newHeight);
        }
      } else {
        console.warn(
          "Skipping resize/initScene due to zero or negative dimension: W=" +
            newWidth +
            ", H=" +
            newHeight
        );
      }
    };

    let resizeTimeoutId: NodeJS.Timeout;
    const debouncedHandleResize = () => {
      clearTimeout(resizeTimeoutId);
      resizeTimeoutId = setTimeout(performResizeAndInit, 250);
    };

    performResizeAndInit();

    if (canvas.width > 0 && canvas.height > 0) {
      animateScene();
    } else {
      console.error(
        "Canvas has zero dimensions after initial setup. Animation not starting. Check parent element CSS."
      );
    }

    const updateInteractionPosition = (event: MouseEvent | TouchEvent) => {
      let clientX, clientY;
      if ("touches" in event && event.touches.length > 0) {
        clientX = event.touches[0].clientX;
        clientY = event.touches[0].clientY;
      } else if ("clientX" in event) {
        clientX = event.clientX;
        clientY = event.clientY;
      } else {
        mouseRef.current.x = undefined;
        mouseRef.current.y = undefined;
        return;
      }
      mouseRef.current = { ...mouseRef.current, x: clientX, y: clientY };
    };

    const handleMouseMove = (event: MouseEvent) => {
      updateInteractionPosition(event);
    };
    const handleTouchStart = (event: TouchEvent) => {
      updateInteractionPosition(event);
    };
    const handleTouchMove = (event: TouchEvent) => {
      updateInteractionPosition(event);
    };
    const handleTouchEnd = () => {};

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", debouncedHandleResize);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("touchcancel", handleTouchEnd, { passive: true });

    return () => {
      clearTimeout(resizeTimeoutId);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", debouncedHandleResize);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("touchcancel", handleTouchEnd);
      console.log("InteractiveCanvasBackground cleaned up.");
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="block absolute top-0 left-0 bottom-0 w-full z-0"
    ></canvas>
  );
}
