import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Weather API types
export const forecastDataSchema = z.object({
  date: z.string(),
  maxTemp: z.number(),
  minTemp: z.number(),
  condition: z.string(),
  precipitationProbability: z.number(),
  hasRainOrSnow: z.boolean(),
});

export const weatherDataSchema = z.object({
  location: z.object({
    name: z.string(),
    country: z.string(),
    lat: z.number(),
    lon: z.number(),
  }),
  current: z.object({
    temp: z.number(),
    feelsLike: z.number(),
    condition: z.string(),
    conditionIcon: z.string(),
    humidity: z.number(),
    wind: z.number(),
    precipitation: z.number().optional(),
    uv: z.number(),
    date: z.string(),
    time: z.string(),
    hasRainOrSnow: z.boolean().optional(),
  }),
  forecast: z.array(forecastDataSchema).optional(),
});

export type ForecastData = z.infer<typeof forecastDataSchema>;
export type WeatherData = z.infer<typeof weatherDataSchema>;

export const outfitRecommendationSchema = z.object({
  range: z.tuple([z.number(), z.number()]),
  head: z.object({ icon: z.string(), label: z.string() }),
  upper: z.object({ icon: z.string(), label: z.string() }),
  lower: z.object({ icon: z.string(), label: z.string() }),
  foot: z.object({ icon: z.string(), label: z.string() }),
  accessory: z.object({ icon: z.string(), label: z.string() }),
  extra: z.object({ icon: z.string(), label: z.string() }),
  color: z.string(),
  advice: z.string(),
  description: z.string(),
});

export type OutfitRecommendation = z.infer<typeof outfitRecommendationSchema>;
