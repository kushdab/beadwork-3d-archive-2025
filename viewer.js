import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

/**
 * Beadwork 3D Archive 2025
 * Core Viewer Engine
 */
class BeadworkViewer {
    constructor(containerId) {
        this.container = document.getElementById(containerId) || document.body;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        
        this.init();
        this.addLighting();
        this.createBeadworkArchive();
        this.animate();
    }

    init() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.container.appendChild(this.renderer.domElement);

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.camera.position.z = 5;
        
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    addLighting() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        const pointLight = new THREE.PointLight(0xffffff, 1);
        pointLight.position.set(5, 5, 5);
        this.scene.add(ambientLight, pointLight);
    }

    /**
     * Generates a procedural Maasai-style beaded disc
     */
    createBeadworkArchive() {
        const beadGroup = new THREE.Group();
        const rings = 12;
        const beadRadius = 0.05;
        
        // Traditional Kenyan colors: Red, Blue, Green, White, Black, Yellow
        const palette = [0xbf0000, 0x003399, 0x006600, 0xffffff, 0x000000, 0xffcc00];

        for (let r = 1; r <= rings; r++) {
            const radius = r * 0.15;
            const count = Math.floor(radius * 50);
            const color = palette[r % palette.length];

            for (let i = 0; i < count; i++) {
                const angle = (i / count) * Math.PI * 2;
                const geometry = new THREE.SphereGeometry(beadRadius, 8, 8);
                const material = new THREE.MeshStandardMaterial({
                    color: color,
                    roughness: 0.3,
                    metalness: 0.1
                });
                
                const bead = new THREE.Mesh(geometry, material);
                bead.position.set(
                    Math.cos(angle) * radius,
                    Math.sin(angle) * radius,
                    (Math.random() - 0.5) * 0.05 // Slight depth variance
                );
                beadGroup.add(bead);
            }
        }

        this.scene.add(beadGroup);
        this.beadwork = beadGroup;
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        if (this.beadwork) {
            this.beadwork.rotation.z += 0.001;
        }
        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize the gallery
window.addEventListener('DOMContentLoaded', () => {
    new BeadworkViewer('app');
});