import { shoppingSuggestionGeneratorFlow } from '@/genkit/shoppingItemsSuggestionGenFlow';
import { appRoute } from '@genkit-ai/next';

export const POST = appRoute(shoppingSuggestionGeneratorFlow);