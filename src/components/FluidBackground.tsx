"use client";

import { useEffect, useRef } from "react";

// ---------------------------------------------------------------------------
// Shaders
// ---------------------------------------------------------------------------

const VERT = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

// Three-layer simplex noise fluid — indigo palette, radial vignette,
// slow organic drift driven by sin/cos of time.
const FRAG = `
precision highp float;

uniform float u_time;
uniform vec2 u_resolution;

/* ---- simplex 2-D noise (Ashima Arts) ---- */
vec3 mod289(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

float snoise(vec2 v) {
  const vec4 C = vec4(
    0.211324865405187, 0.366025403784439,
    -0.577350269189626, 0.024390243902439
  );
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                            + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
                           dot(x12.zw,x12.zw)), 0.0);
  m = m*m;
  m = m*m;
  vec3 x_ = 2.0 * fract(p * C.www) - 1.0;
  vec3 h  = abs(x_) - 0.5;
  vec3 ox = floor(x_ + 0.5);
  vec3 a0 = x_ - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  float aspect = u_resolution.x / u_resolution.y;
  vec2 p = (uv - 0.5) * vec2(aspect, 1.0);

  float t = u_time * 0.24;
  vec2 driftA = vec2(cos(t * 0.9), sin(t * 0.7));
  vec2 driftB = vec2(-sin(t * 0.6), cos(t * 0.8));

  vec2 warp = vec2(
    snoise(p * 1.05 + driftA * 0.75 + vec2(4.2, 1.3)),
    snoise(p * 1.05 - driftB * 0.65 + vec2(-2.8, 3.7))
  );

  vec2 fluid = p + warp * 0.24;

  float n1 = snoise(fluid * 1.55 + vec2(t * 0.55, -t * 0.35));
  float n2 = snoise((fluid + warp * 0.38) * 2.65 - vec2(t * 0.30, t * 0.50));
  float n3 = snoise((fluid - warp * 0.28) * 4.05 + vec2(-t * 0.62, t * 0.42));

  float noise = n1 * 0.52 + n2 * 0.32 + n3 * 0.16;
  noise = smoothstep(-0.22, 0.66, noise);

  /* colour palette — brighter indigo family */
  vec3 indigo = vec3(0.584, 0.635, 0.992);   // lifted indigo glow
  vec3 blue   = vec3(0.314, 0.556, 0.992);   // cool blue support
  vec3 violet = vec3(0.475, 0.412, 0.988);   // restrained violet shift
  vec3 dark   = vec3(0.035, 0.035, 0.067);   // near-black

  float centerGlow = smoothstep(1.25, 0.12, length(p * vec2(0.92, 1.05)));
  vec3 accent = mix(indigo, blue, n2*0.5+0.5);
  accent = mix(accent, violet, n3*0.2 + 0.25);
  vec3 col = mix(dark, accent, noise * 0.74 + centerGlow * 0.16);

  /* soft edge fade — keep the center readable, darken only the far edges */
  float edgeX = smoothstep(0.01, 0.13, uv.x) * smoothstep(0.01, 0.13, 1.0 - uv.x);
  float edgeY = smoothstep(0.01, 0.13, uv.y) * smoothstep(0.01, 0.13, 1.0 - uv.y);
  float edge = max(edgeX * edgeY, 0.28);

  float alpha = clamp(noise * 0.44 + centerGlow * 0.10, 0.0, 0.54) * edge;

  gl_FragColor = vec4(col, alpha);
}
`;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function FluidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const TARGET_FPS = 36;
    const FRAME_INTERVAL = 1000 / TARGET_FPS;
    let lastFrameTime = 0;
    let resizeObserver: ResizeObserver | null = null;
    let intersectionObserver: IntersectionObserver | null = null;
    let isInView = true;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      premultipliedAlpha: false,
      antialias: false,
      powerPreference: "low-power",
    });
    if (!gl) return; // graceful fallback — hero still works without it

    // ---- compile shaders ----
    function compile(type: number, src: string) {
      const s = gl!.createShader(type)!;
      gl!.shaderSource(s, src);
      gl!.compileShader(s);
      if (!gl!.getShaderParameter(s, gl!.COMPILE_STATUS)) {
        gl!.deleteShader(s);
        return null;
      }
      return s;
    }

    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;

    gl.useProgram(prog);

    // ---- full-screen quad ----
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );
    const aPos = gl.getAttribLocation(prog, "a_position");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, "u_time");
    const uRes = gl.getUniformLocation(prog, "u_resolution");

    // ---- sizing (render below full DPR — keeps the effect soft and saves GPU) ----
    function resize() {
      const dpr = Math.min(window.devicePixelRatio, 2) * 0.65;
      canvas!.width = Math.max(1, Math.floor(canvas!.clientWidth * dpr));
      canvas!.height = Math.max(1, Math.floor(canvas!.clientHeight * dpr));
      gl!.viewport(0, 0, canvas!.width, canvas!.height);
    }
    resize();
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(canvas);
    } else {
      window.addEventListener("resize", resize);
    }

    // ---- blending ----
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0, 0, 0, 0);

    function stopLoop() {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = 0;
      }
    }

    function shouldRender() {
      return !document.hidden && isInView;
    }

    // ---- render loop ----
    const t0 = performance.now();
    function draw(now: number) {
      frameRef.current = 0;
      if (!shouldRender()) return;

      if (lastFrameTime && now - lastFrameTime < FRAME_INTERVAL) {
        frameRef.current = requestAnimationFrame(draw);
        return;
      }

      lastFrameTime = now;
      gl!.clear(gl!.COLOR_BUFFER_BIT);
      gl!.uniform1f(uTime, (performance.now() - t0) / 1000);
      gl!.uniform2f(uRes, canvas!.width, canvas!.height);
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
      frameRef.current = requestAnimationFrame(draw);
    }

    function startLoop() {
      if (!frameRef.current && shouldRender()) {
        frameRef.current = requestAnimationFrame(draw);
      }
    }

    function handleVisibilityChange() {
      if (shouldRender()) {
        startLoop();
      } else {
        stopLoop();
      }
    }

    if (typeof IntersectionObserver !== "undefined") {
      intersectionObserver = new IntersectionObserver(
        ([entry]) => {
          isInView = entry?.isIntersecting ?? false;
          handleVisibilityChange();
        },
        { threshold: 0.08 }
      );
      intersectionObserver.observe(canvas);
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);
    startLoop();

    // ---- cleanup ----
    return () => {
      stopLoop();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      intersectionObserver?.disconnect();
      resizeObserver?.disconnect();
      if (!resizeObserver) {
        window.removeEventListener("resize", resize);
      }
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
