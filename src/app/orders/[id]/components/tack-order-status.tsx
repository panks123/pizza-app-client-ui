'use client';
import React from 'react'
import { Step, Stepper, useStepper } from '@/components/stepper';
import { CheckCheck, FileCheck, Microwave, Package, Truck } from 'lucide-react';

const StepperControl = () => {
  const {nextStep} = useStepper();

  React.useEffect(() => {
    const interval = setInterval(() => {
      nextStep();
    }, 3000);

    return () => clearInterval(interval);
    // eslint-disable-next-line 
  },[]);

  return null;
}

const TrackOrderStatus = () => {
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
      <StepperControl />
    </Stepper>
  )
}

export default TrackOrderStatus;
