"use client";

import React, { useRef, useEffect, useCallback } from "react";

interface Point3DType {
  x: number;
  y: number;
  z: number;
}

class Point3D implements Point3DType {
  constructor(public x: number, public y: number, public z: number) {}
}

interface ProjectedPointType {
  x: number;
  y: number;
  scale: number;
}

const FL = 1500;

function project3D(
  x: number,
  y: number,
  z: number,
  canvasWidth: number,
  canvasHeight: number
): ProjectedPointType {
  const effectiveZ = z + FL * 0.8;
  if (effectiveZ <= 0) return { x: 0, y: 0, scale: -1 };

  const scale = FL / effectiveZ;
  const screenX = canvasWidth / 2 + x * scale;
  const screenY = canvasHeight / 2 + y * scale;
  return { x: screenX, y: screenY, scale: scale };
}

class Torus {
  pos: Point3D;
  lineColor: string;

  tiltAngleX_world: number;
  tiltAngleY_world: number;
  spinAngleZ_local: number;

  spinSpeedZ_local: number;

  worldVertices: Point3D[][];
  localVertices: Point3D[][];

  majorRadius: number;
  minorRadius: number;
  majorSegments: number;
  minorSegments: number;

  constructor(
    x: number,
    y: number,
    z: number,
    majorRadius: number,
    minorRadius: number,
    majorSegments: number,
    minorSegments: number
  ) {
    this.pos = new Point3D(x, y, z);
    this.majorRadius = majorRadius;
    this.minorRadius = minorRadius;
    this.majorSegments = majorSegments;
    this.minorSegments = minorSegments;

    this.lineColor = "rgba(100, 100, 100, 0.7)";
    this.tiltAngleX_world = 0;
    this.tiltAngleY_world = 0;
    this.spinAngleZ_local = 0;
    this.spinSpeedZ_local = 0.002;

    this.localVertices = [];
    this.worldVertices = [];
    this._generateVertices();
  }

  _generateVertices(): void {
    for (let i = 0; i <= this.majorSegments; i++) {
      this.localVertices[i] = [];
      const theta = (i / this.majorSegments) * 2 * Math.PI;

      for (let j = 0; j <= this.minorSegments; j++) {
        const phi = (j / this.minorSegments) * Math.PI;

        const x =
          (this.majorRadius + this.minorRadius * Math.cos(phi)) *
          Math.cos(theta);
        const y =
          (this.majorRadius + this.minorRadius * Math.cos(phi)) *
          Math.sin(theta);
        const z = -this.minorRadius * Math.sin(phi);

        this.localVertices[i][j] = new Point3D(x, y, z);
      }
    }
  }

  _rotateVertex(
    vertex: Point3D,
    spinZ_local: number,
    tiltX_world: number,
    tiltY_world: number
  ): Point3D {
    let { x, y, z } = vertex;
    let tempX, tempY, tempZ;

    tempX = x;
    tempY = y;
    x = tempX * Math.cos(spinZ_local) - tempY * Math.sin(spinZ_local);
    y = tempX * Math.sin(spinZ_local) + tempY * Math.cos(spinZ_local);

    tempY = y;
    tempZ = z;
    y = tempY * Math.cos(tiltX_world) - tempZ * Math.sin(tiltX_world);
    z = tempY * Math.sin(tiltX_world) + tempZ * Math.cos(tiltX_world);

    tempX = x;
    tempZ = z;
    x = tempX * Math.cos(tiltY_world) + tempZ * Math.sin(tiltY_world);
    z = -tempX * Math.sin(tiltY_world) + tempZ * Math.cos(tiltY_world);

    return new Point3D(x, y, z);
  }

  update(): void {
    this.spinAngleZ_local += this.spinSpeedZ_local;

    this.worldVertices = this.localVertices.map((ring) =>
      ring.map((v) => {
        const rotated = this._rotateVertex(
          v,
          this.spinAngleZ_local,
          this.tiltAngleX_world,
          this.tiltAngleY_world
        );
        return new Point3D(
          rotated.x + this.pos.x,
          rotated.y + this.pos.y,
          rotated.z + this.pos.z
        );
      })
    );
  }

  draw(
    currentCtx: CanvasRenderingContext2D,
    canvasWidth: number,
    canvasHeight: number
  ): void {
    if (this.worldVertices.length === 0) return;

    currentCtx.strokeStyle = this.lineColor;
    currentCtx.lineWidth = 0.6;

    const projectedWorldVertices: (ProjectedPointType | null)[][] =
      this.worldVertices.map((ring) =>
        ring.map((v) => project3D(v.x, v.y, v.z, canvasWidth, canvasHeight))
      );

    for (let i = 0; i < this.majorSegments; i++) {
      for (let j = 0; j < this.minorSegments; j++) {
        const p1 = projectedWorldVertices[i][j];
        const p2 = projectedWorldVertices[i + 1][j];
        const p3 = projectedWorldVertices[i][j + 1];

        if (p1 && p1.scale > 0 && p2 && p2.scale > 0) {
          currentCtx.beginPath();
          currentCtx.moveTo(p1.x, p1.y);
          currentCtx.lineTo(p2.x, p2.y);
          currentCtx.stroke();
        }
        if (p1 && p1.scale > 0 && p3 && p3.scale > 0) {
          currentCtx.beginPath();
          currentCtx.moveTo(p1.x, p1.y);
          currentCtx.lineTo(p3.x, p3.y);
          currentCtx.stroke();
        }
      }
    }
  }
}

const RotatingBackgroundTorus: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);
  const torusRef = useRef<Torus | null>(null);

  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;

    const overallVisualSizeFactor = Math.min(width, height) * 0.4;
    const minorRadiusToOverallRatio = 0.55;

    const actualMinorRadius =
      overallVisualSizeFactor * minorRadiusToOverallRatio;
    const actualMajorRadius =
      overallVisualSizeFactor * (1.6 - minorRadiusToOverallRatio);

    const majorSegments = 25;
    const minorSegments = 12;

    const torusX = -actualMajorRadius * -0.5 - actualMinorRadius;
    const torusY = height * 0.001;
    const torusZ = FL * 0.75;

    const localTorus = new Torus(
      torusX,
      torusY,
      torusZ,
      actualMajorRadius,
      actualMinorRadius,
      majorSegments,
      minorSegments
    );

    localTorus.tiltAngleX_world = Math.PI / 0.9;
    localTorus.tiltAngleY_world = -Math.PI / 0.1;
    localTorus.spinAngleZ_local = Math.PI / 3;

    torusRef.current = localTorus;
  }, []);

  useEffect(() => {
    setupCanvas();

    const animate = () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      const currentTorus = torusRef.current;

      if (canvas && ctx && currentTorus) {
        const rect = canvas.getBoundingClientRect();
        ctx.clearRect(0, 0, rect.width, rect.height);
        currentTorus.update();
        currentTorus.draw(ctx, rect.width, rect.height);
      }
      animationFrameIdRef.current = requestAnimationFrame(animate);
    };

    animationFrameIdRef.current = requestAnimationFrame(animate);

    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas && canvas.parentElement) {
        requestAnimationFrame(() => {
          setupCanvas();
        });
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [setupCanvas]);

  return (
    <canvas
      ref={canvasRef}
      className="md:w-[1000px] md:h-[1000px] w-[600px] h-[600px] absolute left-0 translate-y-[500px] md:-translate-x-[500px] -translate-x-[350px]"
    />
  );
};

export default RotatingBackgroundTorus;
