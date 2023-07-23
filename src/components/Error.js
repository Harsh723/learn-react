import { useRouteError } from "react-router-dom";

const Error = () => {
  const err = useRouteError();
  console.log(err);
  return (
    <>
      <div>Oops something went wrong!!</div>
      <h3>
        {err.status} : {err.statusText}
      </h3>
    </>
  );
};

export default Error;
