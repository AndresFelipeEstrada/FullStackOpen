import { type NewDiaryEntry, type DiaryEntry, type SensitiveDiaryEntries } from '../types/diaryentries.types'
import diaryEntries from '../data/diaryentries'

export const getAllDiaries = (): DiaryEntry[] => {
  return diaryEntries
}

export const getNonSensitiveEntries = (): SensitiveDiaryEntries[] => {
  return diaryEntries.map(({ id, date, weather, visibility }) => ({
    id, date, weather, visibility
  }))
}

export const getById = (id: number): DiaryEntry | undefined => {
  const entry = diaryEntries.find(diary => diary.id === id)
  return entry
}

export const addNewDiary = (newDiary: NewDiaryEntry): NewDiaryEntry => {
  const newDiaryEntry = {
    id: Math.max(...diaryEntries.map(d => d.id)) + 1,
    date: `${Date.now()}`,
    weather: newDiary.weather,
    visibility: newDiary.visibility,
    commnet: newDiary.comment

  }

  diaryEntries.push(newDiaryEntry)

  return newDiaryEntry
}
