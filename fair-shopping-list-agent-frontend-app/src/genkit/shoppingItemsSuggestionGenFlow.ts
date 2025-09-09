import { searchNTUC } from '@/lib/ntuc';
import { googleAI } from '@genkit-ai/google-genai';
import { genkit, z } from 'genkit';

// Initialize Genkit with the Google AI plugin
const ai = genkit({
  plugins: [googleAI()],
  model: googleAI.model('gemini-2.5-flash', {
    temperature: 0.8,
  }),
});

// Define Input Schema
const ShoppingListInputSchema = z.object({
    items: z.array(z.string()).min(1).describe('List of items to buy'),
    // budget: z.number().min(0).optional().describe('Optional budget limit'),
    // store: z.string().optional().describe('Preferred store for shopping'),
});

const ShoppingItemSchema = z.object({
    id: z.number().min(1).describe('Unique identifier for the item'),
    name: z.string().min(2).max(100).describe('name of the item'),
    price: z.number().min(0).describe('Price of the item'),
});

const ShoppingItemsResultSchema = z.object({
            input: z.string().describe('Input item from the user'),
            suggestions: z.array(ShoppingItemSchema).min(1).describe('List of suggested shopping items'),
});

// Define Output Schema
const ShoppingItemsSuggestionsOutputSchema = z.object({
    results: z.array( ShoppingItemsResultSchema).describe('List of shopping item results'),
});

const shoppingSuggestionGeneratorFlowConfig = {
    name: 'shoppingSuggestionGeneratorFlow',
    inputSchema: ShoppingListInputSchema,
    outputSchema: ShoppingItemsSuggestionsOutputSchema,
}


export const shoppingSuggestionGeneratorFlow = ai.defineFlow(
    shoppingSuggestionGeneratorFlowConfig, 
    async (input) => {
        // Create a prompt based on the input
        const prompt = `Suggest shopping items for the following list: ${input.items.join(', ')}`;

         // Generate structured recipe data using the same schema
        const { output } = await ai.generate({ 
            prompt, 
            tools: [getNTUCProducts],
            output: { schema: ShoppingItemsSuggestionsOutputSchema }, 
        });

        if (!output) throw new Error('Failed to generate shopping item suggestions');

         return output;
    }
);

// Define a Genkit tool to get the weather for a given latitude and logitude
export const getNTUCProducts: any = ai.defineTool({
    name: 'getNTUCProducts',
    description: 'Use this tool to get the products from NTUC for the specified item.',
    inputSchema: z.object({
        item: z.string().describe('Item to search for'),
    }),
    outputSchema: ShoppingItemsResultSchema.describe('List of products from NTUC'),
}, async (input) => {
    const suggestions = await searchNTUC(input.item);
    return {
        input: input.item,
        suggestions,
    };
});
