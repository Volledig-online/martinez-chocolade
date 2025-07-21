'use client';

import React, { useState, useEffect } from 'react';
import Logo from '@/components/Logo';
import NumberBadge from '@/components/number-badge';
import { TodayOrderTable, FutureOrderTable } from '@/components';
import { fetchDashboardData, type DashboardData } from '@/lib/actions';

const Dashboard: React.FC = () => {
  const [data, setData] = useState<DashboardData>({
    todayOrders: [],
    futureOrders: [],
    readBackCount: 0,
    validatedCount: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchDashboardDataAction = async () => {
    try {
      setError(null);

      // Use Server Action to fetch all data
      const dashboardData = await fetchDashboardData();

      setData(dashboardData);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchDashboardDataAction();

    // Set up interval for automatic updates every 10 seconds
    const interval = setInterval(fetchDashboardDataAction, 10000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <main className='flex h-screen items-center justify-center overflow-hidden'>
        <div className='text-xl'>Dashboard wordt geladen...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className='flex h-screen items-center justify-center overflow-hidden'>
        <div className='text-xl text-red-600'>
          Fout bij laden van dashboard: {error}
          <button
            onClick={fetchDashboardDataAction}
            className='ml-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
          >
            Opnieuw proberen
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className='h-screen overflow-hidden'>
      <div className='bg-primary absolute top-0 right-0 left-0 z-10 mx-auto flex h-[7.5rem] w-[7.5rem] items-center rounded-b-2xl'>
        <Logo />
      </div>
      {/* Last updated indicator */}
      {lastUpdated && process.env.NODE_ENV === 'development' && (
        <div className='absolute top-4 left-4 z-20 text-xs text-gray-500'>
          Laatst bijgewerkt: {lastUpdated.toLocaleTimeString('nl-NL')}
        </div>
      )}
      <div className='flex h-full items-stretch gap-8 p-8'>
        <div className='flex flex-1 flex-col'>
          <div className='flex h-[6.5625rem] items-center gap-6'>
            <div>
              <h2 className='mb-1 text-xl leading-[1] font-bold'>Vandaag</h2>
              <span className='text-sm leading-[1]'>In bewerking</span>
            </div>
            <div>
              <NumberBadge number={data.todayOrders.length} />
            </div>
          </div>
          <div className='min-h-0 flex-1 py-6'>
            <TodayOrderTable orders={data.todayOrders} className='h-full' />
          </div>
          <div className='flex h-[6.5625rem] items-center gap-6'>
            <div>
              <h2 className='mb-1 text-xl leading-[1] font-bold'>
                Terug gemeld
              </h2>
              <span className='text-sm leading-[1]'>Status 4</span>
            </div>
            <div>
              <NumberBadge number={data.readBackCount} />
            </div>
          </div>
        </div>
        <div className='flex flex-1 flex-col'>
          <div className='flex h-[6.5625rem] items-center justify-end gap-6'>
            <div>
              <h2 className='mb-1 text-xl leading-[1] font-bold'>Toekomst</h2>
            </div>
            <div>
              <NumberBadge number={data.futureOrders.length} />
            </div>
          </div>
          <div className='min-h-0 flex-1 py-6'>
            <FutureOrderTable
              hideFirstRowLabel
              orders={data.futureOrders}
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
              <NumberBadge number={data.validatedCount} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
