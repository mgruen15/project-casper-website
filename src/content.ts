/**
 * All editable copy lives in this file.
 * Brand name, tagline and contact email come from src/config.ts.
 *
 * Copy rules: short sentences, no hyphens as punctuation, no invented statistics,
 * no fake logos, quotes or press. Real data goes into the [bracketed] placeholders.
 */
import { BRAND_NAME, CONTACT_EMAIL, TAGLINE } from "./config";

export { BRAND_NAME, CONTACT_EMAIL, TAGLINE };

export const PLATFORMS = ["Instagram Reels", "TikTok", "YouTube Shorts", "Snapchat"] as const;

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export type NavLink = { label: string; to: string; hash?: string };

export const nav = {
  links: [
    { label: "How it works", to: "/", hash: "how-it-works" },
    { label: "Formats", to: "/", hash: "formats" },
    { label: "Built on AWS", to: "/aws" },
    { label: "Roadmap", to: "/", hash: "roadmap" },
    { label: "Team", to: "/", hash: "team" },
  ] satisfies NavLink[],
  cta: { label: "Join the pilot", to: "/", hash: "join" } satisfies NavLink,
  menuOpen: "Open menu",
  menuClose: "Close menu",
};

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

export const hero = {
  eyebrow: "AI production pipeline for vertical microdramas",
  headline: "From prompt to post.",
  subline: `${BRAND_NAME} turns a story premise into a finished microdrama episode and publishes it to Instagram Reels, TikTok, YouTube Shorts and Snapchat, then learns from every view.`,
  primary: { label: "Join the pilot", to: "/", hash: "join" } satisfies NavLink,
  secondary: { label: "See the pipeline", to: "/", hash: "how-it-works" } satisfies NavLink,
  platformsLabel: "Publishes to",
  phoneLabel: "Animated preview of a sample microdrama episode with an A or B choice overlay",
};

/** Scenes cycled inside the hero phone mockup. Purely illustrative. */
export type SceneKind = "cabin" | "seat" | "choice" | "rewind";
export type Scene = {
  kind: SceneKind;
  /** Caption words are revealed one by one, like word level captions. */
  caption: string;
  timecode: string;
  duration: number; // ms
};

export const heroScenes: Scene[] = [
  { kind: "cabin", caption: "02:47. Flight 214. Row 14 is empty.", timecode: "0:02", duration: 3200 },
  { kind: "seat", caption: "So why can you hear someone breathing?", timecode: "0:11", duration: 3400 },
  { kind: "choice", caption: "What do you do?", timecode: "0:34", duration: 4800 },
  { kind: "rewind", caption: "Let's rewind.", timecode: "0:35", duration: 2800 },
];

export const phoneChoice = {
  prompt: "What do you do?",
  a: { key: "A", label: "Check the seat" },
  b: { key: "B", label: "Wake the crew" },
  hint: "Vote in the comments. Next episode plays the winner.",
};

/* ------------------------------------------------------------------ */
/* Problem                                                             */
/* ------------------------------------------------------------------ */

export const problem = {
  id: "problem",
  eyebrow: "The problem",
  title: "Microdramas are booming. Production has not kept up.",
  cards: [
    {
      icon: "clock",
      title: "Studio cost and time",
      body: "Microdramas are one of the fastest growing short video formats. But a single series takes a studio weeks and thousands of euros.",
    },
    {
      icon: "layers",
      title: "Four platforms, no rhythm",
      body: "Creators cannot publish consistently across Instagram, TikTok, YouTube Shorts and Snapchat. Reach drops when the schedule slips.",
    },
    {
      icon: "chart",
      title: "No learning loop",
      body: "Nobody systematically learns from audience data when writing the next episode. Every script starts from a guess.",
    },
  ],
};

/* ------------------------------------------------------------------ */
/* How it works                                                        */
/* ------------------------------------------------------------------ */

export type PipelineStep = {
  n: number;
  icon: "prompt" | "script" | "visuals" | "voice" | "render" | "publish";
  title: string;
  description: string;
  aws: string[];
};

export const pipeline = {
  id: "how-it-works",
  eyebrow: "How it works",
  title: "Six steps. One pipeline. Zero studio.",
  intro: "Each episode moves through the same automated flow. Every stage runs on AWS.",
  awsLabel: "Runs on",
  steps: [
    {
      n: 1,
      icon: "prompt",
      title: "Prompt and Format",
      description: "Type a story premise. Pick Interactive Choice Horror or Classic Cliffhanger Drama.",
      aws: ["Amazon API Gateway", "AWS Lambda"],
    },
    {
      n: 2,
      icon: "script",
      title: "Script and Choice Tree",
      description: "Large language models write the script, the hook and every A or B branch.",
      aws: ["Amazon Bedrock"],
    },
    {
      n: 3,
      icon: "visuals",
      title: "Visuals",
      description:
        "AI keyframes meet scripted 3D scenes rendered in Blender on GPU workers. Characters stay consistent. Cost stays low.",
      aws: ["Amazon Bedrock", "AWS Batch", "Amazon EC2 GPU"],
    },
    {
      n: 4,
      icon: "voice",
      title: "Voice and Captions",
      description: "Natural voices and word by word captions, timed to the frame.",
      aws: ["Amazon Polly", "Amazon Transcribe"],
    },
    {
      n: 5,
      icon: "render",
      title: "Edit and Render",
      description: "Clips, voice and captions are cut together and encoded for vertical delivery.",
      aws: ["AWS Elemental MediaConvert"],
    },
    {
      n: 6,
      icon: "publish",
      title: "Publish and Learn",
      description:
        "Posts go to four platforms. Performance data is collected and written back to improve the next script.",
      aws: ["Amazon EventBridge", "Amazon SQS", "Amazon DynamoDB"],
    },
  ] satisfies PipelineStep[],
  cta: { label: "Read the technical detail", to: "/aws" } satisfies NavLink,
};

/* ------------------------------------------------------------------ */
/* Demo simulator                                                      */
/* ------------------------------------------------------------------ */

export const demo = {
  id: "demo",
  eyebrow: "Interactive demo",
  badge: "Simulated demo",
  title: "Try the pipeline.",
  intro: "Type a premise and watch the six stages run. Everything below is mock data in your browser.",
  inputLabel: "Story premise",
  placeholder: "A night flight. A passenger who should not exist.",
  formatLabel: "Format",
  formats: [
    { value: "choice", label: "Choice Horror" },
    { value: "cliffhanger", label: "Cliffhanger Drama" },
  ],
  submit: "Generate episode",
  running: "Running pipeline",
  reset: "Try another premise",
  disclaimer: "Demo simulation, real pipeline in development",
  stages: [
    { label: "Prompt and Format", service: "API Gateway, Lambda" },
    { label: "Script and Choice Tree", service: "Amazon Bedrock" },
    { label: "Visuals", service: "Bedrock, AWS Batch" },
    { label: "Voice and Captions", service: "Polly, Transcribe" },
    { label: "Edit and Render", service: "MediaConvert" },
    { label: "Publish and Learn", service: "EventBridge, SQS" },
  ],
  storyboard: {
    heading: "Storyboard, episode 1",
    mockLabel: "Mock output",
    runtime: "Runtime 0:48",
    title: "The Passenger in 14C",
    logline: "A red eye flight. A seat that should be empty. A voice that knows your name.",
    frames: [
      { time: "0:00", tag: "Hook", caption: "Row 14 was empty at takeoff." },
      { time: "0:12", tag: "Build", caption: "Then the call light came on." },
      { time: "0:28", tag: "Turn", caption: "The seat belt was fastened." },
      { time: "0:44", tag: "Choice", caption: "Someone whispers your name." },
    ],
    choice: {
      heading: "Choice overlay at 0:44",
      prompt: "What do you do?",
      a: "Check the seat",
      b: "Wake the crew",
      note: "Viewers vote in the comments. The winning path plays next. The other path returns later with a “Let's rewind” twist.",
    },
    cliffhanger: {
      heading: "Cliffhanger at 0:46",
      line: "The seat belt light turns on. Row 14 is not empty anymore.",
      note: "Hook inside 2 seconds. The episode ends on an open question, so viewers come back for episode 2.",
    },
    publishLabel: "Ready to publish to",
    reviewNote: "MVP includes a human review step before publishing.",
  },
};

/* ------------------------------------------------------------------ */
/* Formats                                                             */
/* ------------------------------------------------------------------ */

export const formats = {
  id: "formats",
  eyebrow: "Formats",
  title: "Two formats built to be watched twice.",
  intro: "Both formats are designed around the signals platforms reward: comments, completion and replays.",
  cards: [
    {
      key: "choice",
      badge: "Interactive",
      title: "Interactive Choice Horror",
      body: "Viewers see an A or B choice as an on screen overlay and vote in the comments. The next video plays the chosen path. The other path comes back later with a “Let's rewind” twist.",
      drives: [
        "Comments: every viewer has a reason to vote.",
        "Watch time: people return to see their choice play out.",
        "Series loyalty: the rewind twist rewards the audience that voted the other way.",
      ],
      mock: "choice",
    },
    {
      key: "cliffhanger",
      badge: "Classic",
      title: "Classic Cliffhanger Drama",
      body: "A hook in the first 2 seconds and a cliffhanger at the end. Short, tight episodes of 30 to 90 seconds that make the next one impossible to skip.",
      drives: [
        "Completion: the hook keeps thumbs from scrolling away.",
        "Follows: an open ending turns viewers into subscribers.",
        "Shares: a strong last frame gives people something to send.",
      ],
      mock: "cliffhanger",
    },
  ],
  driversLabel: "Why it works",
};

/* ------------------------------------------------------------------ */
/* Performance loop                                                    */
/* ------------------------------------------------------------------ */

export const loop = {
  id: "performance-loop",
  eyebrow: "Performance Loop",
  title: "Every post teaches the next one.",
  intro: "Most creators guess. Here the series improves itself, one episode at a time.",
  steps: [
    { title: "Post", body: "Each episode goes live on four platforms on a steady schedule." },
    { title: "Measure", body: "The pipeline collects performance data from every post." },
    { title: "Learn", body: "Signals show which hooks, pacing and choices hold attention." },
    { title: "Rewrite", body: "Learnings are fed into the prompt for the next script." },
  ],
  signalsLabel: "Signals we learn from",
  signals: ["Retention", "Comments", "Shares", "Completion rate"],
  centerLabel: "Performance Loop",
};

/* ------------------------------------------------------------------ */
/* Business model                                                      */
/* ------------------------------------------------------------------ */

export const business = {
  id: "business",
  eyebrow: "Business model",
  title: "Three ways the series earns.",
  cards: [
    {
      icon: "megaphone",
      title: "Ad revenue",
      body: "Monetize owned channels through the creator programs and ad products of each platform.",
    },
    {
      icon: "unlock",
      title: "Paid continuation",
      body: "Viewers who want the next episode early can unlock it through a link to a platform.",
    },
    {
      icon: "package",
      title: "Product placement",
      body: "Brands appear inside episodes as part of the story, not as an interruption.",
    },
  ],
  b2b: {
    badge: "B2B",
    title: "White label pipeline",
    body: `Media companies and TMT brands run ${BRAND_NAME} under their own name. Same pipeline, their stories, their channels.`,
    cta: { label: "Talk to us", to: "/", hash: "join" } satisfies NavLink,
  },
};

/* ------------------------------------------------------------------ */
/* Responsible AI                                                      */
/* ------------------------------------------------------------------ */

export const responsible = {
  id: "responsible-ai",
  eyebrow: "Responsible AI",
  title: "Built to be trusted.",
  intro: "AI generated stories still need guardrails. These are part of the design from day one.",
  items: [
    {
      icon: "tag",
      title: "Clear labels",
      body: "AI generated content is labeled according to the rules of each platform.",
    },
    {
      icon: "shield",
      title: "Content moderation",
      body: "Amazon Bedrock Guardrails screen prompts and outputs before anything is rendered.",
    },
    {
      icon: "eye",
      title: "Human review",
      body: "In the MVP, a person approves every episode before it is published.",
    },
    {
      icon: "user",
      title: "No real faces",
      body: "We never use the likeness of real persons. Characters are fictional.",
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Roadmap                                                             */
/* ------------------------------------------------------------------ */

export const roadmap = {
  id: "roadmap",
  eyebrow: "Roadmap",
  title: "Where we are going.",
  note: "Dates are targets, not commitments.",
  targetLabel: "Target",
  phases: [
    {
      phase: "Phase 1",
      target: "Q1 2027",
      title: "MVP pipeline on AWS",
      body: "End to end pipeline with manual review and semi automatic publishing.",
    },
    {
      phase: "Phase 2",
      target: "Q2 2027",
      title: "Full automation",
      body: "Rendering and the publish queue run without manual steps.",
    },
    {
      phase: "Phase 3",
      target: "Q3 2027",
      title: "Performance Loop",
      body: "Analytics feed back into script generation for every new episode.",
    },
    {
      phase: "Phase 4",
      target: "Q4 2027",
      title: "Self serve and white label",
      body: "A self serve platform for creators and a white label offer for media partners.",
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Team                                                                */
/* ------------------------------------------------------------------ */

export const team = {
  id: "team",
  eyebrow: "Team",
  title: "The people behind it.",
  // TODO: Replace the placeholder names, roles and bios below with real team details.
  // Only add credentials that can be verified. Do not invent backgrounds.
  members: [
    {
      name: "[Founder name]",
      role: "Founder and Product",
      bio: "[Short bio. Add background, focus and why this problem matters to you.]",
    },
    {
      name: "[Engineering lead name]",
      role: "Engineering",
      bio: "[Short bio. Add background in cloud, media pipelines or applied AI.]",
    },
    {
      name: "[Go to market lead name]",
      role: "Go to Market",
      bio: "[Short bio. Add background in creator, media or brand partnerships.]",
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Waitlist / pilot form                                               */
/* ------------------------------------------------------------------ */

export const waitlist = {
  id: "join",
  eyebrow: "Pilot program",
  title: "Join the pilot.",
  intro: "We are opening a small pilot for creators, brands and media companies. Tell us what you would produce.",
  fields: {
    name: { label: "Name", placeholder: "Your name" },
    email: { label: "Email", placeholder: "you@company.com" },
    company: { label: "Company (optional)", placeholder: "Company or channel" },
    interest: {
      label: "What would you produce?",
      placeholder: "Choose one",
      options: ["Own channel", "Brand", "Media company", "Other"],
    },
  },
  submit: "Request pilot access",
  sending: "Sending",
  privacy: "We use your details only to contact you about the pilot. See our",
  privacyLink: "Datenschutz",
  errors: {
    name: "Please enter your name.",
    email: "Please enter a valid email address.",
    interest: "Please choose an option.",
    generic: "Something went wrong. Please try again in a moment.",
  },
  success: {
    title: "You are on the list.",
    body: "Thank you. We will be in touch about the pilot.",
  },
};

/* ------------------------------------------------------------------ */
/* Footer and legal                                                    */
/* ------------------------------------------------------------------ */

export const footer = {
  blurb: "AI microdramas, produced and published on autopilot.",
  badge: "Built on AWS",
  links: [
    { label: "Built on AWS", to: "/aws" },
    { label: "Impressum", to: "/impressum" },
    { label: "Datenschutz", to: "/datenschutz" },
  ] satisfies NavLink[],
  contactLabel: "Contact",
  rights: `© ${new Date().getFullYear()} ${BRAND_NAME}. All rights reserved.`,
  trademark: "AWS and all related service names are trademarks of Amazon.com, Inc. or its affiliates.",
};

export const legal = {
  impressum: {
    title: "Impressum",
    // TODO: Replace with the legally required provider information (§ 5 DDG) before launch.
    body: [
      "[Company name and legal form]",
      "[Street and number]",
      "[Postal code and city]",
      "[Managing director]",
      "[Commercial register and number, if applicable]",
      "[VAT ID, if applicable]",
      `Contact: ${CONTACT_EMAIL}`,
    ],
  },
  datenschutz: {
    title: "Datenschutz",
    // TODO: Replace with a complete privacy notice (GDPR) before launch.
    body: [
      "[Controller name and contact details]",
      "[Which personal data is collected, for example name, email and company from the pilot form]",
      "[Purpose and legal basis of processing]",
      "[Hosting provider and any processors, for example GitHub Pages and Supabase]",
      "[Retention period and your rights under GDPR]",
    ],
  },
  placeholderNote: "Placeholder page. Final text to be added before launch.",
  back: "Back to home",
};

/* ------------------------------------------------------------------ */
/* /aws page                                                           */
/* ------------------------------------------------------------------ */

export const aws = {
  metaTitle: `Built on AWS | ${BRAND_NAME}`,
  metaDescription: `Technical overview of the ${BRAND_NAME} architecture on AWS: Bedrock, Batch, Step Functions, MediaConvert and more.`,
  eyebrow: "Technical overview",
  title: "Built on AWS",
  intro: `${BRAND_NAME} is an event driven media pipeline. A serverless control plane orchestrates generative AI, GPU rendering, voice and encoding services, then publishes and learns from the results. This page gives reviewers a clear picture of the stack.`,

  architecture: {
    title: "Architecture",
    intro: "One episode flows from the web app to four social platforms. Analytics return to the start.",
    scrollHint: "Scroll sideways to see the full diagram.",
    diagramLabel:
      "Architecture diagram. Web app on CloudFront and S3 calls an API on API Gateway and Lambda. AWS Step Functions orchestrates parallel workers: Amazon Bedrock, AWS Batch on EC2 GPU instances, Amazon Polly and Transcribe, and AWS Elemental MediaConvert. Output is stored in Amazon S3 with metadata in Amazon DynamoDB. A publish queue on EventBridge and SQS sends episodes to the Instagram, TikTok, YouTube and Snapchat APIs. Analytics flow back into DynamoDB and Amazon Athena for the Performance Loop.",
    flowTitle: "The flow in words",
    flow: [
      "Web app on Amazon CloudFront and Amazon S3.",
      "API on Amazon API Gateway and AWS Lambda.",
      "Orchestration with AWS Step Functions.",
      "Parallel workers: Amazon Bedrock for script, image and video generation plus Guardrails. AWS Batch on EC2 GPU instances for Blender rendering. Amazon Polly and Amazon Transcribe for voice and captions. AWS Elemental MediaConvert for the final render.",
      "Assets stored in Amazon S3.",
      "Metadata stored in Amazon DynamoDB.",
      "Publish queue with Amazon EventBridge and Amazon SQS.",
      "Platform APIs for Instagram, TikTok, YouTube and Snapchat.",
      "Analytics written back to Amazon DynamoDB and queried with Amazon Athena for the Performance Loop.",
    ],
  },

  credits: {
    title: "Planned use of AWS credits (USD 5,000)",
    note: "These shares are planning estimates. Actual usage will vary as we measure real workloads.",
    columns: { service: "Area", share: "Planned share", amount: "Estimate (USD)" },
    total: 5000,
    rows: [
      { area: "Amazon Bedrock models", share: 40 },
      { area: "AWS Batch and EC2 GPU rendering", share: 25 },
      { area: "MediaConvert, S3 and CloudFront", share: 15 },
      { area: "Polly and Transcribe", share: 10 },
      { area: "Step Functions, Lambda, DynamoDB, SQS", share: 10 },
    ],
    totalLabel: "Total",
  },

  why: {
    title: "Why AWS",
    items: [
      {
        icon: "gpu",
        title: "Elastic GPU rendering",
        body: "Rendering is bursty. AWS Batch scales GPU workers up for a release and back to zero afterward.",
      },
      {
        icon: "sparkles",
        title: "Generative AI through one API",
        body: "Amazon Bedrock gives managed access to text, image and video models, plus Guardrails, behind a single API.",
      },
      {
        icon: "workflow",
        title: "Orchestration for media pipelines",
        body: "Step Functions coordinates multi step, parallel jobs with retries, state and a clear audit trail.",
      },
      {
        icon: "globe",
        title: "EU region for data residency",
        body: "We run in Europe (Frankfurt) so personal data and assets stay in the EU.",
      },
    ],
  },

  roadmap90: {
    title: "What we build in the first 90 days",
    items: [
      { title: "End to end pipeline for one episode", body: "From prompt to a rendered, reviewed video in S3." },
      { title: "Blender render workers on Batch", body: "GPU worker images, job queues and scaling rules." },
      { title: "Choice tree format", body: "Branching scripts with A or B overlays and the rewind path." },
      { title: "Publish queue", body: "EventBridge and SQS with retries per platform API." },
      { title: "First analytics dashboard", body: "Retention, comments, shares and completion rate in Athena." },
    ],
  },

  contact: {
    title: "Contact for the AWS Activate team",
    body: "We are happy to walk through the architecture, share a demo of the pipeline in progress and answer technical questions.",
    // TODO: Add the real contact person, role and a direct email before submitting to AWS Activate.
    person: "[Name, role]",
    emailLabel: "Email",
    email: CONTACT_EMAIL,
    cta: "Email us",
    back: "Back to the main site",
  },
};
