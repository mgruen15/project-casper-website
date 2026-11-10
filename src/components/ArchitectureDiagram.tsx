import { useReducedMotion } from "framer-motion";
import { aws } from "@/content";

type BoxProps = {
  n: number;
  x: number;
  y: number;
  w: number;
  h?: number;
  title: string;
  lines: string[];
  loop?: boolean;
};

function Box({ n, x, y, w, h = 96, title, lines, loop }: BoxProps) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="14"
        fill="#0f0f18"
        stroke={loop ? "#e879f9" : "#7c6bd6"}
        strokeOpacity={loop ? 0.8 : 0.55}
        strokeWidth="1.25"
      />
      <circle cx={x + 19} cy={y + 24} r="10.5" fill="url(#node-badge)" />
      <text x={x + 19} y={y + 28.5} textAnchor="middle" fill="#fff" fontSize="12" fontWeight="700">
        {n}
      </text>
      <text x={x + 37} y={y + 29} fill="#f4f3f8" fontSize="15" fontWeight="700" style={{ fontFamily: "var(--font-display)" }}>
        {title}
      </text>
      {lines.map((l, i) => (
        <text key={l} x={x + 19} y={y + 54 + i * 19} fill="#b8b6ca" fontSize="13">
          {l}
        </text>
      ))}
    </g>
  );
}

const workerYs = [112, 232, 352, 472];

export function ArchitectureDiagram() {
  const reduce = useReducedMotion();
  const flow = reduce ? "" : "animate-flow";
  const edge = { fill: "none", stroke: "#a78bfa", strokeOpacity: 0.85, strokeWidth: 1.75, strokeDasharray: "6 6", markerEnd: "url(#arrow)" } as const;

  return (
    <div
      className="hide-scrollbar overflow-x-auto rounded-3xl border border-white/10 bg-surface/80"
      tabIndex={0}
      role="region"
      aria-label="Architecture diagram, scrollable"
    >
      <svg
        viewBox="0 0 1280 770"
        className="block h-auto min-w-[980px] w-full"
        role="img"
        aria-label={aws.architecture.diagramLabel}
      >
        <defs>
          <linearGradient id="node-badge" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#7c3aed" />
            <stop offset="1" stopColor="#c026d3" />
          </linearGradient>
          <marker id="arrow" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0L10 5L0 10z" fill="#a78bfa" />
          </marker>
          <marker id="arrow-loop" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0L10 5L0 10z" fill="#f0abfc" />
          </marker>
        </defs>

        {/* groups */}
        <rect x="696" y="66" width="300" height="520" rx="22" fill="#7c3aed" fillOpacity="0.05" stroke="#8b5cf6" strokeOpacity="0.35" strokeDasharray="5 6" />
        <text x="714" y="92" fill="#c4b5fd" fontSize="12" fontWeight="700" letterSpacing="2">
          PARALLEL WORKERS
        </text>
        <rect x="380" y="600" width="870" height="156" rx="22" fill="#c026d3" fillOpacity="0.04" stroke="#d946ef" strokeOpacity="0.3" strokeDasharray="5 6" />
        <text x="398" y="624" fill="#f0abfc" fontSize="12" fontWeight="700" letterSpacing="2">
          PUBLISH AND LEARN
        </text>

        {/* edges */}
        <g className={flow}>
          <path d="M200 340 H250" {...edge} />
          <path d="M420 340 H470" {...edge} />
        </g>
        {workerYs.map((y) => {
          const cy = y + 48;
          const ty = 340 + (cy - 340) * 0.2;
          return (
            <g key={y} className={flow}>
              <path d={`M640 340 C 676 340, 676 ${cy}, 712 ${cy}`} {...edge} />
              <path d={`M980 ${cy} C 1010 ${cy}, 1010 ${ty}, 1040 ${ty}`} {...edge} />
            </g>
          );
        })}
        <g className={flow}>
          <path d="M1135 388 V432" {...edge} />
          <path d="M1135 528 V640" {...edge} />
          <path d="M1040 688 H980" {...edge} />
          <path d="M712 688 H650" {...edge} />
          <path
            d="M525 640 V388"
            {...edge}
            stroke="#f0abfc"
            markerEnd="url(#arrow-loop)"
          />
        </g>
        <text x="540" y="500" fill="#f0abfc" fontSize="13" fontWeight="600">
          Performance Loop
        </text>
        <text x="540" y="519" fill="#b8b6ca" fontSize="12.5">
          Signals shape
        </text>
        <text x="540" y="536" fill="#b8b6ca" fontSize="12.5">
          the next script
        </text>

        {/* nodes */}
        <Box n={1} x={30} y={292} w={170} title="Web app" lines={["Amazon CloudFront", "Amazon S3"]} />
        <Box n={2} x={250} y={292} w={170} title="API" lines={["Amazon API Gateway", "AWS Lambda"]} />
        <Box n={3} x={470} y={292} w={170} title="Orchestration" lines={["AWS Step Functions", "Parallel state"]} />

        <Box n={4} x={712} y={112} w={268} title="Amazon Bedrock" lines={["Script, image, video generation", "Guardrails"]} />
        <Box n={4} x={712} y={232} w={268} title="AWS Batch on EC2 GPU" lines={["Blender rendering", "Consistent 3D scenes"]} />
        <Box n={4} x={712} y={352} w={268} title="Amazon Polly and Transcribe" lines={["Voice and word by word captions"]} />
        <Box n={4} x={712} y={472} w={268} title="AWS Elemental MediaConvert" lines={["Final render and encoding"]} />

        <Box n={5} x={1040} y={292} w={190} title="Amazon S3" lines={["Assets and renders"]} />
        <Box n={6} x={1040} y={432} w={190} title="Amazon DynamoDB" lines={["Episode metadata"]} />

        <Box n={7} x={1040} y={640} w={190} title="Publish queue" lines={["Amazon EventBridge", "Amazon SQS"]} />
        <Box n={8} x={712} y={640} w={268} title="Platform APIs" lines={["Instagram and TikTok", "YouTube and Snapchat"]} />
        <Box n={9} x={400} y={640} w={250} title="Analytics" lines={["Amazon DynamoDB", "Amazon Athena"]} loop />
      </svg>
    </div>
  );
}
