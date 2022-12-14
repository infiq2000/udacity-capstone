import Countdown from "react-countdown";
interface CountDownProps {
  timeLimit: number;
}
const CountDown = ({ timeLimit }: CountDownProps) => {
  return (
    <>
      <Countdown className="count-down" date={Date.now() + timeLimit} />
    </>
  );
};
export default CountDown;
