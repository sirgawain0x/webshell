import { AIAgentService } from "../services/aiAgent";

const aiAgent = new AIAgentService();

export async function handleChat(message: string): Promise<string[]> {
    try {
        const response = await aiAgent.sendMessage(message);
        if (response && response.length > 0) {
            return [
                "<br>",
                `<span class='ai-response'>${response[0].text}</span>`,
                "<br>"
            ];
        }
        return [
            "<br>",
            "No response received from AI",
            "<br>"
        ];
    } catch (error) {
        console.error("Chat error:", error);
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
        return [
            "<br>",
            `Error: ${errorMessage}`,
            "<br>"
        ];
    }
}
