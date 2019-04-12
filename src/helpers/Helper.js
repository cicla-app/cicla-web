export const areSameDay = (d1, d2) => {
  return d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();
}

const stageNames = [
  'follicularPrimary',
  'follicularSecondary',
  'follicularLatest',
  'ovulation',
  'luteaPrimary',
  'luteaSecondary',
  'luteaLatest'
];

const stages = (period) => [
  period.follicular.primary,
  period.follicular.secondary,
  period.follicular.latest,
  period.ovulation,
  period.lutea.primary,
  period.lutea.secondary,
  period.lutea.latest
].map(d => new Date(d))

export const getCurrentStage = (selectedDay, period) => {
  let date = new Date(selectedDay);
  
  date.setHours(0)
  date.setMinutes(0)
  date.setMilliseconds(0)

  if (date >= stages(period)[stages(period).length - 1]) {
    const last = stages(period)[stages(period).length - 1];

    const daysDiff = (date.getTime() - last.getTime()) / 1000 / 60 / 60 / 24

    date = new Date(stages(period)[0])
    date.setDate(date.getDate() + daysDiff)
  }

  for(let i = 0, l = stages(period).length; i < l; i++) {
    if (date <= stages(period)[i]) {
      return stageNames[i]
    }
  }
}
