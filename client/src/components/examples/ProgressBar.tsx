import ProgressBar from "../ProgressBar";

export default function ProgressBarExample() {
  return (
    <div className="flex flex-col gap-4 p-4 w-48">
      <ProgressBar value={0} />
      <ProgressBar value={42} />
      <ProgressBar value={75} />
      <ProgressBar value={100} />
    </div>
  );
}
