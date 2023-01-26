import { CardsType } from '../API/CardsApi/cardsApi'

export const getRandomQuestion = (cards: CardsType[]) => {
  let i = 0
  let s = 0
  const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0)
  const randomNumber = Math.random() * sum

  while (s < randomNumber) {
    s += (6 - cards[i].grade) * (6 - cards[i].grade)
    i++
  }
  return cards[i - 1]
}