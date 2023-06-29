export const deliveryStatuses = [
  { title: 'Placed', 
    description: '',
    currentStep: true },
  { title: 'Confirmed', 
    description: '',
    currentStep: false },
  { title: 'Shipped',
    description: '', 
    currentStep: false },
  { title: 'Received', 
    description: '',
    currentStep: false },
  { title: 'To Rate', 
    description: '',
    currentStep: false }
]

export const deliveryStatusesExtra = [
  ...deliveryStatuses,
  { title: 'Cancelled', description: '', currentStep: false },
  { title: 'Returned', description: '', currentStep: false },
  { title: 'Refunded', description: '', currentStep: false },
]