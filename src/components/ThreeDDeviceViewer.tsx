import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, ZoomIn, ZoomOut, Maximize2, X, Sparkles, Layers } from 'lucide-react';

export type DeviceModelType =
  | 'cell'
  | 'battery'
  | 'plug_key_open'
  | 'plug_key_closed'
  | 'wire_joint'
  | 'wire_crossing'
  | 'bulb'
  | 'resistor'
  | 'rheostat'
  | 'ammeter'
  | 'voltmeter'
  | 'fuse'
  | 'switch';

interface ThreeDDeviceViewerProps {
  type: DeviceModelType;
  className?: string;
  autoRotate?: boolean;
  interactive?: boolean;
  height?: number;
  width?: number;
}

export const createDeviceScene = (type: DeviceModelType): THREE.Group => {
  const group = new THREE.Group();

  switch (type) {
    case 'bulb': {
      // 1. REAL CANDLE BULB (TORCH / CANDLE-FLAME MINIATURE LAB BULB)
      // Candle-shaped flame silhouette Lathe Geometry
      const points: THREE.Vector2[] = [
        new THREE.Vector2(0, -0.65),
        new THREE.Vector2(0.55, -0.6),
        new THREE.Vector2(0.68, -0.2),
        new THREE.Vector2(1.05, 0.3),
        new THREE.Vector2(1.25, 0.8),
        new THREE.Vector2(1.2, 1.4),
        new THREE.Vector2(0.95, 2.0),
        new THREE.Vector2(0.55, 2.5),
        new THREE.Vector2(0.18, 2.9),
        new THREE.Vector2(0.04, 3.05),
        new THREE.Vector2(0, 3.1),
      ];
      const glassGeo = new THREE.LatheGeometry(points, 32);
      const glassMat = new THREE.MeshPhysicalMaterial({
        color: 0xfff3b0,
        transparent: true,
        opacity: 0.45,
        roughness: 0.08,
        metalness: 0.05,
        transmission: 0.75,
        clearcoat: 1.0,
      });
      const glassMesh = new THREE.Mesh(glassGeo, glassMat);
      glassMesh.position.y = -0.3;
      group.add(glassMesh);

      // Edison Brass Screw Base (Threads)
      const baseGeo = new THREE.CylinderGeometry(0.72, 0.72, 1.2, 24);
      const brassMat = new THREE.MeshStandardMaterial({
        color: 0xd4af37,
        metalness: 0.9,
        roughness: 0.25,
      });
      const baseMesh = new THREE.Mesh(baseGeo, brassMat);
      baseMesh.position.y = -1.55;
      group.add(baseMesh);

      // Screw thread rings
      for (let i = 0; i < 4; i++) {
        const ringGeo = new THREE.TorusGeometry(0.75, 0.065, 12, 32);
        const ringMesh = new THREE.Mesh(ringGeo, brassMat);
        ringMesh.rotation.x = Math.PI / 2 + 0.08;
        ringMesh.position.y = -1.25 - i * 0.24;
        group.add(ringMesh);
      }

      // Black insulator ring & bottom solder contact
      const insGeo = new THREE.CylinderGeometry(0.6, 0.6, 0.18, 20);
      const insMat = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.8 });
      const insMesh = new THREE.Mesh(insGeo, insMat);
      insMesh.position.y = -2.2;
      group.add(insMesh);

      const solderGeo = new THREE.SphereGeometry(0.3, 16, 12);
      const solderMat = new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 0.95, roughness: 0.2 });
      const solderMesh = new THREE.Mesh(solderGeo, solderMat);
      solderMesh.position.y = -2.32;
      group.add(solderMesh);

      // Glass stem mount pillar
      const stemGeo = new THREE.CylinderGeometry(0.2, 0.28, 1.1, 16);
      const stemMat = new THREE.MeshStandardMaterial({ color: 0xa5f3fc, transparent: true, opacity: 0.55 });
      const stemMesh = new THREE.Mesh(stemGeo, stemMat);
      stemMesh.position.y = 0.0;
      group.add(stemMesh);

      // Tungsten support wire leads
      const wireMat = new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 0.85 });
      const leadLeft = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 1.3, 8), wireMat);
      leadLeft.position.set(-0.3, 0.9, 0);
      leadLeft.rotation.z = -0.12;
      group.add(leadLeft);

      const leadRight = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 1.3, 8), wireMat);
      leadRight.position.set(0.3, 0.9, 0);
      leadRight.rotation.z = 0.12;
      group.add(leadRight);

      // Glowing tungsten coiled loop (Candle filament)
      const filamentGeo = new THREE.TorusGeometry(0.38, 0.055, 12, 24, Math.PI);
      const filamentMat = new THREE.MeshStandardMaterial({
        color: 0xffb703,
        emissive: 0xfb8500,
        emissiveIntensity: 0.9,
        roughness: 0.2,
      });
      const filamentMesh = new THREE.Mesh(filamentGeo, filamentMat);
      filamentMesh.position.set(0, 1.55, 0);
      filamentMesh.rotation.z = Math.PI;
      group.add(filamentMesh);

      // Warm candle flame glow PointLight
      const bulbLight = new THREE.PointLight(0xffb703, 1.8, 8);
      bulbLight.position.set(0, 1.5, 0);
      group.add(bulbLight);
      break;
    }

    case 'fuse': {
      // 2. NORMAL FUSE: REAL REWIRABLE PORCELAIN KIT-KAT FUSE (Indian Household & Lab Cutout Fuse)
      // Glazed White Porcelain Base
      const porcelainMat = new THREE.MeshStandardMaterial({
        color: 0xf8fafc,
        roughness: 0.25,
        metalness: 0.05,
      });
      const baseGeo = new THREE.BoxGeometry(4.4, 0.7, 2.2);
      const baseMesh = new THREE.Mesh(baseGeo, porcelainMat);
      baseMesh.position.y = -1.1;
      group.add(baseMesh);

      // Screw fixing recesses in porcelain base
      const holeMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.9 });
      const hole1 = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 0.72, 16), holeMat);
      hole1.position.set(-1.8, -1.05, 0);
      group.add(hole1);

      const hole2 = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 0.72, 16), holeMat);
      hole2.position.set(1.8, -1.05, 0);
      group.add(hole2);

      // Brass Terminal Spring Contact Jaws on Base
      const brassMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.92, roughness: 0.2 });
      const jawLeft = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.7, 1.2), brassMat);
      jawLeft.position.set(-1.35, -0.4, 0);
      group.add(jawLeft);

      const jawRight = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.7, 1.2), brassMat);
      jawRight.position.set(1.35, -0.4, 0);
      group.add(jawRight);

      // Removable Porcelain Bridge Carrier (The "Kit-Kat" Handle)
      const carrierGeo = new THREE.BoxGeometry(3.6, 0.95, 1.7);
      const carrierMesh = new THREE.Mesh(carrierGeo, porcelainMat);
      carrierMesh.position.y = 0.35;
      group.add(carrierMesh);

      // Molded Finger Grip Ridge on Carrier Top
      const gripGeo = new THREE.BoxGeometry(1.8, 0.75, 1.3);
      const gripMesh = new THREE.Mesh(gripGeo, porcelainMat);
      gripMesh.position.y = 0.9;
      group.add(gripMesh);

      // Porcelain indent finger grips on sides
      const indentMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.4 });
      const indentFront = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.35, 0.15), indentMat);
      indentFront.position.set(0, 0.9, 0.7);
      group.add(indentFront);

      const indentBack = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.35, 0.15), indentMat);
      indentBack.position.set(0, 0.9, -0.7);
      group.add(indentBack);

      // Heavy Brass Contact Blades on Carrier (plugs into base)
      const bladeLeft = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.9, 0.9), brassMat);
      bladeLeft.position.set(-1.35, -0.2, 0);
      group.add(bladeLeft);

      const bladeRight = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.9, 0.9), brassMat);
      bladeRight.position.set(1.35, -0.2, 0);
      group.add(bladeRight);

      // Brass Wire Clamping Screws on Carrier Top
      const screwGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.45, 16);
      const termScrewLeft = new THREE.Mesh(screwGeo, brassMat);
      termScrewLeft.position.set(-1.25, 0.9, 0);
      group.add(termScrewLeft);

      const termScrewRight = new THREE.Mesh(screwGeo, brassMat);
      termScrewRight.position.set(1.25, 0.9, 0);
      group.add(termScrewRight);

      // REAL REWIRABLE FUSE WIRE (Lead-tin / copper alloy wire stretched across)
      const fuseWireMat = new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        emissive: 0xd97706,
        emissiveIntensity: 0.5,
        metalness: 0.9,
      });
      const rewirableFuseWire = new THREE.Mesh(
        new THREE.CylinderGeometry(0.045, 0.045, 2.5, 8),
        fuseWireMat
      );
      rewirableFuseWire.rotation.z = Math.PI / 2;
      rewirableFuseWire.position.set(0, 0.85, 0);
      group.add(rewirableFuseWire);
      break;
    }

    case 'rheostat': {
      // 3. REAL LAB RHEOSTAT (SLIDER VARIABLE RESISTOR)
      // Ceramic Coil Cylinder Core
      const coreGeo = new THREE.CylinderGeometry(0.92, 0.92, 4.4, 28);
      const coreMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.6, metalness: 0.2 });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      coreMesh.rotation.z = Math.PI / 2;
      coreMesh.position.y = 0;
      group.add(coreMesh);

      // Tightly wound Eureka / Constantan Wire Turns (Metallic grooved look)
      for (let i = -20; i <= 20; i++) {
        if (i % 2 === 0) {
          const wireRing = new THREE.Mesh(
            new THREE.TorusGeometry(0.94, 0.032, 8, 24),
            new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.85, roughness: 0.25 })
          );
          wireRing.rotation.y = Math.PI / 2;
          wireRing.position.x = i * 0.1;
          group.add(wireRing);
        }
      }

      // Cast-Iron Black A-Frame End Supports with Feet
      const legMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.8 });
      const leftLeg = new THREE.Mesh(new THREE.BoxGeometry(0.48, 2.5, 2.2), legMat);
      leftLeg.position.set(-2.4, -0.3, 0);
      group.add(leftLeg);

      const rightLeg = new THREE.Mesh(new THREE.BoxGeometry(0.48, 2.5, 2.2), legMat);
      rightLeg.position.set(2.4, -0.3, 0);
      group.add(rightLeg);

      // Top Polished Brass Slider Guide Rod
      const rodMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.92, roughness: 0.2 });
      const topRod = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 5.0, 16), rodMat);
      topRod.rotation.z = Math.PI / 2;
      topRod.position.y = 1.4;
      group.add(topRod);

      // Sliding Carriage Block
      const sliderMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.5 });
      const sliderBlock = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.75, 0.85), sliderMat);
      sliderBlock.position.set(0.3, 1.4, 0);
      group.add(sliderBlock);

      // Knurled Bakelite Slider Knob on Top
      const knobGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.45, 18);
      const knobMesh = new THREE.Mesh(knobGeo, sliderMat);
      knobMesh.position.set(0.3, 1.95, 0);
      group.add(knobMesh);

      // Phosphor-Bronze Spring Contact Wiper touching Eureka wire coil
      const wiperGeo = new THREE.BoxGeometry(0.25, 0.6, 0.35);
      const wiperMesh = new THREE.Mesh(wiperGeo, rodMat);
      wiperMesh.position.set(0.3, 0.95, 0);
      group.add(wiperMesh);

      // 3 Brass Binding Screw Terminals (2 bottom fixed, 1 upper slider)
      const termMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.92, roughness: 0.2 });
      const term1 = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.55, 12), termMat);
      term1.position.set(-2.4, 1.15, 0.65);
      group.add(term1);

      const term2 = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.55, 12), termMat);
      term2.position.set(2.4, 1.15, 0.65);
      group.add(term2);

      const termSlider = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.55, 12), termMat);
      termSlider.position.set(2.4, 1.6, -0.65);
      group.add(termSlider);
      break;
    }

    case 'switch': {
      // 4. REAL LAB PLUG KEY (LABORATORY SWITCH)
      // Polished Mahogany Wooden Base Block
      const woodMat = new THREE.MeshStandardMaterial({ color: 0x54260a, roughness: 0.55 });
      const baseMesh = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.65, 2.8), woodMat);
      baseMesh.position.y = -0.95;
      group.add(baseMesh);

      // Heavy Polished Brass Blocks (Left & Right) with air gap
      const brassMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.92, roughness: 0.22 });
      const leftBlock = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.85, 2.0), brassMat);
      leftBlock.position.set(-1.0, -0.2, 0);
      group.add(leftBlock);

      const rightBlock = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.85, 2.0), brassMat);
      rightBlock.position.set(1.0, -0.2, 0);
      group.add(rightBlock);

      // Conical Tapered Plug (Solid brass cone fitting into central hole)
      const plugPinMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.95, roughness: 0.15 });
      const plugPin = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.18, 1.1, 16), plugPinMat);
      plugPin.position.set(0, 0.2, 0);
      group.add(plugPin);

      // Fluted Ebonite Insulated Top Handle Knob
      const handleMat = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.35 });
      const handleMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.42, 1.3, 16), handleMat);
      handleMesh.position.set(0, 1.15, 0);
      group.add(handleMesh);

      // Knurled Side Terminal Clamping Screws
      const screwLeft = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.65, 12), brassMat);
      screwLeft.rotation.z = Math.PI / 2;
      screwLeft.position.set(-1.95, -0.2, 0);
      group.add(screwLeft);

      const screwRight = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.65, 12), brassMat);
      screwRight.rotation.z = Math.PI / 2;
      screwRight.position.set(1.95, -0.2, 0);
      group.add(screwRight);
      break;
    }

    case 'ammeter': {
      // 5. REAL LAB AMMETER (MOVING COIL BENCHTOP AMMETER)
      // Slanted Desktop Bakelite Casing (Classic physics laboratory console)
      const caseMat = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.65 });
      const caseMesh = new THREE.Mesh(new THREE.BoxGeometry(3.8, 3.2, 2.8), caseMat);
      caseMesh.rotation.x = -0.28;
      caseMesh.position.y = -0.2;
      group.add(caseMesh);

      // Beveled Circular Chrome/Bakelite Bezel
      const bezelMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8, roughness: 0.25 });
      const bezel = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.4, 0.22, 32), bezelMat);
      bezel.rotation.x = Math.PI / 2 - 0.28;
      bezel.position.set(0, 0.2, 1.25);
      group.add(bezel);

      // Calibrated White Dial Plate
      const dialMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 });
      const dialPlate = new THREE.Mesh(new THREE.CylinderGeometry(1.26, 1.26, 0.05, 32), dialMat);
      dialPlate.rotation.x = Math.PI / 2 - 0.28;
      dialPlate.position.set(0, 0.25, 1.32);
      group.add(dialPlate);

      // Anti-Parallax Mirrored Strip Arc
      const mirrorMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.95, roughness: 0.05 });
      const mirrorArc = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.15, 0.02), mirrorMat);
      mirrorArc.rotation.x = -0.28;
      mirrorArc.position.set(0, 0.45, 1.36);
      group.add(mirrorArc);

      // Knife-edge Red Pointer Needle
      const needleMat = new THREE.MeshStandardMaterial({ color: 0xdc2626, metalness: 0.6 });
      const needleMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 1.3, 8), needleMat);
      needleMesh.rotation.z = -0.32;
      needleMesh.rotation.x = Math.PI / 2 - 0.28;
      needleMesh.position.set(0.18, 0.38, 1.38);
      group.add(needleMesh);

      // Bold 'A' Letter on Dial
      const aLetterMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.4 });
      const aLetter = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.38, 0.05), aLetterMat);
      aLetter.rotation.x = -0.28;
      aLetter.position.set(0, -0.22, 1.4);
      group.add(aLetter);

      // Mechanical Zero-Adjust Slotted Screw
      const zeroAdjust = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.12, 16), bezelMat);
      zeroAdjust.rotation.x = Math.PI / 2 - 0.28;
      zeroAdjust.position.set(0, -0.65, 1.42);
      group.add(zeroAdjust);

      // Red (+) Knurled Binding Screw Post on Top Deck
      const redMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.35 });
      const redPost = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.26, 0.65, 16), redMat);
      redPost.position.set(-1.15, 1.4, -0.45);
      group.add(redPost);

      // Black (−) Knurled Binding Screw Post on Top Deck
      const blackMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.35 });
      const blackPost = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.26, 0.65, 16), blackMat);
      blackPost.position.set(1.15, 1.4, -0.45);
      group.add(blackPost);
      break;
    }

    case 'voltmeter': {
      // 6. REAL LAB VOLTMETER (MOVING COIL BENCHTOP VOLTMETER)
      // Slanted Desktop Housing
      const caseMat = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.65 });
      const caseMesh = new THREE.Mesh(new THREE.BoxGeometry(3.8, 3.2, 2.8), caseMat);
      caseMesh.rotation.x = -0.28;
      caseMesh.position.y = -0.2;
      group.add(caseMesh);

      // Bezel
      const bezelMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8, roughness: 0.25 });
      const bezel = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.4, 0.22, 32), bezelMat);
      bezel.rotation.x = Math.PI / 2 - 0.28;
      bezel.position.set(0, 0.2, 1.25);
      group.add(bezel);

      // White Dial Plate
      const dialMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 });
      const dialPlate = new THREE.Mesh(new THREE.CylinderGeometry(1.26, 1.26, 0.05, 32), dialMat);
      dialPlate.rotation.x = Math.PI / 2 - 0.28;
      dialPlate.position.set(0, 0.25, 1.32);
      group.add(dialPlate);

      // Anti-Parallax Mirrored Strip Arc
      const mirrorMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.95, roughness: 0.05 });
      const mirrorArc = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.15, 0.02), mirrorMat);
      mirrorArc.rotation.x = -0.28;
      mirrorArc.position.set(0, 0.45, 1.36);
      group.add(mirrorArc);

      // Red Indicator Pointer Needle
      const needleMat = new THREE.MeshStandardMaterial({ color: 0xdc2626, metalness: 0.6 });
      const needleMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 1.3, 8), needleMat);
      needleMesh.rotation.z = 0.28;
      needleMesh.rotation.x = Math.PI / 2 - 0.28;
      needleMesh.position.set(-0.15, 0.38, 1.38);
      group.add(needleMesh);

      // Bold 'V' Letter on Dial
      const vLetterMat = new THREE.MeshStandardMaterial({ color: 0x9333ea, metalness: 0.4 });
      const vLetter = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.38, 0.05), vLetterMat);
      vLetter.rotation.x = -0.28;
      vLetter.position.set(0, -0.22, 1.4);
      group.add(vLetter);

      // Mechanical Zero-Adjust Screw
      const zeroAdjust = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.12, 16), bezelMat);
      zeroAdjust.rotation.x = Math.PI / 2 - 0.28;
      zeroAdjust.position.set(0, -0.65, 1.42);
      group.add(zeroAdjust);

      // Red (+) Terminal Post
      const redMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.35 });
      const redPost = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.26, 0.65, 16), redMat);
      redPost.position.set(-1.15, 1.4, -0.45);
      group.add(redPost);

      // Black (−) Terminal Post
      const blackMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.35 });
      const blackPost = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.26, 0.65, 16), blackMat);
      blackPost.position.set(1.15, 1.4, -0.45);
      group.add(blackPost);
      break;
    }

    case 'cell': {
      // 7. DRY CELL BATTERY
      const cellGeo = new THREE.CylinderGeometry(1.0, 1.0, 3.0, 32);
      const jacketMat = new THREE.MeshStandardMaterial({ color: 0x1d4ed8, metalness: 0.4, roughness: 0.4 });
      const cellMesh = new THREE.Mesh(cellGeo, jacketMat);
      group.add(cellMesh);

      const bandGeo = new THREE.CylinderGeometry(1.01, 1.01, 0.9, 32);
      const goldMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.8, roughness: 0.3 });
      const bandMesh = new THREE.Mesh(bandGeo, goldMat);
      bandMesh.position.y = 0.2;
      group.add(bandMesh);

      const pipMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.95, roughness: 0.2 });
      const pipMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.4, 20), pipMat);
      pipMesh.position.y = 1.65;
      group.add(pipMesh);

      const basePlate = new THREE.Mesh(new THREE.CylinderGeometry(0.98, 0.98, 0.15, 24), pipMat);
      basePlate.position.y = -1.55;
      group.add(basePlate);
      break;
    }

    case 'resistor': {
      // 8. FIXED RESISTOR (4-BAND COLOR CODE)
      const bodyGeo = new THREE.CylinderGeometry(0.55, 0.55, 2.6, 24);
      const ceramicMat = new THREE.MeshStandardMaterial({ color: 0xe0d5b7, roughness: 0.4 });
      const bodyMesh = new THREE.Mesh(bodyGeo, ceramicMat);
      bodyMesh.rotation.z = Math.PI / 2;
      group.add(bodyMesh);

      const endMat = new THREE.MeshStandardMaterial({ color: 0xd1c29b, roughness: 0.4 });
      const leftEnd = new THREE.Mesh(new THREE.SphereGeometry(0.65, 16, 16), endMat);
      leftEnd.scale.set(0.5, 1, 1);
      leftEnd.position.set(-1.25, 0, 0);
      group.add(leftEnd);

      const rightEnd = new THREE.Mesh(new THREE.SphereGeometry(0.65, 16, 16), endMat);
      rightEnd.scale.set(0.5, 1, 1);
      rightEnd.position.set(1.25, 0, 0);
      group.add(rightEnd);

      const colors = [0x78350f, 0x0f172a, 0xdc2626, 0xf59e0b];
      const positions = [-0.7, -0.25, 0.2, 0.75];
      colors.forEach((col, idx) => {
        const bandMesh = new THREE.Mesh(
          new THREE.CylinderGeometry(0.58, 0.58, 0.2, 20),
          new THREE.MeshStandardMaterial({ color: col, roughness: 0.3, metalness: idx === 3 ? 0.8 : 0.1 })
        );
        bandMesh.rotation.z = Math.PI / 2;
        bandMesh.position.x = positions[idx];
        group.add(bandMesh);
      });

      const wireMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.95, roughness: 0.2 });
      const leftWire = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 1.8, 12), wireMat);
      leftWire.rotation.z = Math.PI / 2;
      leftWire.position.set(-2.2, 0, 0);
      group.add(leftWire);

      const rightWire = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 1.8, 12), wireMat);
      rightWire.rotation.z = Math.PI / 2;
      rightWire.position.x = 2.2;
      group.add(rightWire);
      break;
    }

    case 'battery': {
      // 9. LABORATORY 3-CELL BATTERY PACK IN SERIES (COMBINATION OF CELLS)
      // Acrylic / phenolic laboratory cell holder tray
      const trayGeo = new THREE.BoxGeometry(4.4, 0.45, 3.2);
      const trayMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.5 });
      const tray = new THREE.Mesh(trayGeo, trayMat);
      tray.position.y = -1.1;
      group.add(tray);

      // End walls of battery tray
      const wallMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.6 });
      const leftWall = new THREE.Mesh(new THREE.BoxGeometry(0.3, 1.8, 3.2), wallMat);
      leftWall.position.set(-2.05, -0.4, 0);
      group.add(leftWall);

      const rightWall = new THREE.Mesh(new THREE.BoxGeometry(0.3, 1.8, 3.2), wallMat);
      rightWall.position.set(2.05, -0.4, 0);
      group.add(rightWall);

      // 3 Cylindrical Dry Cells in series (alternating orientations)
      const cellJacketMat = new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.35 });
      const cellGoldMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.8, roughness: 0.25 });
      const metalMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.95, roughness: 0.15 });

      const cellZ = [-0.95, 0, 0.95];
      cellZ.forEach((zPos, idx) => {
        const cellGeo = new THREE.CylinderGeometry(0.42, 0.42, 3.4, 20);
        const cellMesh = new THREE.Mesh(cellGeo, cellJacketMat);
        cellMesh.rotation.z = Math.PI / 2;
        cellMesh.position.set(0, -0.4, zPos);
        group.add(cellMesh);

        // Gold center band
        const bandMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.425, 0.425, 1.2, 20), cellGoldMat);
        bandMesh.rotation.z = Math.PI / 2;
        bandMesh.position.set(0, -0.4, zPos);
        group.add(bandMesh);

        // Terminals
        const isReversed = idx % 2 === 1;
        const pipX = isReversed ? -1.75 : 1.75;
        const plateX = isReversed ? 1.72 : -1.72;

        const pip = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.2, 14), metalMat);
        pip.rotation.z = Math.PI / 2;
        pip.position.set(pipX, -0.4, zPos);
        group.add(pip);

        const plate = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.08, 16), metalMat);
        plate.rotation.z = Math.PI / 2;
        plate.position.set(plateX, -0.4, zPos);
        group.add(plate);
      });

      // Brass series connector straps bridging cell terminals
      const brassStrapMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.92, roughness: 0.2 });
      // Strap 1: connects cell 0 to cell 1 at X = 1.82
      const strap1 = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.25, 1.0), brassStrapMat);
      strap1.position.set(1.82, -0.4, -0.47);
      group.add(strap1);

      // Strap 2: connects cell 1 to cell 2 at X = -1.82
      const strap2 = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.25, 1.0), brassStrapMat);
      strap2.position.set(-1.82, -0.4, 0.47);
      group.add(strap2);

      // Red (+) Knurled Terminal Binding Post on Left (-X)
      const redMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.3 });
      const redTerm = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.65, 14), redMat);
      redTerm.position.set(-2.05, 0.7, -0.95);
      group.add(redTerm);

      // Black (−) Knurled Terminal Binding Post on Right (+X)
      const blackMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.3 });
      const blackTerm = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.65, 14), blackMat);
      blackTerm.position.set(2.05, 0.7, 0.95);
      group.add(blackTerm);
      break;
    }

    case 'plug_key_open': {
      // 10. REAL LAB PLUG KEY - OPEN (PLUG REMOVED)
      // Polished Mahogany Wooden Base Block
      const woodMat = new THREE.MeshStandardMaterial({ color: 0x54260a, roughness: 0.55 });
      const baseMesh = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.65, 2.8), woodMat);
      baseMesh.position.y = -0.95;
      group.add(baseMesh);

      // Heavy Polished Brass Blocks (Left & Right) with visible circular gap
      const brassMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.92, roughness: 0.22 });
      const leftBlock = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.85, 2.0), brassMat);
      leftBlock.position.set(-1.0, -0.2, 0);
      group.add(leftBlock);

      const rightBlock = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.85, 2.0), brassMat);
      rightBlock.position.set(1.0, -0.2, 0);
      group.add(rightBlock);

      // Central socket orifice hole through the brass blocks (clearly empty and open)
      const holeMat = new THREE.MeshStandardMaterial({ color: 0x221307, roughness: 0.8 });
      const hole = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.2, 0.88, 16), holeMat);
      hole.position.set(0, -0.2, 0);
      group.add(hole);

      // Knurled Side Terminal Clamping Screws
      const screwLeft = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.65, 12), brassMat);
      screwLeft.rotation.z = Math.PI / 2;
      screwLeft.position.set(-1.95, -0.2, 0);
      group.add(screwLeft);

      const screwRight = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.65, 12), brassMat);
      screwRight.rotation.z = Math.PI / 2;
      screwRight.position.set(1.95, -0.2, 0);
      group.add(screwRight);

      // UNPLUGGED TAPERED BRASS PIN (RESTING ON WOODEN DECK BESIDE SOCKET TO DEMONSTRATE OPEN CIRCUIT)
      const plugGroup = new THREE.Group();
      const plugPinMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.95, roughness: 0.15 });
      const plugPin = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.18, 1.1, 16), plugPinMat);
      plugPin.position.set(0, 0.5, 0);
      plugGroup.add(plugPin);

      // Fluted Ebonite Insulated Top Handle Knob
      const handleMat = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.35 });
      const handleMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.42, 1.3, 16), handleMat);
      handleMesh.position.set(0, 1.45, 0);
      plugGroup.add(handleMesh);

      // Positioned tilted on the wooden deck to show open circuit
      plugGroup.rotation.z = 0.65;
      plugGroup.rotation.x = 0.2;
      plugGroup.position.set(1.3, 0.05, 0.9);
      group.add(plugGroup);
      break;
    }

    case 'plug_key_closed': {
      // 11. REAL LAB PLUG KEY - CLOSED (PLUG FIRMLY INSERTED)
      // Polished Mahogany Wooden Base Block
      const woodMat = new THREE.MeshStandardMaterial({ color: 0x54260a, roughness: 0.55 });
      const baseMesh = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.65, 2.8), woodMat);
      baseMesh.position.y = -0.95;
      group.add(baseMesh);

      // Heavy Polished Brass Blocks (Left & Right)
      const brassMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.92, roughness: 0.22 });
      const leftBlock = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.85, 2.0), brassMat);
      leftBlock.position.set(-1.0, -0.2, 0);
      group.add(leftBlock);

      const rightBlock = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.85, 2.0), brassMat);
      rightBlock.position.set(1.0, -0.2, 0);
      group.add(rightBlock);

      // Knurled Side Terminal Clamping Screws
      const screwLeft = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.65, 12), brassMat);
      screwLeft.rotation.z = Math.PI / 2;
      screwLeft.position.set(-1.95, -0.2, 0);
      group.add(screwLeft);

      const screwRight = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.65, 12), brassMat);
      screwRight.rotation.z = Math.PI / 2;
      screwRight.position.set(1.95, -0.2, 0);
      group.add(screwRight);

      // Conical Tapered Solid Brass Plug INSERTED FIRMLY INTO CENTRAL ORIFICE (CLOSES CIRCUIT)
      const plugPinMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.95, roughness: 0.15 });
      const plugPin = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.18, 1.1, 16), plugPinMat);
      plugPin.position.set(0, 0.2, 0);
      group.add(plugPin);

      // Fluted Ebonite Insulated Top Handle Knob
      const handleMat = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.35 });
      const handleMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.42, 1.3, 16), handleMat);
      handleMesh.position.set(0, 1.15, 0);
      group.add(handleMesh);
      break;
    }

    case 'wire_joint': {
      // 12. REAL LABORATORY WIRE JOINT (T-JUNCTION SPLICED CONDUCTORS)
      // Horizontal main insulated wire (Red PVC)
      const pvcMat = new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.4 });
      const leftPvc = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 2.0, 14), pvcMat);
      leftPvc.rotation.z = Math.PI / 2;
      leftPvc.position.set(-1.5, 0, 0);
      group.add(leftPvc);

      const rightPvc = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 2.0, 14), pvcMat);
      rightPvc.rotation.z = Math.PI / 2;
      rightPvc.position.set(1.5, 0, 0);
      group.add(rightPvc);

      // Vertical tap wire (Red PVC) coming from bottom
      const vertPvc = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 1.6, 14), pvcMat);
      vertPvc.position.set(0, -1.3, 0);
      group.add(vertPvc);

      // Stripped bare copper conductors in the center
      const copperMat = new THREE.MeshStandardMaterial({ color: 0xb45309, metalness: 0.88, roughness: 0.25 });
      const copperMain = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 1.2, 14), copperMat);
      copperMain.rotation.z = Math.PI / 2;
      group.add(copperMain);

      const copperTap = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.8, 14), copperMat);
      copperTap.position.set(0, -0.4, 0);
      group.add(copperTap);

      // Twisted Copper Wire Wraps around the main conductor (Western Union / T-splice)
      for (let i = -3; i <= 3; i++) {
        const wrapRing = new THREE.Mesh(
          new THREE.TorusGeometry(0.14, 0.045, 8, 20),
          copperMat
        );
        wrapRing.rotation.y = Math.PI / 2;
        wrapRing.position.set(i * 0.08, 0, 0);
        group.add(wrapRing);
      }

      // Solder junction ball / terminal node (representing the solid dot symbol '•')
      const solderMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.95, roughness: 0.2 });
      const solderBall = new THREE.Mesh(new THREE.SphereGeometry(0.24, 16, 14), solderMat);
      solderBall.position.set(0, 0, 0);
      group.add(solderBall);

      // Transparent insulating sleeve / heat-shrink wrap hovering above
      const sleeveMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.5, transparent: true, opacity: 0.65 });
      const sleeve = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.26, 1.2, 14), sleeveMat);
      sleeve.rotation.z = Math.PI / 2;
      sleeve.position.set(0, 0.6, 0);
      group.add(sleeve);
      break;
    }

    case 'wire_crossing': {
      // 13. WIRES CROSSING WITHOUT JOINING (JUMPING BRIDGE ARCH, NO CONTACT)
      // Horizontal straight wire (Red PVC jumper cable) along X axis
      const redPvcMat = new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.35 });
      const horizWire = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 5.0, 16), redPvcMat);
      horizWire.rotation.z = Math.PI / 2;
      horizWire.position.set(0, 0, 0);
      group.add(horizWire);

      // Cross wire (Black PVC jumper cable) along Z axis
      const blackPvcMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.4 });

      // Black wire segment 1 (approaching from back -Z)
      const wireBack = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 1.6, 14), blackPvcMat);
      wireBack.rotation.x = Math.PI / 2;
      wireBack.position.set(0, 0, -1.5);
      group.add(wireBack);

      // Black wire segment 2 (continuing forward +Z)
      const wireFront = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 1.6, 14), blackPvcMat);
      wireFront.rotation.x = Math.PI / 2;
      wireFront.position.set(0, 0, 1.5);
      group.add(wireFront);

      // Bridge Arch: Half-torus jumping smoothly OVER the red wire with air gap!
      const archGeo = new THREE.TorusGeometry(0.72, 0.16, 12, 32, Math.PI);
      const archMesh = new THREE.Mesh(archGeo, blackPvcMat);
      archMesh.rotation.y = Math.PI / 2;
      archMesh.position.set(0, 0, 0);
      group.add(archMesh);

      // Mounting breadboard base
      const boardMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.8 });
      const board = new THREE.Mesh(new THREE.BoxGeometry(4.6, 0.2, 4.6), boardMat);
      board.position.set(0, -0.8, 0);
      group.add(board);
      break;
    }
  }

  return group;
};

export const ThreeDDeviceViewer: React.FC<ThreeDDeviceViewerProps> = ({
  type,
  className = 'w-full h-36',
  autoRotate = true,
  interactive = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRotating, setIsRotating] = useState<boolean>(autoRotate);
  const [zoomLevel] = useState<number>(5.5);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 240;
    const height = container.clientHeight || 150;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.2, zoomLevel);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight1.position.set(5, 8, 6);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x38bdf8, 0.6);
    dirLight2.position.set(-6, -4, -4);
    scene.add(dirLight2);

    const modelGroup = createDeviceScene(type);
    scene.add(modelGroup);

    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      if (!interactive) return;
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging || !interactive) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      modelGroup.rotation.y += deltaX * 0.015;
      modelGroup.rotation.x += deltaY * 0.015;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    const onTouchStart = (e: TouchEvent) => {
      if (!interactive || e.touches.length === 0) return;
      isDragging = true;
      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || !interactive || e.touches.length === 0) return;
      const deltaX = e.touches[0].clientX - previousMousePosition.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.y;

      modelGroup.rotation.y += deltaX * 0.015;
      modelGroup.rotation.x += deltaY * 0.015;

      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    domEl.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (isRotating && !isDragging) {
        modelGroup.rotation.y += 0.012;
      }

      renderer.render(scene, camera);
    };

    animate();

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        if (w > 0 && h > 0) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        }
      }
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      domEl.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domEl.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      resizeObserver.disconnect();
      renderer.dispose();
    };
  }, [type, isRotating, zoomLevel, interactive]);

  return (
    <>
      <div className={`relative group rounded-xl overflow-hidden bg-slate-950/80 border border-slate-800 ${className}`}>
        <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        <div className="absolute top-2 left-2 flex items-center gap-1.5 pointer-events-none">
          <span className="px-2 py-0.5 rounded text-[10px] font-extrabold font-mono tracking-wider bg-cyan-400/20 text-cyan-300 border border-cyan-400/40 shadow-xs flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            REAL LAB 3D
          </span>
        </div>

        <div className="absolute top-2 right-2 flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setIsRotating(!isRotating)}
            className="p-1 rounded bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 transition-colors cursor-pointer"
            title={isRotating ? 'Pause Rotation' : 'Auto Rotate'}
          >
            <RotateCw className={`w-3.5 h-3.5 ${isRotating ? 'text-amber-400' : 'text-slate-400'}`} />
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="p-1 rounded bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 transition-colors cursor-pointer"
            title="Inspect in Fullscreen 3D"
          >
            <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
          </button>
        </div>

        <div className="absolute bottom-1.5 inset-x-0 text-center pointer-events-none">
          <span className="text-[10px] text-slate-400/80 font-medium px-2 py-0.5 rounded-full bg-slate-900/70 border border-slate-800/80 backdrop-blur-xs">
            Drag to rotate 360°
          </span>
        </div>
      </div>

      {showModal && (
        <ThreeDInspectModal
          type={type}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

interface ThreeDInspectModalProps {
  type: DeviceModelType;
  onClose: () => void;
}

const DEVICE_METADATA: Record<
  DeviceModelType,
  {
    title: string;
    description: string;
    parts: { name: string; desc: string }[];
  }
> = {
  bulb: {
    title: 'Electric Candle Bulb (Lab Miniature Filament Lamp)',
    description:
      'Laboratory electric candle-flame miniature bulb with flame-tip glass envelope, glowing coiled tungsten filament, molybdenum leads, and threaded brass Edison screw base.',
    parts: [
      { name: 'Candle-Flame Glass Envelope', desc: 'Slender pointed flame glass dome protecting tungsten filament' },
      { name: 'Tungsten Filament Loop', desc: 'High melting point wire glowing incandescantly with warm golden light' },
      { name: 'Internal Glass Mount', desc: 'Central supporting glass stem insulating the lead wires' },
      { name: 'Threaded Brass Base', desc: 'Standard screw base with threaded contact and bottom solder pip' },
    ],
  },
  fuse: {
    title: 'Normal Fuse (Rewirable Porcelain Kit-Kat Fuse)',
    description:
      'The classic normal rewirable porcelain cut-out fuse (Kit-Kat fuse) used in school physics laboratories and domestic main switchboards. Features a heavy white porcelain base, removable carrier handle, brass contact blades, and clamped rewirable alloy fuse wire.',
    parts: [
      { name: 'White Porcelain Base', desc: 'Heat-resistant, non-conductive ceramic block fixed to the board' },
      { name: 'Removable Porcelain Carrier', desc: 'Kit-Kat bridge with ergonomic finger grip ridges for safe pull-out' },
      { name: 'Brass Contact Blades & Jaws', desc: 'Spring-loaded brass jaws providing firm low-resistance contact' },
      { name: 'Rewirable Fuse Wire', desc: 'Low melting-point lead-tin/copper wire clamped across the bridge' },
    ],
  },
  rheostat: {
    title: 'Laboratory Rheostat (Slider Variable Resistor)',
    description:
      'Authentic school physics laboratory rheostat with ceramic former cylinder wound with oxidized Eureka wire, cast-iron black A-frame end stands, top brass slider bar, and knurled sliding wiper knob.',
    parts: [
      { name: 'Ceramic Former Tube', desc: 'Heavy insulating ceramic cylinder supporting wire turns' },
      { name: 'Eureka Resistance Coil', desc: 'Tightly wound turns of oxidized constantan alloy wire' },
      { name: 'Hexagonal Brass Guide Bar', desc: 'Polished low-resistance slider bar running across top' },
      { name: 'Knurled Slider Carriage', desc: 'Bakelite knob with spring phosphor-bronze wiper contact' },
      { name: '3 Brass Binding Posts', desc: 'Two lower fixed end terminals and one upper variable slider terminal' },
    ],
  },
  switch: {
    title: 'Laboratory Plug Key (School Lab Switch)',
    description:
      'Precision school laboratory brass plug key mounted on a polished mahogany/ebonite block. Inserting the tapered solid brass plug bridges the two heavy brass blocks, completing the circuit.',
    parts: [
      { name: 'Solid Tapered Brass Plug', desc: 'Ground conical plug fitting tightly into hole for zero contact resistance' },
      { name: 'Fluted Ebonite Handle Knob', desc: 'Insulated knob for safe manual plug insertion and removal' },
      { name: 'Thick Brass Blocks', desc: 'Heavy polished blocks separated by a narrow air gap' },
      { name: 'Knurled Binding Screws', desc: 'Side terminal clamping posts for circuit connecting wires' },
    ],
  },
  ammeter: {
    title: 'Real Lab Ammeter (Moving Coil DC Ammeter)',
    description:
      'Real laboratory benchtop moving-coil direct-current ammeter with slanted display housing, glass viewing window, anti-parallax mirror strip, curved calibrated dial (0 to 3 A), red pointer needle, mechanical zero-adjust, and red (+)/black (−) binding posts.',
    parts: [
      { name: 'Calibrated Scale Arc', desc: 'Graduated dual-range scale with bold "A" symbol' },
      { name: 'Anti-Parallax Mirror Strip', desc: 'Reflective strip below scale ensuring perpendicular sightline' },
      { name: 'Knife-Edge Pointer Needle', desc: 'Finely balanced red indicator needle moving over scale' },
      { name: 'Mechanical Zero-Adjust', desc: 'Slotted eccentric screw to calibrate resting zero' },
      { name: 'Red (+) & Black (−) Posts', desc: 'Heavy knurled brass binding posts for series circuit connection' },
    ],
  },
  voltmeter: {
    title: 'Real Lab Voltmeter (Moving Coil DC Voltmeter)',
    description:
      'Real laboratory benchtop moving-coil direct-current voltmeter with slanted console casing, glass window, mirror strip, calibrated voltage dial (0 to 5 V), prominent "V" symbol, red pointer needle, and high internal multiplier resistance ($R \\approx \\infty$).',
    parts: [
      { name: 'Voltage Calibrated Dial', desc: 'Clear scale graduated in Volts with bold "V" indicator' },
      { name: 'Anti-Parallax Mirror Strip', desc: 'Prevents reading error by aligning needle with its reflection' },
      { name: 'Internal Multiplier Resistor', desc: 'High series resistance ensuring voltmeter draws negligible current' },
      { name: 'Red (+) & Black (−) Posts', desc: 'Knurled binding screw posts for parallel voltage drop measurement' },
    ],
  },
  cell: {
    title: 'Electric Dry Cell Battery',
    description:
      'Laboratory cylindrical chemical dry cell battery (1.5 V DC source) with positive brass cap stud and negative zinc base plate.',
    parts: [
      { name: 'Positive Brass Cap (+)', desc: 'Raised top pip contact connected to central carbon cathode rod' },
      { name: 'Negative Zinc Can (−)', desc: 'Outer cylindrical container acting as anode' },
      { name: 'Electrolyte Paste', desc: 'Moist ammonium chloride and manganese dioxide chemical mixture' },
    ],
  },
  resistor: {
    title: 'Fixed Resistor of Resistance R',
    description:
      'Standard laboratory fixed resistor with color-coded ceramic body (Brown-Black-Red-Gold = 1000 Ω ±5%) and axial connecting wire leads.',
    parts: [
      { name: 'Ceramic Body', desc: 'High-stability ceramic substrate coated with resistive alloy film' },
      { name: '4-Band Color Code', desc: 'Standard color bands indicating resistance value in Ohms and tolerance' },
      { name: 'Axial Tinned Leads', desc: 'Solderable copper connecting leads for insertion into circuit' },
    ],
  },
  battery: {
    title: 'A Battery (Combination of Cells in Series)',
    description:
      'A combination of two or more electric cells connected in series (+ terminal of one cell connected to − terminal of the next). In the school physics laboratory, dry cells are arranged in a molded acrylic holder with brass jumper straps to provide increased potential difference (e.g. 4.5 V or 6 V).',
    parts: [
      { name: 'Cylindrical Cells in Series', desc: 'Multiple 1.5 V cells aligned sequentially in the tray' },
      { name: 'Inter-Cell Brass Straps', desc: 'Low-resistance jumper plates connecting positive pip to negative base' },
      { name: 'Red (+) Terminal Post', desc: 'Main positive source output terminal for circuit current flow' },
      { name: 'Black (−) Terminal Post', desc: 'Main negative return terminal completing the closed circuit loop' },
    ],
  },
  plug_key_open: {
    title: 'Plug Key or Switch (Open Circuit)',
    description:
      'Laboratory brass plug key in the OPEN (OFF) state. The tapered brass plug is removed and resting on the side, leaving an insulating air gap between the two brass blocks. The circuit is broken and no current can flow.',
    parts: [
      { name: 'Insulating Air Gap', desc: 'Wide air gap separating the two blocks, breaking circuit continuity' },
      { name: 'Tapered Brass Plug (Removed)', desc: 'Conical pin with insulated handle resting beside socket' },
      { name: 'Heavy Brass Blocks', desc: 'Mounted on polished mahogany base with side wire binding terminals' },
    ],
  },
  plug_key_closed: {
    title: 'Plug Key or Switch (Closed Circuit)',
    description:
      'Laboratory brass plug key in the CLOSED (ON) state. The tapered brass plug is firmly inserted into the central conical socket, forming a zero-resistance metallic bridge between the blocks that allows electric current to stream through.',
    parts: [
      { name: 'Inserted Brass Plug', desc: 'Ground conical brass pin wedged tightly into hole for continuous contact' },
      { name: 'Fluted Ebonite Handle', desc: 'Heat and electrical insulating knob for operator protection' },
      { name: 'Continuous Conduction Path', desc: 'Circuit is completed; electron flow proceeds uninterrupted' },
    ],
  },
  wire_joint: {
    title: 'A Wire Joint (Spliced Junction)',
    description:
      'A permanent physical and electrical connection between two or more insulated conductors. In the physics laboratory, wire ends are stripped, tightly twisted in a T-joint/pigtail splice, and soldered with an insulating sleeve to branch current into multiple parallel paths.',
    parts: [
      { name: 'Stripped Copper Core', desc: 'High-purity annealed copper strands twisted firmly together' },
      { name: 'Solder Junction Node', desc: 'Solid low-resistance electrical connection point (represented by • dot)' },
      { name: 'PVC Insulation Sleeve', desc: 'Protective polymer jacket preventing short circuits and contact hazards' },
    ],
  },
  wire_crossing: {
    title: 'Wires Crossing Without Joining (Jumper Arch)',
    description:
      'Two electrical conductors crossing each other in a circuit diagram or breadboard with zero electrical connection. In laboratory wiring, one insulated cable forms a physical 3D bridge arch over the other, ensuring complete galvanic isolation without contact or current leakage.',
    parts: [
      { name: 'Main Horizontal Wire', desc: 'Red insulated conductor carrying signal along horizontal axis' },
      { name: 'Jumping Bridge Arch', desc: 'Black insulated cable curving smoothly over the lower wire with air clearance' },
      { name: 'Galvanic Isolation', desc: 'No electrical contact; currents in both wires remain totally independent' },
    ],
  },
};

const ThreeDInspectModal: React.FC<ThreeDInspectModalProps> = ({ type, onClose }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [zoomLevel, setZoomLevel] = useState<number>(5.5);
  const meta = DEVICE_METADATA[type];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 400;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.2, zoomLevel);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.6);
    dirLight1.position.set(5, 8, 6);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x38bdf8, 0.7);
    dirLight2.position.set(-6, -4, -4);
    scene.add(dirLight2);

    const modelGroup = createDeviceScene(type);
    scene.add(modelGroup);

    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      modelGroup.rotation.y += deltaX * 0.015;
      modelGroup.rotation.x += deltaY * 0.015;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      isDragging = true;
      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length === 0) return;
      const deltaX = e.touches[0].clientX - previousMousePosition.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.y;

      modelGroup.rotation.y += deltaX * 0.015;
      modelGroup.rotation.x += deltaY * 0.015;

      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    domEl.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (isRotating && !isDragging) {
        modelGroup.rotation.y += 0.01;
      }
      renderer.render(scene, camera);
    };
    animate();

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        if (w > 0 && h > 0) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        }
      }
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animId);
      domEl.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domEl.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      resizeObserver.disconnect();
      renderer.dispose();
    };
  }, [type, isRotating, zoomLevel]);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">{meta.title}</h3>
              <p className="text-xs text-slate-400">Real Laboratory Physical Apparatus (360° 3D Model)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3D Canvas Area */}
        <div className="relative h-80 bg-radial from-slate-900 to-slate-950 flex items-center justify-center border-b border-slate-800">
          <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

          {/* Floating Controls */}
          <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-slate-900/90 border border-slate-700 p-1.5 rounded-xl shadow-lg">
            <button
              onClick={() => setIsRotating(!isRotating)}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                isRotating ? 'bg-amber-400/20 text-amber-300' : 'text-slate-400 hover:text-white'
              }`}
              title="Toggle Auto-Rotation"
            >
              <RotateCw className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoomLevel((prev) => Math.max(3.5, prev - 0.6))}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoomLevel((prev) => Math.min(8.5, prev + 0.6))}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
          </div>

          <div className="absolute bottom-3 inset-x-0 text-center pointer-events-none">
            <span className="text-xs font-mono text-slate-400 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700">
              🖱️ Drag mouse or swipe finger to rotate 360° in 3D space
            </span>
          </div>
        </div>

        {/* Detailed Parts & Physics Info */}
        <div className="p-6 space-y-4">
          <p className="text-sm text-slate-300 leading-relaxed">{meta.description}</p>

          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-amber-400 mb-2 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              <span>Anatomy of Physical Lab Apparatus (AP SSC Physics Practical):</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {meta.parts.map((p, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-xs font-bold text-slate-200 block">{p.name}</span>
                  <span className="text-[11px] text-slate-400 leading-snug block mt-0.5">{p.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between text-xs text-slate-400">
          <span>Real Laboratory Physics Apparatus · 3D WebGL Three.js</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-amber-400 text-slate-950 font-bold hover:bg-amber-300 transition-colors cursor-pointer"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
