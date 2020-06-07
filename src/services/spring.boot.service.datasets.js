export default async function getDataSetData() {
  return [
    {
      id: 0,
      name: 'Inlog Pagina',
      description: 'Login Page',
      datasetcontext: {
        owner: 'Harm Bruins',
        status: 'ToDo',
      },
    },
    {
      id: 1,
      name: 'Login Page',
      description: 'Generieke data set voor het ',
      datasetcontext: {
        owner: 'Harm Bruins',
        status: 'Backlog',
      },
    },
    {
      id: 2,
      name: 'Account Pagina',
      description: 'Pagina voor het inloggen van een account',
      datasetcontext: {
        owner: 'Harm Bruins',
        status: 'InProgress',
      },
    },
    {
      id: 3,
      name: 'Test Pagina',
      description: 'Login Page',
      datasetcontext: {
        owner: 'Harm Bruins',
        status: 'Done',
      },
    },
  ]
}
