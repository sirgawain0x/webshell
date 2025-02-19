import { AIAgentResponse } from "../types/aiAgent";

const AI_AGENT_BASE_URL = "https://api.fleek.xyz";
const AGENT_ID = import.meta.env.VITE_CREATIVE_MUSE_AGENT_ID;
const ELIZA_AGENT_ID = import.meta.env.VITE_ELIZA_AGENT_ID;
const SESSION_TOKEN = import.meta.env.VITE_SESSION_TOKEN;

export class AIAgentService {
  private apiKey: string;

  constructor() {
    this.apiKey = import.meta.env.VITE_FLEEK_API_KEY;
    if (!this.apiKey) {
      throw new Error("VITE_FLEEK_API_KEY is not set in environment variables");
    }
    if (!AGENT_ID || !ELIZA_AGENT_ID) {
      throw new Error(
        "VITE_CREATIVE_MUSE_AGENT_ID or VITE_ELIZA_AGENT_ID is not set in environment variables"
      );
    }
    console.log("AIAgentService initialized with:", {
      baseUrl: AI_AGENT_BASE_URL,
      agentId: AGENT_ID,
      elizaAgentId: ELIZA_AGENT_ID,
      apiKeyLength: this.apiKey.length,
    });
  }

  async sendMessage(text: string): Promise<AIAgentResponse[]> {
    const headers = new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${SESSION_TOKEN}`,
      "x-api-key": this.apiKey,
    });

    const requestOptions = {
      method: "POST",
      headers,
      body: JSON.stringify({ text }),
    };

    try {
      const url = `${AI_AGENT_BASE_URL}/api/v1/ai-agents/${AGENT_ID}/api/${ELIZA_AGENT_ID}/message`;
      console.log("Sending request to AI agent:", {
        url,
        text,
        headers: {
          "Content-Type": headers.get("Content-Type"),
          "x-api-key": "****", // Hide the actual key
        },
      });

      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("AI agent error response:", {
          status: response.status,
          statusText: response.statusText,
          errorText,
        });
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`
        );
      }

      const result = await response.json();
      console.log("AI agent response:", result);
      return result;
    } catch (error) {
      console.error("Error sending message to AI agent:", error);
      throw error;
    }
  }
}
