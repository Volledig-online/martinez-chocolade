export default function NumberBadge({ number }: { number: number }) {
  return (
    <div className='flex h-[5.312rem] w-[7.625rem] items-center justify-center rounded-2xl bg-gray-200 text-lg font-bold text-black'>
      {number}
    </div>
  );
}
