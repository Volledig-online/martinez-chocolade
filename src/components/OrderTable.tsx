'use client';

import React from 'react';
import { Icon } from './Icon';
import {
  Order,
  getDeliveryIconFromLeveringswijze,
  getStatusIconFromRoute,
} from '@/data/orders';

interface OrderTableProps {
  orders: Order[];
  hideFirstRowLabel?: boolean;
  className?: string;
}

const OrderTable: React.FC<OrderTableProps> = ({
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
      <div className='grid grid-cols-[.8fr_2.5fr_.5fr_.3fr_.3fr] items-center gap-3 bg-gray-200 px-4 py-2.5 text-[1.25rem] font-bold'>
        <div>Order</div>
        <div>Naam</div>
        <div>Aantal</div>
        <div className='flex w-6 justify-center'>
          <Icon name='bus' size={40} />
        </div>
        <div className='flex w-6 justify-center'>
          <Icon name='trolley' size={40} />
        </div>
      </div>

      {/* Scrollable Content */}
      <div className='flex-1 overflow-y-auto'>
        {orders.map((order, index) => (
          <div
            key={`${order.id}-${index}`}
            className={`text-md grid h-20 grid-cols-[.8fr_2.5fr_.5fr_.3fr_.3fr] items-center gap-3 px-4 ${
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

            {/* Delivery Type Icon */}
            <div className='flex w-6 justify-center'>
              <Icon
                name={getDeliveryIconFromLeveringswijze(order.leveringswijze)}
                size={40}
                color='#000000'
              />
            </div>

            {/* Status Icon */}
            <div className='flex w-6 justify-center'>
              <Icon
                name={getStatusIconFromRoute(order.route)}
                size={40}
                color='#000000'
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderTable;
