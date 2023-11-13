const getRandomColor = () => {
  const pastelColors: string[] = [
    '#FFC1CC',
    '#FFDAAF',
    '#FFFFBA',
    '#CAFFBF',
    '#AFDFFF',
    '#9ABAFF',
    '#D7AAFF',
    '#FFACE4',
    '#A7FFC4',
    '#ECD4FF',
  ]
  const randomIndex: number = Math.floor(Math.random() * pastelColors.length)
  return pastelColors[randomIndex]
}

export default getRandomColor
