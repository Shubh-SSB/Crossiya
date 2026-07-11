"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { cn } from "@/lib/utils";

export interface RippleSlide {
    title: string;
    description: string;
    image: string;
}

export interface RippleDisplacementSliderProps {
    className?: string;
    slides?: RippleSlide[];
}

import cafe1 from "@/assets/cafe1.jpg"
import cafe2 from "@/assets/cafe2.jpg"
import cafe3 from "@/assets/cafe3.jpg"
import cafe4 from "@/assets/cafe4.jpeg"
import cafe5 from "@/assets/cafe5.jpeg"
import cafe6 from "@/assets/cafe6.jpeg"
import cafe7 from "@/assets/cafe7.jpeg"
import cafe8 from "@/assets/cafe8.jpeg"
import cafe9 from "@/assets/cafe9.jpeg"

const DEFAULT_SLIDES: RippleSlide[] = [
    {
        title: "Cozy Ambiance",
        description: "Double ristretto, velvet milk, drawn by hand.",
        image: cafe1.src,
    },
    {
        title: "Cozy Ambiance",
        description: "Stone-milled ceremonial grade, oat or whole milk.",
        image: cafe2.src,
    },
    {
        title: "Cozy Ambiance",
        description: "72-hour cold proof, French cultured butter.",
        image: cafe3.src,
    },
    {
        title: "Cozy Ambiance",
        description: "Chiffon sponge, mascarpone cream, ripe berries.",
        image: cafe4.src,
    },
    {
        title: "Cozy Ambiance",
        description: "Slow mornings, soft mornings. The perfect place to unwind.",
        image: cafe5.src,
    },
    {
        title: "Cozy Ambiance",
        description: "Slow mornings, soft mornings. The perfect place to unwind.",
        image: cafe6.src,
    },
    {
        title: "Cozy Ambiance",
        description: "Slow mornings, soft mornings. The perfect place to unwind.",
        image: cafe7.src,
    },
    {
        title: "Cozy Ambiance",
        description: "Slow mornings, soft mornings. The perfect place to unwind.",
        image: cafe8.src,
    },
    {
        title: "Cozy Ambiance",
        description: "Slow mornings, soft mornings. The perfect place to unwind.",
        image: cafe9.src,
    },
];

export const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const fragmentShader = `
uniform sampler2D uTexCurrent;
uniform sampler2D uTexNext;
uniform float uProgress;
uniform vec2 uResolution;
uniform vec2 uImageResCurrent;
uniform vec2 uImageResNext;
uniform float uWaveFreq;
uniform float uWavePow;
uniform float uWaveWidth;
uniform float uFalloff;
uniform float uBoostStrength;
uniform float uCrossfadeWidth;
uniform float uMobile;

varying vec2 vUv;

vec2 getImageUv(vec2 uv, vec2 screenRes, vec2 imgRes, vec2 boxMin, vec2 boxMax) {
  vec2 boxUv = (uv - boxMin) / (boxMax - boxMin);
  vec2 boxSize = (boxMax - boxMin) * screenRes;
  float boxAspect = boxSize.x / boxSize.y;
  float imgAspect = imgRes.x / imgRes.y;
  vec2 scale = vec2(1.0);
  if (boxAspect > imgAspect) {
    scale.y = imgAspect / boxAspect;
  } else {
    scale.x = boxAspect / imgAspect;
  }
  return (boxUv - 0.5) * scale + 0.5;
}

bool isInsideBox(vec2 uv, vec2 boxMin, vec2 boxMax) {
  return uv.x >= boxMin.x && uv.x <= boxMax.x && uv.y >= boxMin.y && uv.y <= boxMax.y;
}

void main() {
  vec2 boxMin = vec2(0.0);
  vec2 boxMax = vec2(1.0);

  float aspectRatio = uResolution.y / uResolution.x;
  vec2 coord = vec2(vUv.x, vUv.y * aspectRatio);
  vec2 center = vec2(0.5, 0.5 * aspectRatio);
  
  float dist = distance(coord, center);
  float time = uProgress;

  vec2 displaced = coord;
  float brightness = 0.0;
  float blend = 0.0;

  if (time > 0.001) {
    float trailing = dist - time;
    if (trailing < uWaveWidth && trailing < 0.0) {
      float age = -trailing;
      float decay = exp(-age * uFalloff);
      float wave = sin(age * uWaveFreq) * decay;
      vec2 direction = normalize(coord - center);
      displaced += direction * wave * uWavePow;
      brightness = abs(wave) * uBoostStrength * decay;
    }
    blend = smoothstep(0.0, uCrossfadeWidth, -trailing);
  }
  
  vec2 finalUv = vec2(displaced.x, displaced.y / aspectRatio);
  vec2 imageUvCurrent = getImageUv(finalUv, uResolution, uImageResCurrent, boxMin, boxMax);
  vec2 imageUvNext = getImageUv(finalUv, uResolution, uImageResNext, boxMin, boxMax);
  
  vec4 currentColor = texture2D(uTexCurrent, imageUvCurrent);
  vec4 nextColor = texture2D(uTexNext, imageUvNext);

  vec4 color = mix(currentColor, nextColor, blend);
  color.rgb += color.rgb * brightness;

  if (!isInsideBox(finalUv, boxMin, boxMax)) {
    color = vec4(0.0);
  }

  gl_FragColor = color;
}
`;

const rippleConfig = {
    waveFreq: 25.0,
    wavePow: 0.035,
    waveWidth: 0.5,
    falloff: 10.0,
    boostStrength: 0.5,
    crossfadeWidth: 0.05,
    duration: 1.2,
    endValue: 1.0,
    ease: "power2.inOut",
};

export function CornerDisplay({
    className,
    slides = DEFAULT_SLIDES
}: RippleDisplacementSliderProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [texturesLoaded, setTexturesLoaded] = useState(false);

    const materialRef = useRef<THREE.ShaderMaterial | null>(null);
    const texturesRef = useRef<THREE.Texture[]>([]);
    const isTransitioning = useRef(false);

    // Removed renderSplitTitle in favor of line-based animation

    useEffect(() => {
        if (!canvasRef.current || !containerRef.current) return;

        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0.01, 10);
        camera.position.z = 1;

        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current,
            antialias: true,
            alpha: true
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);

        const loader = new THREE.TextureLoader();
        loader.setCrossOrigin("anonymous");

        // OPTIMIZATION: Only await the FIRST texture so it renders immediately.
        const loadFirstTexture = new Promise<THREE.Texture>((resolve) => {
            loader.load(
                slides[0].image,
                (texture) => {
                    texture.minFilter = THREE.LinearFilter;
                    texture.magFilter = THREE.LinearFilter;
                    texture.wrapS = THREE.ClampToEdgeWrapping;
                    texture.wrapT = THREE.ClampToEdgeWrapping;
                    resolve(texture);
                },
                undefined,
                (err) => {
                    console.error("Failed to load first texture", err);
                    resolve(new THREE.Texture()); // Resolve anyway so it doesn't hang
                }
            );
        });

        loadFirstTexture.then((firstTex) => {
            // Background load the rest seamlessly
            const allTextures = slides.map((slide, idx) => {
                if (idx === 0) return firstTex;
                const tex = loader.load(slide.image);
                tex.minFilter = THREE.LinearFilter;
                tex.magFilter = THREE.LinearFilter;
                tex.wrapS = THREE.ClampToEdgeWrapping;
                tex.wrapT = THREE.ClampToEdgeWrapping;
                return tex;
            });

            texturesRef.current = allTextures;

            const width = containerRef.current!.clientWidth;
            const height = containerRef.current!.clientHeight;
            const isMobile = width < 1000;

            const imgWidth = (firstTex.image as any)?.width || 1920;
            const imgHeight = (firstTex.image as any)?.height || 1080;

            const nextTex = allTextures[1 % slides.length];
            const nextImgWidth = (nextTex.image as any)?.width || 1920;
            const nextImgHeight = (nextTex.image as any)?.height || 1080;

            const material = new THREE.ShaderMaterial({
                vertexShader,
                fragmentShader,
                uniforms: {
                    uTexCurrent: { value: allTextures[0] },
                    uTexNext: { value: nextTex },
                    uProgress: { value: 0 },
                    uResolution: { value: new THREE.Vector2(width, height) },
                    uImageResCurrent: { value: new THREE.Vector2(imgWidth, imgHeight) },
                    uImageResNext: { value: new THREE.Vector2(nextImgWidth, nextImgHeight) },
                    uWaveFreq: { value: rippleConfig.waveFreq },
                    uWavePow: { value: rippleConfig.wavePow },
                    uWaveWidth: { value: rippleConfig.waveWidth },
                    uFalloff: { value: rippleConfig.falloff },
                    uBoostStrength: { value: rippleConfig.boostStrength },
                    uCrossfadeWidth: { value: rippleConfig.crossfadeWidth },
                    uMobile: { value: isMobile ? 1.0 : 0.0 },
                },
                transparent: true,
            });
            materialRef.current = material;

            const geometry = new THREE.PlaneGeometry(1, 1);
            const mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh);

            const resize = () => {
                if (!containerRef.current) return;
                const w = containerRef.current.clientWidth;
                const h = containerRef.current.clientHeight;
                renderer.setSize(w, h);
                material.uniforms.uResolution.value.set(w, h);
                material.uniforms.uMobile.value = w < 1000 ? 1.0 : 0.0;

                // Ensure the wave expands fully beyond the screen corners
                const ratio = h / w;
                const cx = 0.5;
                const cy = 0.5 * ratio;
                const maxDist = Math.sqrt(cx * cx + cy * cy);

                rippleConfig.endValue = maxDist + rippleConfig.waveWidth;
                rippleConfig.duration = w <= 1000 ? 0.9 : 1.2;
            };
            resize();
            window.addEventListener("resize", resize);

            gsap.ticker.add(() => {
                renderer.render(scene, camera);
            });

            setTexturesLoaded(true);

            // Trigger initial text in
            const ctx = gsap.context(() => {
                const lines = document.querySelectorAll(".line-anim");

                gsap.fromTo(
                    lines,
                    { y: "120%" },
                    { y: "0%", duration: 0.9, stagger: 0.1, ease: "power3.out" }
                );
            }, contentRef);

            return () => {
                window.removeEventListener("resize", resize);
                gsap.ticker.remove(() => renderer.render(scene, camera));
                renderer.dispose();
                geometry.dispose();
                material.dispose();
                ctx.revert();
            };
        });
    }, [slides]);

    const handleNextSlide = () => {
        if (isTransitioning.current || !materialRef.current || !texturesRef.current.length) return;
        isTransitioning.current = true;

        const nextIndex = (currentIndex + 1) % slides.length;

        // Animate text out
        const lines = contentRef.current?.querySelectorAll(".line-anim");

        const tl = gsap.timeline({
            onComplete: () => {
                setCurrentIndex(nextIndex);

                // Wait for React to render new text, then animate in
                setTimeout(() => {
                    const newLines = contentRef.current?.querySelectorAll(".line-anim");
                    if (!newLines) return;

                    gsap.set(newLines, { y: "120%" });

                    gsap.to(newLines, {
                        y: "0%",
                        duration: 0.8,
                        stagger: 0.1,
                        ease: "power3.out",
                    });
                }, 50);
            }
        });

        tl.to(lines || [], {
            y: "-120%",
            duration: 0.4,
            stagger: 0.05,
            ease: "power2.in",
        });

        // Animate shader
        const material = materialRef.current;
        const nextTex = texturesRef.current[nextIndex];
        const nextImgWidth = (nextTex.image as any)?.width || 1920;
        const nextImgHeight = (nextTex.image as any)?.height || 1080;

        material.uniforms.uTexNext.value = nextTex;
        material.uniforms.uImageResNext.value.set(nextImgWidth, nextImgHeight);

        gsap.to(material.uniforms.uProgress, {
            value: rippleConfig.endValue,
            duration: rippleConfig.duration,
            ease: rippleConfig.ease,
            onComplete: () => {
                material.uniforms.uTexCurrent.value = nextTex;
                material.uniforms.uImageResCurrent.value.set(nextImgWidth, nextImgHeight);
                material.uniforms.uProgress.value = 0;
                isTransitioning.current = false;
            }
        });
    };

    // Autoplay loop
    useEffect(() => {
        if (!texturesLoaded) return;
        const timer = setTimeout(() => {
            handleNextSlide();
        }, 5000);
        return () => clearTimeout(timer);
    }, [currentIndex, texturesLoaded]);

    return (
        <div
            ref={containerRef}
            className={cn("slider relative w-full h-full min-h-[600px] overflow-hidden bg-[#0f0a05] cursor-pointer", className)}
            onClick={handleNextSlide}
        >
            <canvas ref={canvasRef} className="block w-full h-full absolute inset-0 z-0" />

            <div
                ref={contentRef}
                className="slide-content absolute inset-0 w-full h-full mix-blend-difference select-none pointer-events-none z-[2]"
                style={{ opacity: texturesLoaded ? 1 : 0, transition: "opacity 0.5s ease" }}
            >
                {/* <div className="absolute top-1/2 left-8 md:left-24 -translate-y-1/2 w-full max-w-xl text-white px-4">
                    <div className="overflow-hidden mb-4">
                        <p className="line-anim text-xs font-semibold uppercase tracking-[0.2em] text-white will-change-transform">
                            Highlights
                        </p>
                    </div>
                    <div className="overflow-hidden mb-6">
                        <h1 className="line-anim text-[clamp(2rem,4vw,6rem)] font-medium tracking-[-0.02em] leading-tight text-white will-change-transform pb-2">
                            {slides[currentIndex].title}
                        </h1>
                    </div>
                    <div className="overflow-hidden">
                        <p className="line-anim text-lg md:text-xl font-poppins text-white leading-relaxed will-change-transform">
                            {slides[currentIndex].description}
                        </p>
                    </div>
                </div> */}
            </div>
        </div>
    );
}

export default CornerDisplay;
