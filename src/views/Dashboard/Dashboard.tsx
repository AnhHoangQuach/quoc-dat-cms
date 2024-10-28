import { Chip, Typography } from '@mui/material';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { DateTime } from 'luxon';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { authService } from 'services';

const Dashboard = () => {
  const { data, isPending } = useQuery({
    queryKey: ['authService.queryDashboard'],
    queryFn: () => authService.queryDashboard(),
  });

  const { data: trips } = useQuery({
    queryKey: ['authService.getTripsInMonth'],
    queryFn: () =>
      authService.getTripsInMonth({
        from: DateTime.now().startOf('month').toISODate(),
        to: DateTime.now().endOf('month').toISODate(),
      }),
    placeholderData: keepPreviousData,
  });

  return (
    <div className='grid h-screen grid-cols-12 grid-rows-2 gap-4 bg-[#313f64] p-4'>
      <div className='col-span-4 row-span-1 rounded-md bg-[#1a4093] p-4'></div>
      <div className='col-span-4 row-span-1 rounded-md bg-[#1a4093] p-4'>
        <Typography variant='h6' className='mt-2 text-center text-white'>
          TOP 10 ( VỊ TRÍ XẢY RA SỰ CỐ )
        </Typography>
        {!isPending && data && (
          <ResponsiveContainer height='90%' width='100%'>
            <BarChart
              data={data}
              margin={{
                top: 40,
                right: 0,
                left: 0,
              }}
            >
              <XAxis
                dataKey='pathSecond'
                angle={-45}
                interval={0}
                tick={{ fill: 'white', fontSize: 6, textAnchor: 'end' }}
              />
              <YAxis interval={1} tick={{ fill: 'white' }} />
              <Tooltip cursor={{ fill: 'transparent' }} />
              <Bar dataKey='count' fill='#f7af10' barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
      <div className='col-span-4 row-span-1 rounded-md bg-[#1a4093] p-4'></div>
      <div className='col-span-4 row-span-1 rounded-md bg-[#1a4093] p-4'>
        <Typography variant='h6' className='mt-2 text-center uppercase text-white'>
          tổng số sự cố trong tháng: {trips?.length}
        </Typography>
        <div className='h-[90%] overflow-hidden'>
          <div className='animate-vertical-marquee flex flex-col divide-y'>
            {trips?.map((item, index) => (
              <div key={index} className='space-y-2 p-2 text-white'>
                <Chip color='warning' label={item.pathOne} size='small' />
                <div className='whitespace-nowrap'>{item.pathSecond}</div>
                <div className='text-sm'>
                  Thời gian xảy ra: {DateTime.fromISO(item.timeOccurence).toFormat('dd/MM/yyyy HH:mm:ss')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='col-span-4 row-span-1 rounded-md bg-[#1a4093] p-4'></div>
      <div className='col-span-4 row-span-1 rounded-md bg-[#1a4093] p-4'></div>
    </div>
  );
};

export default Dashboard;
