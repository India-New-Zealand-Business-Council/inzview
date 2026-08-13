import React, { useEffect, useRef, useState } from 'react';
import type {
  Group,
  Material,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  ShaderMaterial,
  Texture,
} from 'three';
import './EffectsWorld.css';

type ThreeModule = typeof import('three');
type WorldStatus = 'idle' | 'loading' | 'ready' | 'fallback';

/** Scene budget tiers by viewport width. Every tier renders the same world; they differ
 *  in pixel ratio, antialiasing, particle count and GPU power hint. There is no width
 *  below which the scene is refused -- phones run it too. Only `constrainedDevice`
 *  (save-data, or <4GB RAM) opts out, and that device gets the static CSS tier. */
const WORLD_DESKTOP_MIN_WIDTH = 941;
const WORLD_TABLET_MIN_WIDTH = 721;

type WorldBudget = Readonly<{
  pixelRatio: number;
  antialias: boolean;
  particles: number;
  powerPreference: 'high-performance' | 'default';
}>;

function worldBudget(): WorldBudget {
  const width = window.innerWidth;
  if (width >= WORLD_DESKTOP_MIN_WIDTH) {
    return { pixelRatio: 1.35, antialias: true, particles: 780, powerPreference: 'high-performance' };
  }
  if (width >= WORLD_TABLET_MIN_WIDTH) {
    return { pixelRatio: 1, antialias: false, particles: 380, powerPreference: 'high-performance' };
  }
  // Phones: lowest budget and no high-performance GPU request, which on mobile
  // meaningfully affects battery for a decorative background.
  return { pixelRatio: 1, antialias: false, particles: 220, powerPreference: 'default' };
}

type WorldKeyframe = Readonly<{
  position: readonly [number, number, number];
  rotation: readonly [number, number, number];
  scale: number;
}>;

type PhotoPlane = Readonly<{
  group: Group;
  material: MeshBasicMaterial;
  frame: Material;
  chapter: number;
  x: number;
  y: number;
  turn: number;
}>;

const CHAPTER_SELECTORS = [
  '.home-hero',
  '.home-trade-thread',
  '.home-intro',
  '.home-pathways',
  '.home-events',
  '.home-membership',
  '.home-intelligence',
  '.home-partners',
  '.home-conversion',
] as const;

const WORLD_KEYFRAMES: readonly WorldKeyframe[] = [
  { position: [2.55, 0.2, -0.8], rotation: [0.1, -0.45, -0.08], scale: 0.92 },
  { position: [2.15, -0.15, -0.35], rotation: [-0.08, 0.32, 0.1], scale: 1.08 },
  { position: [2.75, 0.35, -0.7], rotation: [0.16, 0.82, -0.12], scale: 0.82 },
  { position: [-2.65, -0.25, -0.5], rotation: [-0.14, 1.45, 0.08], scale: 0.9 },
  { position: [2.7, 0.15, -0.65], rotation: [0.12, 2.05, -0.08], scale: 0.78 },
  { position: [-2.5, 0, -0.3], rotation: [-0.18, 2.7, 0.12], scale: 1.02 },
  { position: [2.35, 0.25, -0.45], rotation: [0.16, 3.35, -0.1], scale: 0.9 },
  { position: [3.2, -0.1, -1.1], rotation: [-0.04, 4.1, 0.04], scale: 0.62 },
  { position: [3, 0.55, -0.55], rotation: [0.08, 4.8, 0], scale: 0.76 },
] as const;

/* Per-chapter globe presence, indexed by CHAPTER_SELECTORS. The text-heavy middle was
   sitting at 0.10--0.16: too faint to read as design, too present to read as absent, so
   it landed as a rendering artifact behind the copy. Committed to three deliberate
   moments -- hero, trade corridor, closing CTA -- and effectively zero in between. */
const CORE_VISIBILITY_KEYFRAMES = [1, 0.88, 0.03, 0.03, 0.04, 0.03, 0.04, 0.02, 0.78] as const;

const PHOTO_TEXTURES = [
  {
    src: '/effects/otago-harbour-makalu.webp',
    chapter: 0.8,
    x: -2.45,
    y: -1.35,
    turn: 0.24,
  },
  {
    src: '/effects/port-sunset-marcofedermann.webp',
    chapter: 3.45,
    x: 2.35,
    y: 1.2,
    turn: -0.28,
  },
  {
    src: '/effects/ladakh-india-suketdedhia.webp',
    chapter: 5.2,
    x: 2.45,
    y: -1.25,
    turn: -0.22,
  },
  {
    src: '/effects/network-mesh-mjh-shikder.webp',
    chapter: 6.8,
    x: -2.45,
    y: 1.15,
    turn: 0.2,
  },
] as const;

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const mix = (from: number, to: number, progress: number) => from + (to - from) * progress;
const smooth = (value: number) => {
  const progress = clamp(value);
  return progress * progress * (3 - 2 * progress);
};

function createSeededRandom(seed = 4871) {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function disposeObject(object: Object3D) {
  object.traverse((child) => {
    const mesh = child as Mesh;
    mesh.geometry?.dispose?.();
    const materials = Array.isArray(mesh.material) ? mesh.material : mesh.material ? [mesh.material] : [];
    materials.forEach((material) => {
      const typedMaterial = material as Material & Record<string, unknown>;
      Object.values(typedMaterial).forEach((value) => {
        if (value && typeof value === 'object' && 'isTexture' in value) {
          (value as Texture).dispose();
        }
      });
      material.dispose();
    });
  });
}

function getWorldPhase(stops: readonly number[], focusY: number) {
  if (stops.length < 2 || focusY <= stops[0]) return 0;
  const lastIndex = stops.length - 1;
  if (focusY >= stops[lastIndex]) return lastIndex;

  for (let index = 0; index < lastIndex; index += 1) {
    if (focusY < stops[index + 1]) {
      const distance = Math.max(1, stops[index + 1] - stops[index]);
      return index + smooth((focusY - stops[index]) / distance);
    }
  }

  return lastIndex;
}

function addPhotoPlane(
  THREE: ThreeModule,
  world: Group,
  loader: InstanceType<ThreeModule['TextureLoader']>,
  config: (typeof PHOTO_TEXTURES)[number],
  photos: PhotoPlane[],
  anisotropy: number,
  isDisposed: () => boolean,
  invalidate: () => void,
) {
  loader.load(
    config.src,
    (texture) => {
      if (isDisposed()) {
        texture.dispose();
        return;
      }
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = anisotropy;

      const group = new THREE.Group();
      const geometry = new THREE.PlaneGeometry(2.46, 1.64);
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0,
        depthWrite: false,
        side: THREE.DoubleSide,
        toneMapped: false,
      });
      const image = new THREE.Mesh(geometry, material);
      image.renderOrder = 3;

      const frameGeometry = new THREE.EdgesGeometry(geometry);
      const frame = new THREE.LineBasicMaterial({
        color: 0xb8f07c,
        transparent: true,
        opacity: 0,
        depthWrite: false,
      });
      const edges = new THREE.LineSegments(frameGeometry, frame);
      edges.position.z = 0.018;
      edges.renderOrder = 4;

      group.add(image, edges);
      group.position.set(config.x, config.y, -0.2);
      group.rotation.set(-0.08, config.turn, config.turn * 0.32);
      world.add(group);
      photos.push({
        group,
        material,
        frame,
        chapter: config.chapter,
        x: config.x,
        y: config.y,
        turn: config.turn,
      });
      invalidate();
    },
    undefined,
    () => undefined,
  );
}

function initialiseWorld(THREE: ThreeModule, host: HTMLDivElement) {
  // Sampled once per scene. Crossing a tier boundary tears the world down and rebuilds
  // it (see onTierChange), so this is re-read rather than going stale.
  const budget = worldBudget();

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  camera.position.set(0, 0, 8.4);

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: budget.antialias,
    powerPreference: budget.powerPreference,
    premultipliedAlpha: true,
  });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, budget.pixelRatio));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  renderer.domElement.className = 'home-effects-world__canvas';
  renderer.domElement.setAttribute('aria-hidden', 'true');
  host.appendChild(renderer.domElement);

  const world = new THREE.Group();
  scene.add(world);

  scene.add(new THREE.AmbientLight(0xffffff, 1.2));
  const keyLight = new THREE.DirectionalLight(0xb8f07c, 3.4);
  keyLight.position.set(4, 5, 7);
  scene.add(keyLight);
  const rimLight = new THREE.PointLight(0xa73593, 18, 16, 2);
  rimLight.position.set(-4, -2, 4);
  scene.add(rimLight);

  const core = new THREE.Group();
  world.add(core);

  const globeGeometry = new THREE.IcosahedronGeometry(1.22, 3);
  const globeMaterial = new THREE.MeshStandardMaterial({
    color: 0x160933,
    emissive: 0x250b42,
    emissiveIntensity: 1.05,
    metalness: 0.48,
    roughness: 0.28,
    transparent: true,
    opacity: 0.94,
  });
  const globe = new THREE.Mesh(globeGeometry, globeMaterial);
  core.add(globe);

  const wireMaterial = new THREE.LineBasicMaterial({
    color: 0xb8f07c,
    transparent: true,
    opacity: 0.46,
  });
  const wireframe = new THREE.LineSegments(new THREE.WireframeGeometry(globeGeometry), wireMaterial);
  wireframe.scale.setScalar(1.012);
  core.add(wireframe);

  const random = createSeededRandom();
  const particleCount = budget.particles;
  const particlePositions = new Float32Array(particleCount * 3);
  for (let index = 0; index < particleCount; index += 1) {
    const radius = 2.2 + random() * 3.8;
    const theta = random() * Math.PI * 2;
    const phi = Math.acos(2 * random() - 1);
    particlePositions[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
    particlePositions[index * 3 + 1] = radius * Math.cos(phi) * 0.7;
    particlePositions[index * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta) * 0.65;
  }
  const particleGeometry = new THREE.BufferGeometry();
  particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
  const particleMaterial = new THREE.PointsMaterial({
    color: 0xb8f07c,
    size: 0.022,
    transparent: true,
    opacity: 0.48,
    depthWrite: false,
    sizeAttenuation: true,
  });
  const particles = new THREE.Points(particleGeometry, particleMaterial);
  world.add(particles);

  const ringAMaterial = new THREE.MeshBasicMaterial({
    color: 0xb8f07c,
    transparent: true,
    opacity: 0.42,
    depthWrite: false,
  });
  const ringA = new THREE.Mesh(new THREE.TorusGeometry(1.66, 0.012, 5, 128), ringAMaterial);
  ringA.rotation.set(1.08, 0.18, 0.28);
  core.add(ringA);
  const ringBMaterial = ringAMaterial.clone();
  const ringB = new THREE.Mesh(new THREE.TorusGeometry(1.9, 0.008, 5, 128), ringBMaterial);
  ringB.rotation.set(0.38, 1.14, -0.42);
  core.add(ringB);

  const routeCurve = new THREE.CubicBezierCurve3(
    new THREE.Vector3(-1.34, -0.24, 0.72),
    new THREE.Vector3(-0.55, 1.65, 1.25),
    new THREE.Vector3(0.86, 1.5, 0.92),
    new THREE.Vector3(1.35, 0.15, 0.58),
  );
  const routeMaterial = new THREE.MeshBasicMaterial({
    color: 0xb8f07c,
    transparent: true,
    opacity: 0.92,
    depthWrite: false,
  });
  const route = new THREE.Mesh(
    new THREE.TubeGeometry(routeCurve, 72, 0.018, 7, false),
    routeMaterial,
  );
  core.add(route);
  const tracerMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 1,
    depthWrite: false,
  });
  const tracer = new THREE.Mesh(
    new THREE.SphereGeometry(0.065, 14, 14),
    tracerMaterial,
  );
  core.add(tracer);

  const mapGroup = new THREE.Group();
  mapGroup.position.set(-2.35, 0.1, -0.15);
  world.add(mapGroup);
  let disposed = false;
  let invalidateWorld: () => void = () => undefined;
  let mapMaterial: ShaderMaterial | null = null;
  const loader = new THREE.TextureLoader();
  const maxAnisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 4);
  loader.load(
    '/effects/new-zealand-map-clker.png',
    (texture) => {
      if (disposed) {
        texture.dispose();
        return;
      }
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = maxAnisotropy;
      mapMaterial = new THREE.ShaderMaterial({
        uniforms: {
          uMap: { value: texture },
          uLime: { value: new THREE.Color(0xb8f07c) },
          uPlum: { value: new THREE.Color(0x9e3b9a) },
          uOpacity: { value: 0 },
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform sampler2D uMap;
          uniform vec3 uLime;
          uniform vec3 uPlum;
          uniform float uOpacity;
          varying vec2 vUv;
          void main() {
            vec4 sampleColor = texture2D(uMap, vUv);
            float mask = sampleColor.a;
            vec3 tint = mix(uPlum, uLime, smoothstep(0.08, 0.92, vUv.y));
            gl_FragColor = vec4(tint, mask * uOpacity);
          }
        `,
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
      });
      const map = new THREE.Mesh(new THREE.PlaneGeometry(2.32, 2.62), mapMaterial);
      map.renderOrder = 2;
      mapGroup.add(map);
      invalidateWorld();
    },
    undefined,
    () => undefined,
  );

  const photoPlanes: PhotoPlane[] = [];
  PHOTO_TEXTURES.forEach((config) => {
    addPhotoPlane(
      THREE,
      world,
      loader,
      config,
      photoPlanes,
      maxAnisotropy,
      () => disposed,
      () => invalidateWorld(),
    );
  });

  let chapterStops: number[] = [];
  let frameId = 0;
  let currentPhase = 0;
  let targetPointerX = 0;
  let targetPointerY = 0;
  let pointerX = 0;
  let pointerY = 0;
  let activeUntil = performance.now() + 2800;
  const startedAt = performance.now();
  let lastWidth = 0;
  let lastHeight = 0;
  let contextLost = false;

  const updateChapterStops = () => {
    chapterStops = CHAPTER_SELECTORS.map((selector) => {
      const element = document.querySelector<HTMLElement>(selector);
      return element ? element.getBoundingClientRect().top + window.scrollY : 0;
    });
  };

  const resize = () => {
    const width = Math.max(1, window.innerWidth);
    const height = Math.max(1, window.innerHeight);
    if (width === lastWidth && height === lastHeight) return;
    lastWidth = width;
    lastHeight = height;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    updateChapterStops();
    activeUntil = performance.now() + 650;
  };

  const schedule = (duration = 700) => {
    activeUntil = Math.max(activeUntil, performance.now() + duration);
    if (!frameId && !document.hidden && !disposed && !contextLost) {
      frameId = requestAnimationFrame(render);
    }
  };
  invalidateWorld = () => schedule(450);

  const onScroll = () => schedule(760);
  const onResize = () => {
    resize();
    schedule(900);
  };
  const onPointerMove = (event: PointerEvent) => {
    targetPointerX = clamp((event.clientX / Math.max(1, window.innerWidth)) * 2 - 1, -1, 1);
    targetPointerY = clamp((event.clientY / Math.max(1, window.innerHeight)) * 2 - 1, -1, 1);
    schedule(500);
  };
  const onVisibilityChange = () => {
    if (!document.hidden) schedule(900);
  };

  function render(now: number) {
    frameId = 0;
    if (disposed || document.hidden || contextLost) return;
    resize();

    const focusY = window.scrollY + window.innerHeight * 0.46;
    const targetPhase = getWorldPhase(chapterStops, focusY);
    currentPhase += (targetPhase - currentPhase) * 0.085;
    pointerX += (targetPointerX - pointerX) * 0.09;
    pointerY += (targetPointerY - pointerY) * 0.09;

    const low = Math.min(WORLD_KEYFRAMES.length - 1, Math.floor(currentPhase));
    const high = Math.min(WORLD_KEYFRAMES.length - 1, low + 1);
    const local = smooth(currentPhase - low);
    const from = WORLD_KEYFRAMES[low];
    const to = WORLD_KEYFRAMES[high];
    const intro = smooth((now - startedAt) / 2200);

    world.position.set(
      mix(from.position[0], to.position[0], local),
      mix(from.position[1], to.position[1], local),
      mix(from.position[2], to.position[2], local),
    );
    world.rotation.set(
      mix(from.rotation[0], to.rotation[0], local) - pointerY * 0.045,
      mix(from.rotation[1], to.rotation[1], local) + pointerX * 0.06 + (1 - intro) * -0.7,
      mix(from.rotation[2], to.rotation[2], local),
    );
    world.scale.setScalar(mix(from.scale, to.scale, local) * mix(0.84, 1, intro));

    core.rotation.y = currentPhase * 0.18 + pointerX * 0.08;
    core.rotation.x = pointerY * -0.06;
    particles.rotation.y = currentPhase * -0.11 + pointerX * 0.025;
    particles.rotation.x = currentPhase * 0.025;
    tracer.position.copy(routeCurve.getPoint(clamp((currentPhase % 1) * 0.92 + 0.04)));

    const mapPresence = clamp(1 - Math.abs(currentPhase - 2.1) / 1.15);
    mapGroup.position.x = -2.35 + (currentPhase - 2.1) * -0.28;
    mapGroup.rotation.set(-0.12 + pointerY * 0.03, 0.28 + (currentPhase - 2.1) * 0.22, -0.08);
    mapGroup.scale.setScalar(0.82 + mapPresence * 0.18);
    if (mapMaterial) mapMaterial.uniforms.uOpacity.value = mapPresence * 0.88;

    photoPlanes.forEach((photo) => {
      const distance = currentPhase - photo.chapter;
      const presence = clamp(1 - Math.abs(distance) / 1.05);
      photo.material.opacity = presence * 0.76;
      photo.frame.opacity = presence * 0.62;
      photo.group.position.set(photo.x + distance * 0.62, photo.y + distance * -0.18, -0.42 - Math.abs(distance) * 0.2);
      photo.group.rotation.set(-0.08 + pointerY * 0.035, photo.turn + distance * -0.18 + pointerX * 0.04, photo.turn * 0.32);
      photo.group.scale.setScalar(0.86 + presence * 0.14);
    });

    const chapterCoreVisibility = mix(
      CORE_VISIBILITY_KEYFRAMES[low],
      CORE_VISIBILITY_KEYFRAMES[high],
      local,
    );
    const corePulse = clamp(0.52 + Math.abs(Math.sin(currentPhase * 0.72)) * 0.48);
    globeMaterial.opacity = (0.66 + corePulse * 0.28) * chapterCoreVisibility;
    wireMaterial.opacity = (0.25 + corePulse * 0.28) * chapterCoreVisibility;
    particleMaterial.opacity = (0.22 + corePulse * 0.28) * chapterCoreVisibility;
    ringAMaterial.opacity = 0.42 * chapterCoreVisibility;
    ringBMaterial.opacity = 0.42 * chapterCoreVisibility;
    routeMaterial.opacity = 0.92 * chapterCoreVisibility;
    tracerMaterial.opacity = chapterCoreVisibility;

    renderer.render(scene, camera);

    const unsettled =
      Math.abs(targetPhase - currentPhase) > 0.002 ||
      Math.abs(targetPointerX - pointerX) > 0.002 ||
      Math.abs(targetPointerY - pointerY) > 0.002;
    if (now < activeUntil || unsettled) frameId = requestAnimationFrame(render);
  }

  resize();
  updateChapterStops();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize, { passive: true });
  window.addEventListener('pointermove', onPointerMove, { passive: true });
  document.addEventListener('visibilitychange', onVisibilityChange);
  window.addEventListener('load', updateChapterStops, { once: true });
  schedule(2800);

  const onContextLost = (event: Event) => {
    event.preventDefault();
    contextLost = true;
    if (frameId) cancelAnimationFrame(frameId);
    frameId = 0;
    host.dataset.contextLost = 'true';
  };
  const onContextRestored = () => {
    contextLost = false;
    delete host.dataset.contextLost;
    schedule(1200);
  };
  renderer.domElement.addEventListener('webglcontextlost', onContextLost);
  renderer.domElement.addEventListener('webglcontextrestored', onContextRestored);

  return () => {
    disposed = true;
    if (frameId) cancelAnimationFrame(frameId);
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onResize);
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('load', updateChapterStops);
    document.removeEventListener('visibilitychange', onVisibilityChange);
    renderer.domElement.removeEventListener('webglcontextlost', onContextLost);
    renderer.domElement.removeEventListener('webglcontextrestored', onContextRestored);
    delete host.dataset.contextLost;
    disposeObject(scene);
    renderer.dispose();
    renderer.forceContextLoss();
    renderer.domElement.remove();
  };
}

export default function EffectsWorld() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<WorldStatus>('idle');

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;

    // Width no longer decides whether the world runs, only which budget it runs at.
    // These are watched so crossing a boundary rebuilds the scene at the right tier.
    const tierQueries = [
      window.matchMedia(`(min-width: ${WORLD_DESKTOP_MIN_WIDTH}px)`),
      window.matchMedia(`(min-width: ${WORLD_TABLET_MIN_WIDTH}px)`),
    ];
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const reducedTransparency = window.matchMedia('(prefers-reduced-transparency: reduce)');
    const forcedColors = window.matchMedia('(forced-colors: active)');
    const navigatorWithHints = navigator as Navigator & {
      deviceMemory?: number;
      connection?: { saveData?: boolean };
    };
    const constrainedDevice =
      navigatorWithHints.connection?.saveData === true ||
      (navigatorWithHints.deviceMemory !== undefined && navigatorWithHints.deviceMemory < 4);

    if (constrainedDevice) {
      setStatus('fallback');
      return undefined;
    }

    let cancelled = false;
    let loadToken = 0;
    let loading = false;
    let destroyWorld: (() => void) | undefined;
    let idleId: number | undefined;
    let timeoutId: number | undefined;

    const clearScheduledStart = () => {
      if (idleId !== undefined && 'cancelIdleCallback' in window) window.cancelIdleCallback(idleId);
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
      idleId = undefined;
      timeoutId = undefined;
    };

    const eligible = () =>
      !reducedMotion.matches && !reducedTransparency.matches && !forcedColors.matches;

    const stop = (nextStatus: WorldStatus = 'fallback') => {
      loadToken += 1;
      loading = false;
      clearScheduledStart();
      destroyWorld?.();
      destroyWorld = undefined;
      if (!cancelled) setStatus(nextStatus);
    };

    const start = async () => {
      idleId = undefined;
      timeoutId = undefined;
      if (cancelled || loading || destroyWorld || !eligible()) return;
      const token = ++loadToken;
      loading = true;
      setStatus('loading');
      try {
        const THREE = await import('three');
        if (cancelled || token !== loadToken || !eligible() || !host.isConnected) return;
        destroyWorld = initialiseWorld(THREE, host);
        setStatus('ready');
      } catch {
        if (!cancelled && token === loadToken) setStatus('fallback');
      } finally {
        if (token === loadToken) loading = false;
      }
    };

    const scheduleStart = () => {
      if (!eligible()) {
        stop();
        return;
      }
      if (loading || destroyWorld || idleId !== undefined || timeoutId !== undefined) return;
      setStatus('idle');
      if ('requestIdleCallback' in window) {
        idleId = window.requestIdleCallback(() => void start(), { timeout: 1400 });
      } else {
        timeoutId = window.setTimeout(() => void start(), 420);
      }
    };

    const onModeChange = () => {
      if (eligible()) scheduleStart();
      else stop();
    };

    // A tier change needs a genuine rebuild: pixel ratio, antialiasing and particle
    // count are all fixed at construction, so scheduleStart() alone would no-op.
    const onTierChange = () => {
      if (!eligible()) {
        stop();
        return;
      }
      stop('idle');
      scheduleStart();
    };

    tierQueries.forEach((query) => query.addEventListener('change', onTierChange));
    reducedMotion.addEventListener('change', onModeChange);
    reducedTransparency.addEventListener('change', onModeChange);
    forcedColors.addEventListener('change', onModeChange);
    scheduleStart();

    return () => {
      cancelled = true;
      loadToken += 1;
      tierQueries.forEach((query) => query.removeEventListener('change', onTierChange));
      reducedMotion.removeEventListener('change', onModeChange);
      reducedTransparency.removeEventListener('change', onModeChange);
      forcedColors.removeEventListener('change', onModeChange);
      clearScheduledStart();
      destroyWorld?.();
    };
  }, []);

  return (
    <div
      ref={hostRef}
      className="home-effects-world"
      data-status={status}
      aria-hidden="true"
    >
      <div className="home-effects-world__fallback">
        <img
          src="/effects/new-zealand-map-clker.png"
          alt=""
          width="1732"
          height="1920"
          fetchPriority="high"
        />
        <span className="home-effects-world__fallback-orbit" />
        <span className="home-effects-world__fallback-node" />
      </div>
    </div>
  );
}
