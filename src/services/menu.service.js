export default async function getMenuData() {
  return [
    {
      category: true,
      title: 'Users',
    },
    {
      title: 'User',
      key: 'apps',
      icon: 'fe fe-user',
      children: [
        {
          title: 'Profile',
          key: 'appsProfile',
          url: '/apps/profile',
        },
      ],
    },
    {
      category: true,
      title: 'Test Development',
    },
    {
      title: 'Developers',
      key: 'developers',
      icon: 'fe fe-target',
      // roles: ['admin'], // set user roles with access to this route
      count: 2,
      children: [
        {
          title: 'Projects',
          key: 'dashboard',
          url: '/dashboard/projects',
        },
        {
          title: 'DataSet',
          key: 'dataset',
          url: '/dashboard/dataset',
        },
      ],
    },
    {
      title: 'Testers',
      key: 'testers',
      category: true,
      count: 5,
      icon: 'fe fe-play-circle',
      children: [
        {
          title: 'TestPlan management',
          key: 'testPlan',
          url: '/apps/testPlan-management',
        },
      ],
    },
    {
      category: true,
      title: 'Sharing',
    },
    {
      title: 'Jira management',
      icon: 'fe fe-share-2',
      key: 'extraAppsJiraDashboard',
      url: '/apps/jira-dashboard',
    },
  ]
}
