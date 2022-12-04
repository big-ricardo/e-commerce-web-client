import Lottie from "react-lottie";
import animationData from "../../../assets/lottie/logo.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const Logo = ({ width = 70 }) => {
  return (
    <div data-testid="logo">
      <Lottie options={defaultOptions} width={width} />
    </div>
  );
};

export default Logo;
