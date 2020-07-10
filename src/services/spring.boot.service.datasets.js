import { notification } from 'antd'

export default async function getDataSetData(id) {
  const datam = await fetch(`http://localhost:9009/v1/project/getbyid/${id}/dataset`, {
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
  return datam.json()
}
