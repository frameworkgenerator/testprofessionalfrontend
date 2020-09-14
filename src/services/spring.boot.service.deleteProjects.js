import { notification } from 'antd'
import base64 from 'base-64'

export default async function deleteProjectData(data) {
  console.log('Delete call:')
  console.log(JSON.stringify(data))
  const result = await fetch('http://localhost:9009/v1/project/deleteall', {
    method: 'POST',
    headers: {
      mode: 'cors',
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:3000',
      Authorization: `Basic ${base64.encode(`h.bruins@ventus.nl:30Welkom1984_C`)}`,
    },
    body: JSON.stringify(data),
  }).catch(error =>
    notification.warning({
      message: error.code,
      description: error.message,
    }),
  )
  console.log(result)
  return result
}
