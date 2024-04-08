export async function filterImage(buffer: Buffer, nsfwTolerance: number) {
  const req = await fetch("https://api-inference.huggingface.co/models/Falconsai/nsfw_image_detection", {
    headers: {
      Authorization: `Bearer ${process.env.HF_ACCESS_TOKEN}`
    },
    method: "POST",
    body: buffer,
  });

  const res = await req.json() as {label: string, score: number}[];

  return res.find(p => p.label === "nsfw")!.score > nsfwTolerance;
}