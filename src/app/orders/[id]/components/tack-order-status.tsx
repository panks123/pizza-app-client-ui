'use client';
import React from 'react'
import { Step, Stepper, useStepper } from '@/components/stepper';
import { CheckCheck, FileCheck, Microwave, Package, Truck } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getOrderStatus } from '@/lib/http/api';

const statusMap = {
  recieved: 0,
  confirmed: 1,
  prepared: 2,
  out_for_delivery: 3,
  delivered: 4,
} as { [key: string]: number }

const StepperControl = ({orderId}: {orderId: string}) => {
  const [shouldPoll, setShouldPoll] = React.useState(true);
  const {setStep} = useStepper();

  const {data} = useQuery<{orderStatus: string}>({
    queryKey: ['order-status'],
    queryFn: async () => {
      return await getOrderStatus(orderId).then((res) => res.data);
    },
    refetchInterval: shouldPoll ? 1000 * 45 : false,
    enabled: shouldPoll
  })

  React.useEffect(() => {
    if(data){
      const currentStatus = data.orderStatus;
      const currentStep = statusMap[currentStatus] || 0;
      setStep(currentStep + 1);
      if(currentStatus === 'delivered'){
        setShouldPoll(false);
      }
    }
    // eslint-disable-next-line 
  },[data]);

  return null;
}

const TrackOrderStatus = ({orderId}: {orderId: string}) => {
    const steps = [
		{ label: 'Recieved', icon: FileCheck },
		{ label: 'Confirmed', icon: Package },
		{ label: 'Prepared', icon: Microwave },
		{ label: 'Out for Delivery', icon: Truck }, 
		{ label: 'Delivered', icon: CheckCheck },
    ]
  return (
    <Stepper initialStep={0} steps={steps} variant="circle-alt" className="p-6">
      {steps.map((step) => {
        return (
          <Step key={step.label} label={step.label} icon={step.icon} checkIcon={step.icon} />
        )
      })}
      <StepperControl orderId={orderId}/>
    </Stepper>
  )
}

export default TrackOrderStatus;
