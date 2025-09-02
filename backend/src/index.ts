import { googleAI } from '@genkit-ai/googleai';
import { genkit, z } from 'genkit';
import config from './config/config';
import { getNTUCProductsAdvanced, searchNTUC } from './tools/ntuc';


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


const shoppingSuggestionGeneratorFlow = ai.defineFlow(
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




// export const getNTUCProductsTool = ai.defineTool({
//     name: 'getNTUCProducts',
//     description: 'Get searched products from NTUC website searched {{item}}',
//     inputSchema: z.object({
//         item: z.string().describe('Item to search for'),
//     }),
//     outputSchema: z.array(ShoppingItemSchema).describe('List of products from NTUC'),
//     func: getProducts,
// })

// Advanced usage with options
// (async () => {
    // const result = await getNTUCProductsAdvanced('biscuits', {
    //     maxPages: -1,           // Only fetch first 5 pages, -1 get all
    //     delay: 1000,           // Wait 1 second between requests
    //     onPageFetched: (page, total, products) => {
    //         console.log(`Got ${products.length} products from page ${page}/${total}`);
    //     }
    // });

    // console.log(`Collected ${result.totalFetched} products from ${result.pagesFetched} pages`);

    // for (const product of result.products) {
    //      const { final_price, name, images } = product;
    //     console.log(`Name: ${name}, Price: ${final_price}`);
    // }   


    // Get first 5 pages
    // const batch1 = await getNTUCProductsAdvanced('milk', {
    //     maxPages: 5,
    //     startPage: 1
    // });

    // console.log(`Collected ${batch1.totalFetched} products from ${batch1.pagesFetched} pages`);

    // for (const product of batch1.products) {
    //      const { final_price, name, images } = product;
    //     console.log(`Name: ${name}, Price: ${final_price}`);
    // }

    // // Get all remaining pages
    // const batch3 = await getNTUCProductsAdvanced('milk', {
    //     maxPages: -1,                  // Get all remaining
    //     startPage: batch1.endPage + 1
    // });


    // console.log(`Collected ${batch3.totalFetched} products from ${batch3.pagesFetched} pages`);

    // for (const product of batch3.products) {
    //      const { final_price, name, images } = product;
    //     console.log(`Name: ${name}, Price: ${final_price}`);
    // }
// })();