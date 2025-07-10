'use client';

import React from 'react';
import { Order, formatOrderDate } from '@/data/orders';

interface FutureOrderTableProps {
  orders: Order[];
  hideFirstRowLabel?: boolean;
  className?: string;
}

const FutureOrderTable: React.FC<FutureOrderTableProps> = ({
  orders,
  hideFirstRowLabel = false,
  className = '',
}) => {
  const isFirstOrder = (index: number) => index === 0;
  const isLastOrder = (index: number) => index === orders.length - 1;
  const isEvenOrder = (index: number) => index % 2 === 0;

  return (
    <div
      className={`flex flex-col overflow-hidden rounded-2xl border-2 border-gray-200 bg-gray-50 shadow-sm ${className}`}
    >
      {/* Header */}
      <div className='grid h-16 grid-cols-[.8fr_2fr_.5fr_1.5fr] items-center gap-3 bg-gray-200 px-4 text-[1.25rem] font-bold'>
        <div>Order</div>
        <div>Naam</div>
        <div>Aantal</div>
        <div>Wanneer</div>
      </div>

      {/* Scrollable Content */}
      <div className='flex-1 overflow-y-auto'>
        {orders.map((order, index) => (
          <div
            key={`${order.id}-${index}`}
            className={`text-md grid h-20 grid-cols-[.8fr_2fr_.5fr_1.5fr] items-center gap-3 px-4 ${
              isEvenOrder(index) ? 'bg-gray-50' : 'bg-white'
            } ${isLastOrder(index) ? 'border-b-2 border-gray-200' : ''} transition-colors hover:bg-gray-50`}
          >
            {/* Order ID */}
            <div className='flex flex-col justify-center font-medium text-gray-900'>
              {!hideFirstRowLabel && isFirstOrder(index) && (
                <div className='mb-0.5 text-xs leading-[1] text-gray-500'>
                  eerst volgende
                </div>
              )}
              <div className='leading-[1]'>{order.id}</div>
            </div>

            {/* Name */}
            <div className='truncate text-gray-900' title={order.name}>
              {order.name}
            </div>

            {/* Quantity */}
            <div className='text-gray-900'>{order.quantity}</div>

            {/* When - with delivery icon and date */}
            <div className='flex items-center gap-2'>
              <span className='font-medium text-gray-900'>
                {formatOrderDate(order.orderDate)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FutureOrderTable;
