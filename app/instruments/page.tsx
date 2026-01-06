import { getInstruments } from "@/lib/data-access-layer/instruments";

export default async function Instruments() {
  const { data, error } = await getInstruments();

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
