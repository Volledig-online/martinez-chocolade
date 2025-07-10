import Logo from '@/components/Logo';
import NumberBadge from '@/components/number-badge';
import { OrderTable } from '@/components';
import { ordersVandaagData, ordersToekomstData } from '@/data/orders';

export default function Home() {
  return (
    <main className='h-screen overflow-hidden'>
      <div className='bg-primary absolute top-0 right-0 left-0 z-10 mx-auto flex h-[7.5rem] w-[7.5rem] items-center rounded-b-2xl'>
        <Logo />
      </div>
      <div className='flex h-full items-stretch gap-8 p-8'>
        <div className='flex flex-1 flex-col'>
          <div className='flex h-[6.5625rem] items-center gap-6'>
            <div>
              <h2 className='mb-1 text-xl leading-[1] font-bold'>Vandaag</h2>
              <span className='text-sm leading-[1]'>In bewerking</span>
            </div>
            <div>
              <NumberBadge number={3} />
            </div>
          </div>
          <div className='min-h-0 flex-1 py-6'>
            <OrderTable orders={ordersVandaagData} className='h-full' />
          </div>
          <div className='flex h-[6.5625rem] items-center gap-6'>
            <div>
              <h2 className='mb-1 text-xl leading-[1] font-bold'>
                Terug gemeld
              </h2>
              <span className='text-sm leading-[1]'>Status 4</span>
            </div>
            <div>
              <NumberBadge number={4} />
            </div>
          </div>
        </div>
        <div className='flex flex-1 flex-col'>
          <div className='flex h-[6.5625rem] items-center justify-end gap-6'>
            <div>
              <h2 className='mb-1 text-xl leading-[1] font-bold'>Toekomst</h2>
            </div>
            <div>
              <NumberBadge number={12} />
            </div>
          </div>
          <div className='min-h-0 flex-1 py-6'>
            <OrderTable
              hideFirstRowLabel
              orders={ordersToekomstData}
              className='h-full'
            />
          </div>
          <div className='flex h-[6.5625rem] items-center justify-end gap-6'>
            <div>
              <h2 className='mb-1 text-xl leading-[1] font-bold'>
                Afgehandeld
              </h2>
            </div>
            <div>
              <NumberBadge number={9} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
