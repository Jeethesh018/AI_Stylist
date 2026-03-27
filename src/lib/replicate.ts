import type { TryOnStyle } from '../types';

const REPLICATE_BASE_URL = 'https://api.replicate.com/v1/predictions';

const stylePromptMap: Record<TryOnStyle, string> = {
  short_hair: 'portrait of the same person with a premium short haircut, realistic lighting, high detail, preserve identity',
  curly_hair: 'portrait of the same person with natural curly hair, realistic texture, high detail, preserve identity',
  casual_outfit: 'person wearing modern casual outfit, realistic, same person, full body fashion photography',
  formal_outfit: 'person wearing elegant formal outfit, realistic, same person, editorial fashion style'
};

type PredictionResponse = {
  id: string;
  status: 'starting' | 'processing' | 'succeeded' | 'failed' | 'canceled';
  error?: string | null;
  output?: string | string[];
};

const getHeaders = () => {
  const apiKey = import.meta.env.VITE_REPLICATE_API_KEY;

  if (!apiKey) {
    throw new Error('Missing VITE_REPLICATE_API_KEY environment variable.');
  }

  return {
    Authorization: `Token ${apiKey}`,
    'Content-Type': 'application/json'
  };
};

const extractOutput = (output?: string | string[]) => {
  if (!output) return null;
  return Array.isArray(output) ? output[0] : output;
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const generateTryOnImage = async (image: string, style: TryOnStyle): Promise<string> => {
  const createResponse = await fetch(REPLICATE_BASE_URL, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({
      version: 'lucataco/try-on-diffusion',
      input: {
        image,
        prompt: stylePromptMap[style]
      }
    })
  });

  if (!createResponse.ok) {
    const errorText = await createResponse.text();
    throw new Error(`Replicate request failed: ${createResponse.status} ${errorText}`);
  }

  const created = (await createResponse.json()) as PredictionResponse;
  let statusPayload = created;

  for (let attempt = 0; attempt < 40; attempt += 1) {
    if (statusPayload.status === 'succeeded') {
      const outputImage = extractOutput(statusPayload.output);
      if (!outputImage) {
        throw new Error('Replicate returned no output image.');
      }
      return outputImage;
    }

    if (statusPayload.status === 'failed' || statusPayload.status === 'canceled') {
      throw new Error(statusPayload.error ?? 'Image generation failed.');
    }

    await sleep(2000);

    const pollResponse = await fetch(`${REPLICATE_BASE_URL}/${created.id}`, {
      method: 'GET',
      headers: getHeaders()
    });

    if (!pollResponse.ok) {
      const pollError = await pollResponse.text();
      throw new Error(`Replicate polling failed: ${pollResponse.status} ${pollError}`);
    }

    statusPayload = (await pollResponse.json()) as PredictionResponse;
  }

  throw new Error('Image generation timed out. Please try again.');
};
