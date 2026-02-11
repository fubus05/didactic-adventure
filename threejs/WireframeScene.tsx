"use client";

import React from "react";

import * as THREE from "three";

interface CombinedWireframeSceneProps {
  type: "upper" | "lower";
}

const getStyles = (type: "upper" | "lower"): string => `

 .wrapper {

 display: flex;

 flex-direction: column;

 align-items: center;

 justify-content: center; /* Центрируем содержимое по вертикали */

 width: 100%;

 height: 100vh;

 background-color: ${
   type === "upper" ? "#000000" : "transparent"
 }; /* Dynamic background */

color: white;

 font-family: sans-serif;

padding: 20px;

 box-sizing: border-box;

 }



 .controls {

 padding: 15px 20px;

 background-color: rgba(50, 50, 50, 0.6); /* Полупрозрачный фон для контролов */
 border-radius: 8px;
 margin-bottom: 20px;
 display: flex;
 flex-direction: column; /* Элементы управления друг под другом */
 align-items: center;
 gap: 10px;
 min-width: 280px; /* Минимальная ширина для панели управления */

}



.controls label {

 display: flex;

 align-items: center;

 gap: 8px;

 font-size: 0.9rem;

 }



.controls input[type="range"] {

 cursor: pointer;

 width: 150px; /* Ширина слайдера */

 }



.scene-wrapper {

 width: 100%;

 height: 70%; /* Увеличим высоту для лучшего обзора */
 max-width: 800px; /* Максимальная ширина сцены */
 max-height: 600px; /* Максимальная высота сцены */

 border-radius: 8px;

overflow: hidden;
 background-color: ${
   type === "upper" ? "#111" : "transparent"
 }; /* Dynamic background */

 border: 1px solid #333; /* Тонкая рамка вокруг сцены */

 }



@media (max-width: 600px) {

.scene-wrapper {

height: 60%;

 }

.controls {

 min-width: 90%;

}

}

`;

const CombinedWireframeScene: React.FC<CombinedWireframeSceneProps> = ({
  type,
}) => {
  const [speedFactor, setSpeedFactor] = React.useState(0.8);

  const [tiltAngle, setTiltAngle] = React.useState(0.7);

  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const sceneRef = React.useRef<THREE.Scene | null>(null);

  const cameraRef = React.useRef<THREE.PerspectiveCamera | null>(null);

  const cubeRef = React.useRef<THREE.Mesh | null>(null);

  const animationFrameRef = React.useRef<number>(0);

  const rendererRef = React.useRef<THREE.WebGLRenderer | null>(null);

  React.useEffect(() => {
    const styles = getStyles(type);

    const styleElement = document.createElement("style");

    styleElement.innerHTML = styles;

    document.head.appendChild(styleElement);

    const scene = new THREE.Scene();

    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(50, 800 / 600, 0.1, 1000); // Common camera setup

    camera.position.z = 5.5;

    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current!,

      antialias: true,
    });

    renderer.setSize(1000, 750);

    if (type === "upper") {
      renderer.setClearColor(0x000000, 0);
    } else {
      renderer.setClearColor(0x000000, 0);
    }

    rendererRef.current = renderer;

    let geometry: THREE.BoxGeometry;

    let cube: THREE.Mesh;

    const material = new THREE.MeshBasicMaterial({
      color: "#5C5C5C",

      wireframe: true,

      transparent: true,

      opacity: 0.25,
    });

    if (type === "upper") {
      const isMobile = window.innerWidth <= 600;

      if (isMobile) {
        geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5, 6, 6, 6);

        cube = new THREE.Mesh(geometry, material);

        cube.position.set(3.5, 1, 0);
      } else {
        geometry = new THREE.BoxGeometry(2.5, 2.5, 2.5, 8, 8, 8);

        cube = new THREE.Mesh(geometry, material);

        cube.position.set(3, 0.7, 0);
      }
    } else {
      const isMobile = window.innerWidth <= 600;

      if (isMobile) {
        geometry = new THREE.BoxGeometry(0.4, 0.4, 0.4, 6, 6, 6);

        cube = new THREE.Mesh(geometry, material);

        cube.position.set(-0.8, -2, 0);
      } else {
        geometry = new THREE.BoxGeometry(1.2, 1.2, 1.2, 8, 8, 8);

        cube = new THREE.Mesh(geometry, material);

        cube.position.set(-1.6, 1.3, 0);
      }
    }

    cube.rotation.x = tiltAngle;

    cubeRef.current = cube;

    scene.add(cube);

    const animate = () => {
      if (cubeRef.current) {
        cubeRef.current.rotation.y += 0.003 * speedFactor;
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameRef.current);

      document.head.removeChild(styleElement);

      if (rendererRef.current) {
        rendererRef.current.dispose();
      }

      if (geometry) {
        geometry.dispose();
      }

      if (material) {
        material.dispose();
      }

      sceneRef.current = null;

      cameraRef.current = null;

      cubeRef.current = null;

      rendererRef.current = null;
    };
  }, [type, speedFactor, tiltAngle]);

  return (
    <canvas
      ref={canvasRef}
      className={`${
        type === "upper" ? "right-0" : "left-0"
      } w-full h-full absolute top-0`}
    />
  );
};

export default CombinedWireframeScene;
