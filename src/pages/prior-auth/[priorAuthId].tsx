import { useRouter } from "next/router";

const PriorAuthPage = () => {
  const router = useRouter();
  const { priorAuthId } = router.query;

  return (
    <div>
      <h1>Prior Authorization Page</h1>
      <p>Prior Authorization ID: {priorAuthId}</p>
    </div>
  );
};

export default PriorAuthPage;
