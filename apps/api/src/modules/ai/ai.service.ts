import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import axios from "axios";
import { AIRecommendationRequest, AIRecommendationResponse } from "./dtos/ai.dto";

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private readonly apiKey = process.env.GEMINI_API_KEY;
  private readonly apiUrl = process.env.GEMINI_API_URL ?? "https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generate";

  async recommend(payload: AIRecommendationRequest): Promise<AIRecommendationResponse> {
    if (!this.apiKey) throw new InternalServerErrorException("GEMINI_API_KEY not configured");

    const prompt = this.buildPrompt(payload);

    try {
      const res = await axios.post(this.apiUrl, {
        prompt: { text: prompt },
        temperature: 0.2,
        candidate_count: 1,
      }, {
        headers: { Authorization: `Bearer ${this.apiKey}` },
        timeout: 15000,
      });

      const text = this.extractTextFromResponse(res.data);
      const json = this.parseJsonSafe(text);
      return json as AIRecommendationResponse;
    } catch (err: any) {
      this.logger.error("Gemini request failed", err?.response?.data ?? err?.message ?? err);
      throw new InternalServerErrorException("AI recommendation failed");
    }
  }

  private buildPrompt(p: AIRecommendationRequest) {
    // Structured system prompt that instructs the model to return JSON only.
    const instructions = [
      "You are an expert bridal stylist recommender for a luxury wedding platform.",
      "Given the user's profile, location, budget, and preferences, return a JSON object with the following keys: artists (array), salons (array), styleSuggestions (array), filters (object), confidence (number between 0 and 1).",
      "Each artist should include name, optional id (if known), a score (0-1), and brief reasons why they match.",
      "Each salon should include name, optional id, city, priceEstimateRupees (integer), and score.",
      "Style suggestions should be short named styles with descriptions.",
      "Filters should include suggested filters (e.g., priceRange, makeupStyle, travelRadius).",
      "Output MUST be valid JSON and nothing else. Do NOT include any explanatory text.",
      "Keep response concise and use numeric scores to rank recommendations.",
    ].join("\n");

    const userBlock = `User profile: ${JSON.stringify(p.userProfile)}\nLocation: ${p.location ?? ""}\nBudgetRupees: ${p.budgetRupees ?? null}\nPreferences: ${JSON.stringify(p.preferences ?? [])}`;

    return `${instructions}\n\n${userBlock}\n\nReturn JSON only.`;
  }

  private extractTextFromResponse(data: any): string {
    // Support multiple shapes returned by different Gemini/Bison endpoints.
    if (!data) return "";
    if (typeof data === "string") return data;
    // v1beta2 text-bison-like
    if (data?.candidates && Array.isArray(data.candidates) && data.candidates[0]?.content) return data.candidates[0].content;
    if (data?.output && data.output[0]?.content) return typeof data.output[0].content === 'string' ? data.output[0].content : data.output[0].content?.[0]?.text ?? '';
    if (data?.result && data.result?.content) return data.result.content;
    return JSON.stringify(data);
  }

  private parseJsonSafe(text: string): any {
    // Trim any surrounding text and extract JSON block if model added stray text
    const firstBrace = text.indexOf("{");
    const lastBrace = text.lastIndexOf("}");
    const jsonText = firstBrace !== -1 && lastBrace !== -1 ? text.slice(firstBrace, lastBrace + 1) : text;

    try {
      return JSON.parse(jsonText);
    } catch (err) {
      // try to recover with simple line filtering
      const cleaned = jsonText.replace(/\n\s*/g, "");
      try { return JSON.parse(cleaned); } catch (e) {
        this.logger.error("Failed to parse JSON from model", { text });
        throw new InternalServerErrorException("Failed to parse AI response");
      }
    }
  }
}
