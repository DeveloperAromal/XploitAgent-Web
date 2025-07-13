import { NextResponse } from "next/server";
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";

const elevenlabs = new ElevenLabsClient({
  apiKey: process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY || "",
});

export async function POST(req: Request) {
  try {
    const { text, voice_id = "nPczCjzI2devNBz1zQrb" } = await req.json(); // Defaulting to Rachel's actual voice_id

    if (!text || text.trim() === "") {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    const audioStream = await elevenlabs.textToSpeech.convert(voice_id, {
      text,
      modelId: "eleven_monolingual_v1",
      voiceSettings: {
        stability: 0.5,
        similarityBoost: 0.75,
      },
    });

    // --- FIX STARTS HERE ---

    // Option 1: Using async iterator to collect chunks (More standard for ReadableStream)
    const chunks: Uint8Array[] = [];
    // The 'audioStream' here is a ReadableStream<Uint8Array>.
    // TypeScript might complain about 'for await...of' directly on ReadableStream
    // in some older environments or configurations.
    // However, in modern Node.js environments and Next.js, this is generally supported.
    // If you still get an error about `Symbol.asyncIterator`, ensure your tsconfig.json
    // `target` is high enough (e.g., "es2018" or higher) and `lib` includes "esnext.asynciterable".
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    for await (const chunk of audioStream as any) {
      // Type assertion 'as any' for safety with older TS configs
      chunks.push(chunk);
    }

    // Concatenate all chunks into a single Uint8Array
    const audioBuffer = Buffer.concat(chunks); // Node.js Buffer is good for this
    const audioArrayBuffer = audioBuffer.buffer.slice(
      audioBuffer.byteOffset,
      audioBuffer.byteOffset + audioBuffer.byteLength
    );

    // --- FIX ENDS HERE ---

    return new NextResponse(audioArrayBuffer, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": audioArrayBuffer.byteLength.toString(),
      },
    });
  } catch (error) {
    console.error(`ElevenLabs TTS error: ${error}`);

    return NextResponse.json(
      {
        error: "Failed to generate speech",
        details: error || "An unknown error occurred.",
        elevenlabsError: error || undefined,
      },
      { status: 500 }
    );
  }
}
