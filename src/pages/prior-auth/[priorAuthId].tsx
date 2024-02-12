import PriorAuthResponse, {
  PriorAuthData,
} from "@/components/PriorAuthResponse";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import mockResponse from "../../../fixtures/example-response.json";

const usePriorAuthData = (priorAuthId: string): PriorAuthData | null => {
  const [data, setData] = useState<PriorAuthData | null>(null);

  useEffect(() => {
    // Fetch data from an API or other source
    // This is just a mockup, replace with your actual data fetching logic
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setData(mockResponse);
    };

    fetchData();
  }, [priorAuthId]);

  return data;
};

const PriorAuthPage = () => {
  const router = useRouter();
  const { priorAuthId } = router.query;
  const data = usePriorAuthData(priorAuthId as string);

  console.log(data);

  return (
    <div>
      <h1>Prior Authorization Page</h1>
      <p>Prior Authorization ID: {priorAuthId}</p>

      {data && <PriorAuthResponse data={data} />}
    </div>
  );
};

export default PriorAuthPage;
