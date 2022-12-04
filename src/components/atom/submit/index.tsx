import { memo } from "react";
import { Link } from "react-router-dom";

interface Props {
  text: string;
  loading: boolean;
  className?: string;
}

const SubmitComponent: React.FC<Props> = props => {
  return (
    <div className={props.className} data-testid="submit-component">
      {props.loading ? (
        <div
          className="w-full mt-12 p-2 bg-indigo-500 text-white 
           border-2 border-blue-200 "
        >
          <svg
            className="animate-spin m-auto h-5 w-5 rounded-full bg-transparent border-2 border-transparent border-opacity-50"
            style={{ borderRightColor: "white", borderTopColor: "white" }}
            viewBox="0 0 24 24"
          ></svg>
        </div>
      ) : (
        <button
          type="submit"
          className="w-full mt-5 p-2 bg-indigo-500 hover:bg-gray-100 text-white 
          hover:text-indigo-900 border-2 border-blue-200 hover:b rounded-md"
        >
          {props.text}
        </button>
      )}
    </div>
  );
};

export default memo(SubmitComponent);
