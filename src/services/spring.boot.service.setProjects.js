import { notification } from 'antd'

export default async function setProjectData(data) {
  console.log('try to set project')
  console.log(JSON.stringify(data))
  const result = await fetch('http://localhost:9009/v1/project/update', {
    method: 'POST',
    headers: {
      mode: 'cors',
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
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
