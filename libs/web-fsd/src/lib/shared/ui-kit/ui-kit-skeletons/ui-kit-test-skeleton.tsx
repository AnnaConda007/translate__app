interface Props {
  testItemsAmount?: number;
}
export const SkeletonUi = ({ testItemsAmount = 1 }: Props) => {
  const itemTestList = Array.from({ length: testItemsAmount });

  return (
    <div className=" flex  flex-col gap-2 w-full ">
      {itemTestList.map((_, i) => (
        <div
          key={i}
          className=" h-8 rounded-md 
    bg-gradient-to-r from-red-200 via-slate-300 to-red-200
               animate-shimmer"
        ></div>
      ))}
    </div>
  );
};
