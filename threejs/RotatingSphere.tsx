"use client";

import React from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Text } from "troika-three-text";

const RotatingSphere = () => {
  const mountRef = React.useRef<HTMLDivElement>(null);
  const rendererRef = React.useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = React.useRef<OrbitControls | null>(null);
  const animationFrameIdRef = React.useRef<number | null>(null);
  const clockRef = React.useRef(new THREE.Clock());

  const [isMobile, setIsMobile] = React.useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(max-width: 767px)").matches;
    }
    return false;
  });

  React.useEffect(() => {
    if (!mountRef.current || mountRef.current.clientWidth === 0) {
      console.warn(
        "Mount ref not ready or has no dimensions, Three.js init deferred."
      );
      return;
    }

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let sphereGroup: THREE.Group; // For sphere and its direct background
    let textGroup: THREE.Group; // For text and its small oval, to be static

    let particleSystem: THREE.Points | null = null;
    let particleGeometry: THREE.BufferGeometry | null = null;
    let particleMaterial: THREE.PointsMaterial | null = null;
    let particlePositions: Float32Array | null = null;
    let particleVelocities: Float32Array | null = null;
    const lastSphereRotation = new THREE.Euler();

    const particleCount = isMobile ? 400 : 700;
    const particleColor = 0xffffff;
    const particleSize = isMobile ? 0.02 : 0.015;
    const particleOpacity = 0.35;
    const particleGravity = 0.05;
    const particleKickFactor = 0.15;
    const particlePuffStrength = 0.03;
    const initialSpeedRandomComponent = 0.1;
    const initialSpeedOutwardComponent = 0.02;
    const resetSpeedRandomComponent = 0.08;
    const resetSpeedOutwardComponent = 0.01;
    const resetInitialUpwardBias = 0.03;
    const particleInteractionRadiusFactor = 1.15;
    const particleResetDistanceFactor = 3;
    const particleResetHeightFactor = -1.5;

    const wenodeText: string = "WENODE";
    const featuresText: string = "FEATURES";
    const commonFontFamily: string = "/fonts/ChakraPetch-SemiBold.ttf";
    const wenodeColor: string = "#FFD200";
    const featuresColor: string = "#FFFFFF";
    const sphereRadius: number = 2.4;
    const textFontSize = 0.4;
    const contentOffsetY: number = 0.45 * 1.1; // Y offset for the text group from center
    const textContainerTiltX: number = -Math.PI / 15;
    const smallOvalColor: number = 0x000000;
    const smallOvalOpacity: number = 0.9;
    const smallOvalXRadius: number = 0.8 * 1.5;
    const smallOvalYRadius: number = 0.3 * 2;
    const textYOffset: number = 0.09 * 1.9; // Relative Y offset of WENODE/FEATURES text within their oval
    const largeBackgroundOvalColor: number = 0x000000;
    const largeBackgroundOvalOpacity: number = 1.0;
    const largeBackgroundOvalXRadius: number = 1.2 * 1.5;
    const largeBackgroundOvalYRadius: number = 1.2 * 1.5;
    const largeBackgroundOvalZ: number = -0.05 * 1.5; // Z for large oval relative to sphere center

    function init(): void {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(
        75,
        mountRef.current!.clientWidth / mountRef.current!.clientHeight,
        0.1,
        1000
      );
      camera.position.z = 5.5;

      const currentRenderer = new THREE.WebGLRenderer({
        antialias: !isMobile,
        alpha: true,
        powerPreference: isMobile ? "low-power" : "default",
      });

      const pixelRatio = isMobile
        ? Math.min(window.devicePixelRatio, 1.0)
        : window.devicePixelRatio;
      currentRenderer.setPixelRatio(pixelRatio);
      currentRenderer.setSize(
        mountRef.current!.clientWidth,
        mountRef.current!.clientHeight
      );
      currentRenderer.sortObjects = true;
      mountRef.current!.appendChild(currentRenderer.domElement);
      rendererRef.current = currentRenderer;

      // Group for elements that rotate with the sphere (wireframe, large bg oval)
      sphereGroup = new THREE.Group();
      scene.add(sphereGroup);
      lastSphereRotation.copy(sphereGroup.rotation);

      // Group for text elements (text, small bg oval) - will be added to scene directly
      textGroup = new THREE.Group();
      scene.add(textGroup); // Add textGroup directly to the scene

      // --- Elements for sphereGroup (rotatable) ---
      const largeOvalShape = new THREE.Shape();
      largeOvalShape.ellipse(
        0,
        0,
        largeBackgroundOvalXRadius,
        largeBackgroundOvalYRadius,
        0,
        2 * Math.PI,
        false,
        0
      );
      const largeOvalGeometry = new THREE.ShapeGeometry(largeOvalShape);
      const largeOvalMaterial = new THREE.MeshBasicMaterial({
        color: largeBackgroundOvalColor,
        transparent: largeBackgroundOvalOpacity < 1.0,
        opacity: largeBackgroundOvalOpacity,
        depthWrite: false,
      });
      const largeBackgroundOvalMesh = new THREE.Mesh(
        largeOvalGeometry,
        largeOvalMaterial
      );
      largeBackgroundOvalMesh.position.set(0, 0, largeBackgroundOvalZ);
      largeBackgroundOvalMesh.renderOrder = 0; // Within sphereGroup
      sphereGroup.add(largeBackgroundOvalMesh);

      const sphereSegments = isMobile ? 12 : 16;
      const sphereGeometry = new THREE.SphereGeometry(
        sphereRadius,
        sphereSegments,
        sphereSegments
      );
      const wireframeMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: isMobile ? 0.1 : 0.15,
      });
      const wireframeSphere = new THREE.Mesh(sphereGeometry, wireframeMaterial);
      wireframeSphere.renderOrder = 1; // Within sphereGroup, after its own bg oval
      sphereGroup.add(wireframeSphere);

      // --- Elements for textGroup (static relative to camera rotation point) ---
      textGroup.position.y = contentOffsetY; // Position the whole text group vertically

      // Calculate Z position to be on the "front" surface of where the sphere conceptually is
      const squaredRadius = sphereRadius * sphereRadius;
      const squaredOffsetY = contentOffsetY * contentOffsetY; // Y offset of the text group
      // This z calculation places the text group where the sphere's surface would be at that y-offset
      // We want it slightly in front of the sphere's absolute front.
      // If sphere is at (0,0,0) and radius 2.4, camera is at z=5.5
      // We want text to be at z ~ sphereRadius + a bit, e.g., 2.5 or 3
      // The original zOnSphereSurface could still be a good reference.
      const zOnSphereSurface: number = Math.sqrt(
        Math.max(0, squaredRadius - squaredOffsetY)
      );
      textGroup.position.z = zOnSphereSurface + 0.1; // Bring it slightly more forward than the sphere's curve at that height

      textGroup.rotation.x = textContainerTiltX;
      textGroup.renderOrder = 10; // High render order to ensure it's on top of sphere and particles

      const smallOvalLocalZ: number = 0.005; // Z within textGroup
      const textLocalZ: number = 0.01; // Z within textGroup

      const smallOvalShape = new THREE.Shape();
      smallOvalShape.ellipse(
        0,
        0,
        smallOvalXRadius,
        smallOvalYRadius,
        0,
        2 * Math.PI,
        false,
        0
      );
      const smallOvalGeometry = new THREE.ShapeGeometry(smallOvalShape);
      const smallOvalMaterial = new THREE.MeshBasicMaterial({
        color: smallOvalColor,
        transparent: true,
        opacity: smallOvalOpacity,
        depthWrite: false, // Important for transparency layering
      });
      const smallOvalBackground = new THREE.Mesh(
        smallOvalGeometry,
        smallOvalMaterial
      );
      smallOvalBackground.position.z = smallOvalLocalZ;
      smallOvalBackground.renderOrder = 0; // Within textGroup
      textGroup.add(smallOvalBackground);

      const textWenode = new Text();
      textWenode.text = wenodeText;
      textWenode.font = commonFontFamily;
      textWenode.fontSize = textFontSize;
      textWenode.color = wenodeColor;
      textWenode.anchorX = "center";
      textWenode.anchorY = "middle";
      textWenode.position.set(0, textYOffset, textLocalZ);
      textWenode.renderOrder = 1; // Within textGroup, after small oval
      textGroup.add(textWenode);

      const textFeatures = new Text();
      textFeatures.text = featuresText;
      textFeatures.font = commonFontFamily;
      textFeatures.fontSize = textFontSize;
      textFeatures.color = featuresColor;
      textFeatures.anchorX = "center";
      textFeatures.anchorY = "middle";
      textFeatures.position.set(0, -textYOffset, textLocalZ);
      textFeatures.renderOrder = 1; // Within textGroup, after small oval
      textGroup.add(textFeatures);

      const syncTexts = () => {
        if (!rendererRef.current || !scene || !camera) return;
        if (textWenode.parent) {
          // Check if still part of a group/scene
          textWenode.sync(() => {
            if (rendererRef.current && scene && camera)
              rendererRef.current.render(scene, camera);
          });
        }
        if (textFeatures.parent) {
          // Check if still part of a group/scene
          textFeatures.sync(() => {
            if (rendererRef.current && scene && camera)
              rendererRef.current.render(scene, camera);
          });
        }
      };

      if (typeof document !== "undefined" && document.fonts) {
        document.fonts.ready.then(() => syncTexts()).catch(() => syncTexts());
      } else {
        setTimeout(syncTexts, 250);
      }

      initParticles();

      const currentControls = new OrbitControls(
        camera,
        currentRenderer.domElement
      );
      currentControls.enableDamping = true;
      currentControls.dampingFactor = 0.05;
      currentControls.autoRotate = false; // Sphere group handles its own auto-rotation
      currentControls.enableZoom = false;
      currentControls.enablePan = false;
      // OrbitControls will rotate the camera AROUND the target (default 0,0,0).
      // This will make the sphereGroup (at 0,0,0) appear to rotate.
      // The textGroup is also positioned relative to 0,0,0 but is not a child of sphereGroup,
      // so it will maintain its position relative to the camera's focal point.
      controlsRef.current = currentControls;
    }

    console.log(
      "Mount Ref Dimensions:",
      mountRef.current?.clientWidth,
      mountRef.current?.clientHeight
    );

    function initParticles(): void {
      particleGeometry = new THREE.BufferGeometry();
      particlePositions = new Float32Array(particleCount * 3);
      particleVelocities = new Float32Array(particleCount * 3);
      const initialSpreadFactor = 1.3;

      const sphereInitialWorldPosition = new THREE.Vector3();
      sphereGroup.getWorldPosition(sphereInitialWorldPosition);

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const R =
          sphereRadius * (1 + Math.random() * (initialSpreadFactor - 1));
        const localPosOnSphere = new THREE.Vector3().setFromSphericalCoords(
          R,
          Math.acos(1 - 2 * Math.random()),
          Math.random() * 2 * Math.PI
        );
        const worldPos = localPosOnSphere
          .clone()
          .add(sphereInitialWorldPosition);

        particlePositions[i3] = worldPos.x;
        particlePositions[i3 + 1] = worldPos.y;
        particlePositions[i3 + 2] = worldPos.z;

        const outwardDir = localPosOnSphere.normalize();
        particleVelocities[i3] =
          outwardDir.x * initialSpeedOutwardComponent +
          (Math.random() - 0.5) * initialSpeedRandomComponent;
        particleVelocities[i3 + 1] =
          outwardDir.y * initialSpeedOutwardComponent +
          (Math.random() - 0.5) * initialSpeedRandomComponent;
        particleVelocities[i3 + 2] =
          outwardDir.z * initialSpeedOutwardComponent +
          (Math.random() - 0.5) * initialSpeedRandomComponent;
      }

      particleGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(particlePositions, 3)
      );
      particleMaterial = new THREE.PointsMaterial({
        color: particleColor,
        size: particleSize,
        transparent: true,
        opacity: particleOpacity,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      particleSystem = new THREE.Points(particleGeometry, particleMaterial);
      particleSystem.renderOrder = 5;
      scene.add(particleSystem);
    }

    function animateParticles(deltaTime: number): void {
      if (
        !particleSystem ||
        !particleGeometry ||
        !particlePositions ||
        !particleVelocities ||
        !sphereGroup
      )
        return;

      const positions = particleGeometry.attributes.position
        .array as Float32Array;
      const currentSphereRotation = sphereGroup.rotation.clone();
      const deltaRotationEuler = new THREE.Euler(
        currentSphereRotation.x - lastSphereRotation.x,
        currentSphereRotation.y - lastSphereRotation.y,
        currentSphereRotation.z - lastSphereRotation.z
      );
      lastSphereRotation.copy(currentSphereRotation);

      const interactionRadius = sphereRadius * particleInteractionRadiusFactor;
      const interactionRadiusSq = interactionRadius * interactionRadius;

      const sphereWorldPosition = new THREE.Vector3();
      sphereGroup.getWorldPosition(sphereWorldPosition);

      const resetPlaneY =
        sphereWorldPosition.y + sphereRadius * particleResetHeightFactor;
      const maxDist = sphereRadius * particleResetDistanceFactor;
      const maxDistSq = maxDist * maxDist;

      const angularVelocityApprox = new THREE.Vector3(
        deltaRotationEuler.x / Math.max(deltaTime, 0.0001),
        deltaRotationEuler.y / Math.max(deltaTime, 0.0001),
        deltaRotationEuler.z / Math.max(deltaTime, 0.0001)
      );

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        particleVelocities[i3 + 1] -= particleGravity * deltaTime;
        positions[i3] += particleVelocities[i3] * deltaTime;
        positions[i3 + 1] += particleVelocities[i3 + 1] * deltaTime;
        positions[i3 + 2] += particleVelocities[i3 + 2] * deltaTime;

        const particleWorldPos = new THREE.Vector3(
          positions[i3],
          positions[i3 + 1],
          positions[i3 + 2]
        );
        const relativePosToSphereCenter = particleWorldPos
          .clone()
          .sub(sphereWorldPosition);

        if (relativePosToSphereCenter.lengthSq() < interactionRadiusSq) {
          const velocityKick = new THREE.Vector3().crossVectors(
            angularVelocityApprox,
            relativePosToSphereCenter
          );
          velocityKick.multiplyScalar(particleKickFactor);
          particleVelocities[i3] += velocityKick.x;
          particleVelocities[i3 + 1] += velocityKick.y;
          particleVelocities[i3 + 2] += velocityKick.z;

          const outwardPuffVelocity = relativePosToSphereCenter
            .clone()
            .normalize()
            .multiplyScalar(particlePuffStrength * Math.random());
          particleVelocities[i3] += outwardPuffVelocity.x;
          particleVelocities[i3 + 1] += outwardPuffVelocity.y;
          particleVelocities[i3 + 2] += outwardPuffVelocity.z;
        }

        if (
          particleWorldPos.y < sphereWorldPosition.y + resetPlaneY ||
          relativePosToSphereCenter.lengthSq() > maxDistSq
        ) {
          const R_reset = sphereRadius * (1 + Math.random() * 0.1);
          const newRelPosLocalToSphere =
            new THREE.Vector3().setFromSphericalCoords(
              R_reset,
              Math.acos(1 - 2 * Math.random()),
              Math.random() * 2 * Math.PI
            );

          const newWorldPos = newRelPosLocalToSphere
            .clone()
            .applyEuler(sphereGroup.rotation)
            .add(sphereWorldPosition);

          positions[i3] = newWorldPos.x;
          positions[i3 + 1] = newWorldPos.y;
          positions[i3 + 2] = newWorldPos.z;

          const outwardDirWorld = newRelPosLocalToSphere
            .clone()
            .applyEuler(sphereGroup.rotation)
            .normalize();
          particleVelocities[i3] =
            outwardDirWorld.x * resetSpeedOutwardComponent +
            (Math.random() - 0.5) * resetSpeedRandomComponent;
          particleVelocities[i3 + 1] =
            outwardDirWorld.y * resetSpeedOutwardComponent +
            Math.random() * resetSpeedRandomComponent * 0.5 +
            resetInitialUpwardBias;
          particleVelocities[i3 + 2] =
            outwardDirWorld.z * resetSpeedOutwardComponent +
            (Math.random() - 0.5) * resetSpeedRandomComponent;
        }
      }
      particleGeometry.attributes.position.needsUpdate = true;
    }

    function animate(): void {
      animationFrameIdRef.current = requestAnimationFrame(animate);
      const deltaTime = clockRef.current.getDelta();

      if (sphereGroup) {
        sphereGroup.rotation.y += 0.2 * deltaTime;
      }

      if (controlsRef.current) controlsRef.current.update();

      if (particleCount > 0) {
        animateParticles(deltaTime);
      }

      if (rendererRef.current && scene && camera) {
        rendererRef.current.render(scene, camera);
      }
    }

    init();
    animate();

    return () => {
      console.log("Cleaning up Three.js scene...");
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
        animationFrameIdRef.current = null;
      }
      if (controlsRef.current) {
        controlsRef.current.dispose();
        controlsRef.current = null;
      }

      if (particleSystem && scene) scene.remove(particleSystem);
      if (particleGeometry) particleGeometry.dispose();
      if (particleMaterial) particleMaterial.dispose();
      particlePositions = null;
      particleVelocities = null;

      if (textGroup && scene) {
        scene.remove(textGroup);
        textGroup.traverse((object: any) => {
          if (object.isTroikaText) {
            (object as Text).dispose();
          }

          if (object.isMesh) {
            if (object.geometry) object.geometry.dispose();
            if (Array.isArray(object.material)) {
              object.material.forEach((material: THREE.Material) =>
                material.dispose()
              );
            } else if (object.material) {
              (object.material as THREE.Material).dispose();
            }
          }
        });
      }

      if (scene) {
        scene.traverse((object: any) => {
          if (object.isMesh || object.isSprite || object.isPoints) {
            if (object.geometry) object.geometry.dispose();
            if (Array.isArray(object.material)) {
              object.material.forEach((material: THREE.Material) =>
                material.dispose()
              );
            } else if (object.material) {
              (object.material as THREE.Material).dispose();
            }
          }

          if (
            object.isTroikaText &&
            !(textGroup && object.parent === textGroup)
          ) {
            (object as Text).dispose();
          }
          if (
            (object as any).texture &&
            typeof (object as any).texture.dispose === "function"
          ) {
            (object as any).texture.dispose();
          }
        });
        while (scene.children.length > 0) {
          const child = scene.children[0];
          scene.remove(child);
        }
      }

      if (rendererRef.current) {
        rendererRef.current.dispose();
        if (
          mountRef.current &&
          rendererRef.current.domElement &&
          mountRef.current.contains(rendererRef.current.domElement)
        ) {
          mountRef.current.removeChild(rendererRef.current.domElement);
        }
        rendererRef.current = null;
      }
      console.log("Three.js scene cleanup complete.");
    };
  }, [isMobile]);

  const containerStyle: React.CSSProperties = {
    width: "100%",
    height: isMobile ? "400px" : "500px",
    overflow: "hidden",
    backgroundColor: "black",
    fontFamily: '"ChakraPetch", sans-serif',
  };

  const mountDivStyle: React.CSSProperties = {
    width: "100%",
    height: isMobile ? "400px" : "500px",
    margin: "0 auto",
  };

  return <div ref={mountRef} style={{ ...containerStyle, ...mountDivStyle }} />;
};

export default RotatingSphere;
