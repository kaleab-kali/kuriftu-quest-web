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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Challenge } from '@/types/challenges';
import { supabaseClient } from '@/utils/apiClient';
import { useState } from 'react';
import { cloudinaryUpload } from '@/lib/cloudinary';

const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(5).max(500),
  category: z.string().min(2),
  points: z.number().int().positive(),
  image_url: z.string().url().optional(),
  is_active: z.boolean()
});

interface ChallengeFormProps {
  challenge?: Challenge;
  onSuccess: () => void;
}

export function ChallengeForm({ challenge, onSuccess }: ChallengeFormProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: challenge?.title || '',
      description: challenge?.description || '',
      category: challenge?.category || '',
      points: challenge?.points || 100,
      image_url: challenge?.image_url || '',
      is_active: challenge?.is_active ?? true
    }
  });

  const handleImageUpload = async (file: File) => {
    setIsUploading(true);
    try {
      const url = await cloudinaryUpload(file);
      form.setValue('image_url', url);
      setPreviewImage(url);
    } catch (error) {
      form.setError('image_url', { message: 'Failed to upload image' });
    } finally {
      setIsUploading(false);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (challenge) {
        await supabaseClient.patch(`/challenges?id=eq.${challenge.id}`, values);
      } else {
        await supabaseClient.post('/challenges', values);
      }
      onSuccess();
    } catch (error) {
      console.error('Error saving challenge:', error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Challenge title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Challenge description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="fitness">Fitness</SelectItem>
                  <SelectItem value="nutrition">Nutrition</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="social">Social</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="points"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Points</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Points"
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
          name="image_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <div className="flex flex-col gap-2">
                  <Input
                    type="file"
                    accept="image/*"
                    disabled={isUploading}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setPreviewImage(URL.createObjectURL(file));
                        handleImageUpload(file);
                      }
                    }}
                  />
                  {previewImage && (
                    <div className="mt-2">
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="h-16 w-16 rounded-md object-cover"
                      />
                    </div>
                  )}
                  {field.value && !previewImage && (
                    <img
                      src={field.value}
                      alt="Current"
                      className="h-32 w-32 rounded-md object-cover"
                    />
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="is_active"
          render={({ field }) => (
            <FormItem className="flex items-center gap-4">
              <FormLabel>Active Status</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isUploading}>
          {isUploading
            ? 'Uploading...'
            : challenge
              ? 'Update Challenge'
              : 'Create Challenge'}
        </Button>
      </form>
    </Form>
  );
}
