import * as THREE from 'three';

let camera, scene, renderer, lines;
let container;
const LINE_COUNT = 50;
const GRID_SIZE = 300;

/**
 * Initializes and manages the Three.js background for the OS section.
 * @param {HTMLElement} element 
 */
export function initOSBackground(element) {
    container = element;
    
    // Setup Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); 
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 1); // Set background clear color to black
    container.appendChild(renderer.domElement);

    // Setup Scene and Camera
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 50, 250); // Deep fog effect

    camera = new THREE.PerspectiveCamera(70, container.clientWidth / container.clientHeight, 1, 1000);
    camera.position.set(0, 5, 0); // Camera slightly above the grid plane, looking down Z

    createAnimatedGrid();
    
    window.addEventListener('resize', onWindowResize);
    
    // Start animation loop
    animate();
}

function createAnimatedGrid() {
    // Bright green material, slightly transparent (matching OS highlight color #00FF66)
    const material = new THREE.LineBasicMaterial({ 
        color: 0x00FF66, 
        opacity: 0.15,
        transparent: true,
        linewidth: 1 
    });

    const geometry = new THREE.BufferGeometry();
    const positions = [];
    
    const divisions = LINE_COUNT;
    const step = GRID_SIZE / divisions;
    
    // Create lines in the XZ plane (Y=0)
    for (let i = 0; i <= divisions; i++) {
        const x = i * step - GRID_SIZE / 2;
        
        // Z lines (parallel to Z axis)
        positions.push(x, 0, -GRID_SIZE / 2);
        positions.push(x, 0, GRID_SIZE / 2);
        
        // X lines (parallel to X axis)
        const z = i * step - GRID_SIZE / 2;
        positions.push(-GRID_SIZE / 2, 0, z);
        positions.push(GRID_SIZE / 2, 0, z);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    lines = new THREE.LineSegments(geometry, material);
    
    // Add subtle rotation and position it lower
    lines.rotation.x = -Math.PI / 10; 
    lines.position.y = -50; 
    
    scene.add(lines);
}

function onWindowResize() {
    if (!container) return;
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
}

const clock = new THREE.Clock();
// Calculate interval based on 5 grid steps for smooth looping illusion
const loopInterval = (GRID_SIZE / LINE_COUNT) * 5; 

function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    
    // Movement simulation along Z axis (into the screen)
    lines.position.z += 10 * delta; 

    // Loop the Z position for infinite movement illusion
    if (lines.position.z > loopInterval) {
        lines.position.z -= loopInterval;
    }
    
    // Subtle side rotation for visual interest
    lines.rotation.y += 0.03 * delta;
    
    renderer.render(scene, camera);
}

