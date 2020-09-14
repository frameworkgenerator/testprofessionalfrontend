import { notification } from 'antd'
import base64 from 'base-64'

export default async function getDataSetData() {
  console.log('Did this')
  const response = await fetch(`http://localhost:9009/v1/project/getbyid/9/dataset`, {
    headers: {
      mode: 'cors',
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Basic ${base64.encode(`h.bruins@ventus.nl:30Welkom1984_C`)}`,
    },
  }).catch(error =>
    notification.warning({
      message: error.code,
      description: error.message,
    }),
  )
  console.log(response)
  return response.json()
}
