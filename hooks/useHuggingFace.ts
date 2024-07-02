import { useState } from 'react';

export function useHuggingFace() {
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateText = async (model: string, inputs: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/huggingface', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ model, inputs }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setResult(data.result.generated_text);
    } catch (error) {
      setError('An error occurred while processing your request.');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return { generateText, result, isLoading, error };
}