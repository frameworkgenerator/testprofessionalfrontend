import { notification } from 'antd'

export default async function getTestPlans() {
  const response = await fetch('http://localhost:9009/v1/testplan/getall', {
    headers: {
      mode: 'cors',
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
  }).catch(error =>
    notification.warning({
      message: error.code,
      description: error.message,
    }),
  )
  return response.json()
}
