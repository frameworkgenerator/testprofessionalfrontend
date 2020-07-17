import { notification } from 'antd'

export default async function getDataSetData(id) {
  return fetch(`http://localhost:9009/v1/project/getbyid/${id}/dataset`, {
    headers: {
      mode: 'cors',
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
  })
    .then(res => res.clone().json())
    .catch(error =>
      notification.warning({
        message: error.code,
        description: error.message,
      }),
    )
}
