import { notification } from 'antd'

export default async function deleteProjectData(data) {
  console.log('Delete call:')
  console.log(JSON.stringify(data))
  const result = await fetch('http://localhost:9009/v1/project/deleteall', {
    method: 'POST',
    headers: {
      mode: 'cors',
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
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