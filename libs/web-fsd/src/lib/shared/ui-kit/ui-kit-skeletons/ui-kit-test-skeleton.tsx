interface Props {
  testItemsAmount?: number;
  small?:boolean
}
export const SkeletonUi = ({ testItemsAmount = 1, small }: Props) => {
  const itemTestList = Array.from({ length: testItemsAmount });

  return (
    <div className=" flex  flex-col gap-2 w-full ">
      {itemTestList.map((_, i) => (
        <div
          key={i}
          className={` ${small ? `h-4` : 'h-8 '}  rounded-md 
    bg-gradient-to-r from-secondary via-secondary-light to-secondary
               animate-shimmer`}
        ></div>
      ))}
    </div>
  );
  
};
