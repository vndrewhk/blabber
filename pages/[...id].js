const { useRouter } = require("next/router");
const id = () => {
  const router = useRouter();
  const { id } = router.query;

  return <div className="text-white"> text {id}</div>;
};

export default id;
