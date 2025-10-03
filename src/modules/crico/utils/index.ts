// Crico utility functions
export const formatCricoDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export const validateCricoItem = (item: any): boolean => {
  return item && item.name && item.name.trim().length > 0
}


