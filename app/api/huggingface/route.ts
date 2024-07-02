import { HfInference } from '@huggingface/inference';
import { NextResponse } from 'next/server';

const hf = new HfInference(process.env.HF_TOKEN);

export async function POST(request: Request) {
  try {
    const { model, inputs } = await request.json();
    const result = await hf.textGeneration({
      model: model,
      inputs: inputs,
    });
    return NextResponse.json({ result: result });
  } catch (error) {
    console.error('Hugging Face API error:', error);
    return NextResponse.json({ error: 'Error processing your request' }, { status: 500 });
  }
}