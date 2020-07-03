export default async function getProjectData() {
  const response = await fetch('http://localhost:9009/v1/project/getall', {
    headers: {
      mode: 'cors',
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
  console.log('Waiting for response')
  console.log(JSON.stringify(response))
  return response.json()
}
