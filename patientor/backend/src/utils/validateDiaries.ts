/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Weather, Visibility, type NewDiaryEntry } from '../types/diaryentries.types'

const isVisibility = (param: any): boolean => {
  return Object.values(Visibility).includes(param)
}

const isWeather = (string: any): boolean => {
  return Object.values(Weather).includes(string)
}

const isDate = (string: string): boolean => {
  return Boolean(Date.parse(string))
}

const isString = (text: any): boolean => {
  return typeof text === 'string' || text instanceof String
}

const parseComment = (commentFromRequest: any): string => {
  if (!commentFromRequest || !isString(commentFromRequest)) {
    throw new Error('Incorrect or missing comment')
  }

  return commentFromRequest
}

const parseDate = (dateFromRequest: any): string => {
  if (!dateFromRequest || !isString(dateFromRequest) || !isDate(dateFromRequest)) {
    throw new Error('Incorrect or missing Date')
  }
  return dateFromRequest
}

const parseWeather = (weatherFromRequest: any): Weather => {
  if (!weatherFromRequest || !isString(weatherFromRequest) || !isWeather(weatherFromRequest)) {
    throw new Error('Incorrect or missing weather')
  }

  return weatherFromRequest
}

const parseVisibility = (visibilityFromRequest: any): Visibility => {
  if (!visibilityFromRequest || !isVisibility(visibilityFromRequest)) {
    throw new Error('Incorrect or missing visibility')
  }
  return visibilityFromRequest
}

export const validateDaries = (object: any): NewDiaryEntry => {
  return {
    date: parseDate(object.date),
    comment: parseComment(object.comment),
    weather: parseWeather(object.weather),
    visibility: parseVisibility(object.visibility)

  }
}
