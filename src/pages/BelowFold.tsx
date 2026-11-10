import { Problem } from "@/components/Problem";
import { PipelineSteps } from "@/components/PipelineSteps";
import { Formats } from "@/components/Formats";
import { PerformanceLoop } from "@/components/PerformanceLoop";
import { BusinessModel } from "@/components/BusinessModel";
import { ResponsibleAI } from "@/components/ResponsibleAI";
import { Roadmap } from "@/components/Roadmap";
import { WaitlistForm } from "@/components/WaitlistForm";

/** Everything below the hero. Loaded as a separate chunk so the first paint stays light. */
export default function BelowFold() {
  return (
    <>
      <Problem />
      <PipelineSteps />
      <Formats />
      <PerformanceLoop />
      <BusinessModel />
      <ResponsibleAI />
      <Roadmap />
      <WaitlistForm />
    </>
  );
}
