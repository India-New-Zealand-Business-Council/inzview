import React, { useCallback, useEffect, useRef } from 'react';
import './ClickSpark.css';

type Spark = {
  x: number;
  y: number;
  startedAt: number;
};

type ClickSparkProps = Readonly<{
  children: React.ReactNode;
}>;

const SPARK_DURATION = 420;
const SPARK_COUNT = 8;

export default function ClickSpark({ children }: ClickSparkProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<Spark[]>([]);
  const frameRef = useRef(0);
  const reducedMotionRef = useRef(false);

  const draw = useCallback((now: number) => {
    frameRef.current = 0;
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
    sparksRef.current = sparksRef.current.filter((spark) => {
      const progress = Math.min(1, (now - spark.startedAt) / SPARK_DURATION);
      if (progress >= 1) return false;
      const eased = 1 - (1 - progress) ** 3;

      for (let index = 0; index < SPARK_COUNT; index += 1) {
        const angle = (Math.PI * 2 * index) / SPARK_COUNT;
        const distance = eased * 24;
        const length = 8 * (1 - eased);
        const x = spark.x + Math.cos(angle) * distance;
        const y = spark.y + Math.sin(angle) * distance;
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(x + Math.cos(angle) * length, y + Math.sin(angle) * length);
        context.strokeStyle = index % 2 === 0 ? '#b8f07c' : '#a73593';
        context.lineWidth = 1.7;
        context.stroke();
      }
      return true;
    });

    if (sparksRef.current.length) frameRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const syncMotion = () => {
      reducedMotionRef.current = motionQuery.matches || !finePointerQuery.matches;
      if (reducedMotionRef.current) {
        sparksRef.current = [];
        if (frameRef.current) cancelAnimationFrame(frameRef.current);
        frameRef.current = 0;
        canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);
      }
    };
    const resize = () => {
      const viewportPixels = Math.max(1, window.innerWidth * window.innerHeight);
      const ratio = Math.min(1, Math.sqrt(4_000_000 / viewportPixels));
      canvas.width = Math.max(1, Math.round(window.innerWidth * ratio));
      canvas.height = Math.max(1, Math.round(window.innerHeight * ratio));
      canvas.getContext('2d')?.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    syncMotion();
    resize();
    window.addEventListener('resize', resize, { passive: true });
    motionQuery.addEventListener('change', syncMotion);
    finePointerQuery.addEventListener('change', syncMotion);
    return () => {
      window.removeEventListener('resize', resize);
      motionQuery.removeEventListener('change', syncMotion);
      finePointerQuery.removeEventListener('change', syncMotion);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotionRef.current || event.detail === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    sparksRef.current.push({
      x: event.clientX,
      y: event.clientY,
      startedAt: performance.now(),
    });
    if (!frameRef.current) frameRef.current = requestAnimationFrame(draw);
  };

  return (
    <div ref={rootRef} className="home-click-spark" onClick={onClick}>
      <canvas ref={canvasRef} className="home-click-spark__canvas" aria-hidden="true" />
      {children}
    </div>
  );
}
