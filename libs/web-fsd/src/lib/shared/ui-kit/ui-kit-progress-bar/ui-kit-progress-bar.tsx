interface Props {
  currentIndex: number;
  totalLength: number;
}

export const ProgressBarUi = ({ currentIndex, totalLength }: Props) => {
  return (
    <div className="w-full bg-secondary">
      <div
        className="bg-main h-2 rounded-full "
        style={{
          width: `${(currentIndex / totalLength) * 100}%`,
        }}
      />
    </div>
  );
};
