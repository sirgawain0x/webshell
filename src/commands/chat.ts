import { AIAgentResponse } from "../types/aiAgent";
import { AIAgentService } from "../services/aiAgent";

const aiAgent = new AIAgentService();

// Function to wrap text at a specific width
function wrapText(text: string, maxWidth: number = 80): string[] {
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = '';

    words.forEach(word => {
        if (currentLine.length + word.length + 1 <= maxWidth) {
            currentLine += (currentLine.length === 0 ? '' : ' ') + word;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    });

    if (currentLine) {
        lines.push(currentLine);
    }

    return lines;
}

export async function handleChat(message: string): Promise<string[]> {
    try {
        const response: AIAgentResponse[] = await aiAgent.sendMessage(message);
        if (response && response.length > 0) {
            const aiResponse: AIAgentResponse = response[0];
            const formattedLines = wrapText(aiResponse.text);
            return [
                "<br>",
                ...formattedLines.map(line => 
                    `<span class='ai-response'>${line}</span>`
                ),
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
