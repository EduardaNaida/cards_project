import { instance } from '../axiosSettings'

export const learnAPI = {
  setGrade(data: SetGradeDataType) {
    return instance.put<SetGradeResponseType>('cards/grade', data)
  },
}

export type SetGradeDataType = {
  card_id: string
  grade: number
}

export type SetGradeResponseType = {
  updatedGrade: UpgradedGradeType
}

type UpgradedGradeType = {
  _id: string
  cardsPack_id: string
  card_id: string
  user_id: string
  grade: number
  shots: number
}
