import base64 from 'base-64'
import { notification } from 'antd'

export default async function getProjectData() {
  const response = await fetch('http://localhost:9009/v1/project/getall', {
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
  console.log(response.message)
  return response.json()
}
