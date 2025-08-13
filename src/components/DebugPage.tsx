'use client';

import React, { useState, useEffect } from 'react';
import { getDebugStats, type DebugStats } from '@/lib/debug-actions';

const DebugPage: React.FC = () => {
  const [stats, setStats] = useState<DebugStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchStats = async () => {
    try {
      setError(null);
      setIsLoading(true);
      const debugStats = await getDebugStats();
      setStats(debugStats);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Error fetching debug stats:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className='min-h-screen bg-gray-50 p-8'>
        <div className='mx-auto max-w-6xl'>
          <h1 className='mb-8 text-3xl font-bold'>Debug Statistieken</h1>
          <div className='text-xl'>Laden...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen bg-gray-50 p-8'>
        <div className='mx-auto max-w-6xl'>
          <h1 className='mb-8 text-3xl font-bold'>Debug Statistieken</h1>
          <div className='rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700'>
            <strong>Fout:</strong> {error}
            <button
              onClick={fetchStats}
              className='ml-4 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600'
            >
              Opnieuw proberen
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className='min-h-screen bg-gray-50 p-8'>
      <div className='mx-auto max-w-6xl'>
        <div className='mb-8 flex items-center justify-between'>
          <h1 className='text-2xl font-bold'>Debug Statistieken</h1>
          <div className='flex items-center gap-4'>
            {lastUpdated && (
              <span className='text-sm text-gray-600'>
                Laatst bijgewerkt: {lastUpdated.toLocaleTimeString('nl-NL')}
              </span>
            )}
            <button
              onClick={fetchStats}
              className='rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
            >
              Vernieuwen
            </button>
          </div>
        </div>

        {/* Main Statistics */}
        <div className='mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          <div className='rounded-lg bg-white p-6 shadow'>
            <h3 className='mb-2 text-base font-semibold'>Totaal Orders</h3>
            <p className='text-3xl font-bold text-blue-600'>
              {stats.totalOrders}
            </p>
          </div>

          <div className='rounded-lg bg-white p-6 shadow'>
            <h3 className='mb-2 text-base font-semibold'>
              Business Rules -1 dag
            </h3>
            <p className='text-3xl font-bold text-orange-600'>
              {stats.ordersWithMinus1Day}
            </p>
            <p className='mt-1 text-sm text-gray-600'>
              {((stats.ordersWithMinus1Day / stats.totalOrders) * 100).toFixed(
                1
              )}
              % van totaal
            </p>
          </div>

          <div className='rounded-lg bg-white p-6 shadow'>
            <h3 className='mb-2 text-base font-semibold'>
              Business Rules -2 dagen
            </h3>
            <p className='text-3xl font-bold text-red-600'>
              {stats.ordersWithMinus2Days}
            </p>
            <p className='mt-1 text-sm text-gray-600'>
              {((stats.ordersWithMinus2Days / stats.totalOrders) * 100).toFixed(
                1
              )}
              % van totaal
            </p>
          </div>

          <div className='rounded-lg bg-white p-6 shadow'>
            <h3 className='mb-2 text-base font-semibold'>Orders in Verleden</h3>
            <p className='text-3xl font-bold text-purple-600'>
              {stats.ordersInPast}
            </p>
            <p className='mt-1 text-sm text-gray-600'>
              Na business rule aanpassingen
            </p>
          </div>

          <div className='rounded-lg bg-white p-6 shadow'>
            <h3 className='mb-2 text-base font-semibold'>In Vandaag Lijst</h3>
            <p className='text-3xl font-bold text-green-600'>
              {stats.ordersInTodayList}
            </p>
            <div className='mt-2 space-y-1 text-sm text-gray-600'>
              <p>Inclusief verleden orders</p>
              <p>Door -1 dag: {stats.ordersInTodayListByMinus1Day}</p>
              <p>Door -2 dagen: {stats.ordersInTodayListByMinus2Days}</p>
            </div>
          </div>

          <div className='rounded-lg bg-white p-6 shadow'>
            <h3 className='mb-2 text-base font-semibold'>In Toekomst Lijst</h3>
            <p className='text-3xl font-bold text-indigo-600'>
              {stats.ordersInFutureList}
            </p>
            <p className='mt-1 text-sm text-gray-600'>Vanaf morgen</p>
          </div>
        </div>

        {/* Business Rule Breakdown */}
        <div className='mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3'>
          <div className='rounded-lg bg-white p-6 shadow'>
            <h3 className='mb-4 text-base font-semibold'>-1 Dag Codes</h3>
            <div className='space-y-2'>
              {Array.from(new Set(stats.businessRuleAdjustments.minus1Day)).map(
                code => (
                  <div key={code} className='flex justify-between'>
                    <span>{code}</span>
                    <span className='font-medium'>
                      {
                        stats.businessRuleAdjustments.minus1Day.filter(
                          c => c === code
                        ).length
                      }
                    </span>
                  </div>
                )
              )}
            </div>
          </div>

          <div className='rounded-lg bg-white p-6 shadow'>
            <h3 className='mb-4 text-base font-semibold'>-2 Dagen Codes</h3>
            <div className='space-y-2'>
              {Array.from(
                new Set(stats.businessRuleAdjustments.minus2Days)
              ).map(code => (
                <div key={code} className='flex justify-between'>
                  <span>{code}</span>
                  <span className='font-medium'>
                    {
                      stats.businessRuleAdjustments.minus2Days.filter(
                        c => c === code
                      ).length
                    }
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className='rounded-lg bg-white p-6 shadow'>
            <h3 className='mb-4 text-base font-semibold'>Geen Aanpassing</h3>
            <div className='max-h-48 space-y-2 overflow-y-auto'>
              {Array.from(
                new Set(stats.businessRuleAdjustments.noAdjustment)
              ).map(code => (
                <div key={code} className='flex justify-between'>
                  <span>{code}</span>
                  <span className='font-medium'>
                    {
                      stats.businessRuleAdjustments.noAdjustment.filter(
                        c => c === code
                      ).length
                    }
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Distribution Tables */}
        <div className='mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3'>
          {/* Leveringswijze Distribution */}
          <div className='rounded-lg bg-white p-6 shadow'>
            <h3 className='mb-4 text-base font-semibold'>
              Verdeling per Leveringswijze
            </h3>
            <div className='grid grid-cols-2 gap-4'>
              {Object.entries(stats.ordersByLeveringswijze)
                .sort(([, a], [, b]) => b - a)
                .map(([code, count]) => (
                  <div
                    key={code}
                    className='flex justify-between rounded bg-gray-50 p-2'
                  >
                    <span className='font-medium'>{code}</span>
                    <span>{count}</span>
                  </div>
                ))}
            </div>
          </div>

          {/* Magazijncode Distribution */}
          <div className='rounded-lg bg-white p-6 shadow'>
            <h3 className='mb-4 text-base font-semibold'>
              Verdeling per Magazijncode
            </h3>
            <div className='grid grid-cols-2 gap-4'>
              {Object.entries(stats.ordersByMagazijncode)
                .sort(([, a], [, b]) => b - a)
                .map(([code, count]) => (
                  <div
                    key={code}
                    className='flex justify-between rounded bg-gray-50 p-2'
                  >
                    <span className='font-medium'>{code}</span>
                    <span>{count}</span>
                  </div>
                ))}
            </div>
          </div>

          {/* WMS Status Distribution */}
          <div className='rounded-lg bg-white p-6 shadow'>
            <h3 className='mb-4 text-base font-semibold'>
              Verdeling per WMS Status
            </h3>
            <div className='grid grid-cols-1 gap-4'>
              {Object.entries(stats.ordersByWmsStatus)
                .sort(([, a], [, b]) => b - a)
                .map(([status, count]) => (
                  <div
                    key={status}
                    className='flex justify-between rounded bg-gray-50 p-2'
                  >
                    <span className='font-medium'>{status}</span>
                    <span>{count}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* All Orders Data Table */}
        <div className='rounded-lg bg-white p-6 shadow'>
          <h3 className='mb-4 text-base font-semibold'>
            Alle Orders Data ({stats.allOrdersData.length} orders)
          </h3>
          <div className='overflow-x-auto'>
            <table className='min-w-full table-auto text-sm'>
              <thead>
                <tr className='border-b bg-gray-50'>
                  <th className='px-3 py-2 text-left font-medium'>
                    Ordernummer
                  </th>
                  <th className='px-3 py-2 text-left font-medium'>Debiteur</th>
                  <th className='px-3 py-2 text-left font-medium'>Deb.Nr</th>
                  <th className='px-3 py-2 text-right font-medium'>Aantal</th>
                  <th className='px-3 py-2 text-left font-medium'>
                    Leveringswijze
                  </th>
                  <th className='px-3 py-2 text-left font-medium'>Route</th>
                  <th className='px-3 py-2 text-left font-medium'>Magazijn</th>
                  <th className='px-3 py-2 text-left font-medium'>
                    WMS Status
                  </th>
                  <th className='px-3 py-2 text-left font-medium'>
                    HandTerminal
                  </th>
                  <th className='px-3 py-2 text-left font-medium'>
                    OrderPicker
                  </th>
                  <th className='px-3 py-2 text-left font-medium'>
                    Originele Datum
                  </th>
                  <th className='px-3 py-2 text-left font-medium'>
                    Aangepaste Datum
                  </th>
                  <th className='px-3 py-2 text-right font-medium'>
                    Dagen Verschil
                  </th>
                  <th className='px-3 py-2 text-left font-medium'>
                    In Vandaag
                  </th>
                  <th className='px-3 py-2 text-left font-medium'>
                    In Toekomst
                  </th>
                  <th className='px-3 py-2 text-left font-medium'>Notitie</th>
                </tr>
              </thead>
              <tbody>
                {stats.allOrdersData.map((order, index) => (
                  <tr
                    key={`${order.ordernummer}-${index}`}
                    className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                  >
                    <td className='px-3 py-2 font-medium'>
                      {order.ordernummer}
                    </td>
                    <td className='px-3 py-2'>{order.debiteurnaam}</td>
                    <td className='px-3 py-2'>{order.debiteurnummer}</td>
                    <td className='px-3 py-2 text-right'>{order.aantal}</td>
                    <td className='px-3 py-2'>{order.leveringswijze}</td>
                    <td className='px-3 py-2'>{order.route || '-'}</td>
                    <td className='px-3 py-2'>{order.magazijncode}</td>
                    <td className='px-3 py-2'>
                      <span
                        className={`rounded px-2 py-1 text-xs font-medium ${
                          order.wmsStatus === 'New'
                            ? 'bg-blue-100 text-blue-800'
                            : order.wmsStatus === 'Read Back'
                              ? 'bg-green-100 text-green-800'
                              : order.wmsStatus === 'Validated'
                                ? 'bg-purple-100 text-purple-800'
                                : order.wmsStatus === 'Send to file'
                                  ? 'bg-orange-100 text-orange-800'
                                  : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {order.wmsStatus}
                      </span>
                    </td>
                    <td className='px-3 py-2'>{order.handTerminal || '-'}</td>
                    <td className='px-3 py-2'>{order.orderPicker || '-'}</td>
                    <td className='px-3 py-2'>{order.originalDate}</td>
                    <td className='px-3 py-2'>
                      <span
                        className={
                          order.daysDifference > 0
                            ? 'font-medium text-red-600'
                            : ''
                        }
                      >
                        {order.adjustedDate}
                      </span>
                    </td>
                    <td className='px-3 py-2 text-right'>
                      <span
                        className={`${
                          order.daysDifference === 1
                            ? 'text-orange-600'
                            : order.daysDifference === 2
                              ? 'text-red-600'
                              : order.daysDifference > 0
                                ? 'text-purple-600'
                                : 'text-gray-600'
                        }`}
                      >
                        {order.daysDifference > 0
                          ? `-${order.daysDifference}`
                          : order.daysDifference}
                      </span>
                    </td>
                    <td className='px-3 py-2'>
                      <span
                        className={`rounded px-2 py-1 text-xs font-medium ${
                          order.inTodayList
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {order.inTodayList ? 'Ja' : 'Nee'}
                      </span>
                    </td>
                    <td className='px-3 py-2'>
                      <span
                        className={`rounded px-2 py-1 text-xs font-medium ${
                          order.inFutureList
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {order.inFutureList ? 'Ja' : 'Nee'}
                      </span>
                    </td>
                    <td
                      className='max-w-xs truncate px-3 py-2'
                      title={order.notitie || ''}
                    >
                      {order.notitie || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DebugPage;
