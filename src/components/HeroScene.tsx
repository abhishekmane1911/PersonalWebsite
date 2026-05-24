import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useIsMobile } from '../hooks/useIsMobile';

/* ── Mouse-tracking camera rig ── */
const CameraRig = () => {
    const { camera } = useThree();
    const mouse = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouse = (e: MouseEvent) => {
            mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
            mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
        };
        window.addEventListener('mousemove', handleMouse);
        return () => window.removeEventListener('mousemove', handleMouse);
    }, []);

    useFrame(() => {
        camera.position.x += (mouse.current.x * 0.5 - camera.position.x) * 0.02;
        camera.position.y += (-mouse.current.y * 0.3 - camera.position.y) * 0.02;
        camera.lookAt(0, 0, 0);
    });

    return null;
};

/* ── Main torus knot — hero centrepiece ── */
const HeroTorusKnot = () => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.08;
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.12;
            meshRef.current.rotation.z = state.clock.elapsedTime * 0.05;
        }
    });

    return (
        <Float speed={1.2} rotationIntensity={0.3} floatIntensity={1.2}>
            <mesh ref={meshRef} position={[0, 0, 0]} scale={1.1}>
                <torusKnotGeometry args={[1.2, 0.4, 256, 64, 2, 3]} />
                <MeshDistortMaterial
                    color="#0a0a0a"
                    emissive="#050510"
                    emissiveIntensity={0.2}
                    roughness={0.4}
                    metalness={0.95}
                    distort={0.25}
                    speed={1.5}
                    transparent
                    opacity={0.85}
                />
            </mesh>
        </Float>
    );
};



/* ── Particle field ── */
const ParticleField = ({ count = 300 }: { count?: number }) => {
    const mesh = useRef<THREE.Points>(null);
    const geometryRef = useRef<THREE.BufferGeometry>(null);

    const particles = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const sizes = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 20;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

            const t = Math.random();
            if (t < 0.6) {
                // Warm white
                colors[i * 3] = 0.92; colors[i * 3 + 1] = 0.90; colors[i * 3 + 2] = 0.87;
            } else {
                // Amber/gold
                colors[i * 3] = 0.91; colors[i * 3 + 1] = 0.77; colors[i * 3 + 2] = 0.28;
            }

            sizes[i] = Math.random() * 0.04 + 0.01;
        }

        return { positions, colors, sizes };
    }, [count]);

    useEffect(() => {
        if (geometryRef.current) {
            geometryRef.current.setAttribute('position', new THREE.BufferAttribute(particles.positions, 3));
            geometryRef.current.setAttribute('color', new THREE.BufferAttribute(particles.colors, 3));
        }
    }, [particles]);

    useFrame((state) => {
        if (mesh.current) {
            mesh.current.rotation.x = state.clock.elapsedTime * 0.02;
            mesh.current.rotation.y = state.clock.elapsedTime * 0.03;
        }
    });

    return (
        <points ref={mesh}>
            <bufferGeometry ref={geometryRef} />
            <pointsMaterial
                size={0.04}
                vertexColors
                transparent
                opacity={0.7}
                sizeAttenuation
                depthWrite={false}
            />
        </points>
    );
};

/* ── Orbit ring ── */
const OrbitRing = ({ radius, speed, color, tilt }: {
    radius: number; speed: number; color: string; tilt: [number, number, number];
}) => {
    const ref = useRef<THREE.Mesh>(null);
    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.z = state.clock.elapsedTime * speed;
        }
    });
    return (
        <mesh ref={ref} rotation={tilt}>
            <torusGeometry args={[radius, 0.006, 16, 128]} />
            <meshBasicMaterial color={color} transparent opacity={0.2} />
        </mesh>
    );
};

/* ── Main scene ── */
const HeroScene = () => {
    const isMobile = useIsMobile();

    // Skip heavy Three.js rendering on mobile devices
    if (isMobile) return null;

    return (
        <div
            className="absolute top-0 right-0 bottom-0 z-0 pointer-events-none"
            style={{ width: '52%' }}
        >
            <Canvas
                camera={{ position: [0, 0, 6], fov: 52 }}
                dpr={[1, 1.5]}
                gl={{ antialias: true, alpha: true }}
                style={{ background: 'transparent' }}
            >
                {/* Lighting — warm, not violet/cyan */}
                <ambientLight intensity={0.15} />
                <directionalLight position={[5, 5, 5]} intensity={0.8} color="#FFF8E7" />
                <directionalLight position={[-3, 2, -2]} intensity={0.4} color="#E8C547" />
                <pointLight position={[-5, -5, -5]} intensity={0.4} color="#FFFFFF" />
                <pointLight position={[5, -3, 2]} intensity={0.3} color="#E8C547" />
                <pointLight position={[0, 5, 0]} intensity={0.2} color="#FFF5CC" />

                {/* Camera rig */}
                <CameraRig />

                {/* Centre piece */}
                <HeroTorusKnot />

                {/* Particles */}
                <ParticleField count={280} />

                {/* Orbit rings — desaturated, subtle */}
                <OrbitRing radius={2.8} speed={0.2}  color="#E8C547" tilt={[0.3, 0, 0]} />
                <OrbitRing radius={3.5} speed={-0.15} color="#FFFFFF" tilt={[-0.2, 0.5, 0]} />
                <OrbitRing radius={4.2} speed={0.1}  color="#888888" tilt={[0.1, -0.3, 0.2]} />
            </Canvas>
        </div>
    );
};

export default HeroScene;
