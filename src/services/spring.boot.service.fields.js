import { notification } from 'antd'
import base64 from 'base-64'

export default async function getFieldData() {
  const response = await fetch('http://localhost:9009/v1/dataset/getbyid/1/fields', {
    headers: {
      mode: 'cors',
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:3000',
      Authorization: `Basic ${base64.encode(`h.bruins@ventus.nl:30Welkom1984_C`)}`,
    },
  }).catch(error =>
    notification.warning({
      message: error.code,
      description: error.message,
    }),
  )
  return response.json()
}
