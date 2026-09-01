import { useEffect, useRef } from 'react';

interface MedicalNetworkCanvasProps {
  className?: string;
}

export default function MedicalNetworkCanvas({ className = '' }: MedicalNetworkCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 900);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Nodes for medical supply molecular network
    const NODE_COUNT = 48;
    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseRadius: number;
      color: string;
      pulseSpeed: number;
      pulsePhase: number;
      isHighlighted: boolean;
    }

    const nodes: Node[] = [];
    const colors = [
      'rgba(0, 88, 188, 0.45)',
      'rgba(0, 112, 235, 0.35)',
      'rgba(173, 198, 255, 0.65)',
      'rgba(0, 107, 39, 0.35)',
      'rgba(80, 120, 190, 0.4)'
    ];

    for (let i = 0; i < NODE_COUNT; i++) {
      const isHighlighted = i % 7 === 0;
      const baseRadius = isHighlighted ? Math.random() * 4 + 4 : Math.random() * 3 + 2;
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: baseRadius,
        baseRadius,
        color: isHighlighted ? 'rgba(0, 88, 188, 0.75)' : colors[Math.floor(Math.random() * colors.length)],
        pulseSpeed: 0.02 + Math.random() * 0.03,
        pulsePhase: Math.random() * Math.PI * 2,
        isHighlighted
      });
    }

    // Interactive mouse tracking
    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Subtle atmospheric gradient
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, 'rgba(244, 247, 253, 0.92)');
      bgGrad.addColorStop(0.5, 'rgba(235, 242, 252, 0.85)');
      bgGrad.addColorStop(1, 'rgba(224, 235, 250, 0.95)');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Floating large soft bokeh spheres (for optical depth)
      const bokehSpheres = [
        { x: width * 0.25, y: height * 0.25, r: 160, color: 'rgba(0, 88, 188, 0.06)' },
        { x: width * 0.75, y: height * 0.4, r: 220, color: 'rgba(0, 112, 235, 0.05)' },
        { x: width * 0.4, y: height * 0.8, r: 190, color: 'rgba(173, 198, 255, 0.08)' }
      ];

      bokehSpheres.forEach(b => {
        const bgk = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        bgk.addColorStop(0, b.color);
        bgk.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = bgk;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Update and draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.x += node.vx;
        node.y += node.vy;

        // Bounce from edges
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Mouse gentle repulsion / pull
        const dxMouse = mouseX - node.x;
        const dyMouse = mouseY - node.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < 120 && distMouse > 0) {
          node.x -= (dxMouse / distMouse) * 0.8;
          node.y -= (dyMouse / distMouse) * 0.8;
        }

        // Pulse calculation
        node.pulsePhase += node.pulseSpeed;
        const currentRadius = node.baseRadius + Math.sin(node.pulsePhase) * 1.2;

        // Draw connections to nearby nodes (molecular lattice)
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dx = other.x - node.x;
          const dy = other.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const maxDist = 135;
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.35;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(0, 88, 188, ${alpha})`;
            ctx.lineWidth = dist < 70 ? 1.5 : 0.8;
            ctx.stroke();

            // Small traveling light pulse on some active connections
            if ((i + j) % 5 === 0) {
              const pulsePos = (Math.sin(time * 1.5 + i) + 1) / 2;
              const px = node.x + dx * pulsePos;
              const py = node.y + dy * pulsePos;
              ctx.beginPath();
              ctx.arc(px, py, 1.8, 0, Math.PI * 2);
              ctx.fillStyle = 'rgba(0, 112, 235, 0.8)';
              ctx.fill();
            }
          }
        }

        // Draw outer glow for highlighted nodes
        if (node.isHighlighted) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, currentRadius * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(0, 88, 188, 0.12)';
          ctx.fill();
        }

        // Draw the node itself
        ctx.beginPath();
        ctx.arc(node.x, node.y, Math.max(1, currentRadius), 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();

        // White core highlight for realistic 3D cell/molecule look
        ctx.beginPath();
        ctx.arc(node.x - currentRadius * 0.3, node.y - currentRadius * 0.3, currentRadius * 0.35, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="medical-network-canvas"
      className={`absolute inset-0 w-full h-full pointer-events-auto ${className}`}
    />
  );
}
