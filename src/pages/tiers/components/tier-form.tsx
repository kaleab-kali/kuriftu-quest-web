import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tier } from '@/types/tier';
import { supabaseClient } from '@/utils/apiClient';

const formSchema = z.object({
  tier: z.string().min(2).max(50),
  min_points: z.number().int().positive(),
  benefits: z.array(z.string()).min(1)
});

interface TierFormProps {
  tier?: Tier;
  onSuccess: () => void;
}

export function TierForm({ tier, onSuccess }: TierFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tier: tier?.tier || '',
      min_points: tier?.min_points || 1000,
      benefits: tier?.benefits || []
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const formattedValues = {
        ...values
      };
      console.log('Formatted Values:', formattedValues);
      if (tier) {
        await supabaseClient.patch(
          `/tier_definitions?id=eq.${tier.id}`,
          formattedValues
        );
      } else {
        await supabaseClient.post('/tier_definitions', formattedValues);
      }
      onSuccess();
    } catch (error) {
      console.error('Error saving tier:', error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="tier"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tier Name</FormLabel>
              <FormControl>
                <Input placeholder="Gold Tier" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="min_points"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Minimum Points</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="1000"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="benefits"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Benefits (comma-separated)</FormLabel>
              <FormControl>
                <Input
                  placeholder="Free shipping, Priority support, Exclusive offers"
                  value={(field.value || []).join(', ')}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value.split(',').map((b) => b.trim())
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {tier ? 'Update Tier' : 'Create Tier'}
        </Button>
      </form>
    </Form>
  );
}
