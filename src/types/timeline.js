import { z } from "zod";

/**
 * Schema Zod para validacao centralizada da Linha do Tempo (timeline.json).
 * Serve como contrato unico entre Whisper, FFmpeg, GSAP e Remotion.
 */

export const WordTimingSchema = z.object({
  word: z.string(),
  start: z.number().nonnegative(),
  end: z.number().nonnegative(),
  highlight: z.boolean().default(false),
  color: z.string().optional()
});

export const SceneBeatSchema = z.object({
  id: z.string(),
  time: z.number().nonnegative(),
  duration: z.number().positive().default(2.5),
  type: z.enum(["full_screen", "split_screen", "punch_in", "b_roll", "cta"]),
  zoom: z.number().default(1.0),
  title: z.string().optional(),
  description: z.string().optional(),
  cardImage: z.string().optional(),
  sfx: z.string().optional()
});

export const CutSegmentSchema = z.object({
  start: z.number().nonnegative(),
  end: z.number().nonnegative()
});

export const TimelineSchema = z.object({
  version: z.string().default("1.0.0"),
  meta: z.object({
    fps: z.number().default(30),
    durationInFrames: z.number().int().positive(),
    durationInSeconds: z.number().positive(),
    width: z.number().default(1080),
    height: z.number().default(1920),
    audioTrack: z.string().optional(),
    loudnessTargetLUFS: z.number().default(-14.0)
  }),
  cuts: z.array(CutSegmentSchema).default([]),
  words: z.array(WordTimingSchema).default([]),
  beats: z.array(SceneBeatSchema).default([])
});

export function validateTimeline(data) {
  return TimelineSchema.parse(data);
}
