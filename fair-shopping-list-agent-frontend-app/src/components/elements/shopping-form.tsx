"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "../ui/input"
import { runFlow } from "@genkit-ai/next/client"
import { shoppingSuggestionGeneratorFlow } from "@/genkit/shoppingItemsSuggestionGenFlow"

const FormSchema = z.object({
  budget: z.number().min(1).max(10000),
  items: z.string()
})

export function ShoppingForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      budget: 50,
      items: ""
    }
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    // Ensure budget is a number and items is an array
    const budget = Number(data.budget);
    const itemsArr = data.items
      .split(/\r?\n/)
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

      console.log({ budget, items: itemsArr });

      // Regular (non-streaming) approach
      const result = await runFlow<typeof shoppingSuggestionGeneratorFlow>({
        url: '/api/shop',
        input: { items: itemsArr },
      });

      console.log('Shopping Suggestions:', result.results.flatMap(r => r.suggestions));

      toast.success("Shopping Suggestions generated! Check console for details.");

    // toast("Shopping Plan", {
    //   description: (
    //     <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
    //       <code className="text-white">{JSON.stringify({ budget, items: itemsArr }, null, 2)}</code>
    //     </pre>
    //   ),
    // });
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 m-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
          <FormField
            control={form.control}
            name="budget"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Budget</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter your Shopping Budget"
                    {...field}
                    onChange={e => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Text Area */}
          <FormField
            control={form.control}
            name="items"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Items</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter each item on a new line."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Generate Shopping Plan</Button>
        </form>
      </Form>
    </div>
  )
}
