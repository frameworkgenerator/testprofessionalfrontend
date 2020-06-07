import React from 'react'
import { Helmet } from 'react-helmet'
import CreateProjectModal from '../../ui-kits/antd/implementations/modalcreateproject'
import ProjectTableWide from '../../../components/kit/widgets/Tables/implementations/ProjectTableWide'

const DashboardAlpha = () => {
  const agileItems = {
    name: 'Button',
    description: 'To trigger an operation.',
    link: 'https://ant.design/components/button/',
    component: <CreateProjectModal datasetId={1} />,
  }

  return (
    <div>
      <Helmet title="Dashboard: Projsect" />
      <div>{agileItems.component}</div>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <div className="cui__utils__heading mb-0">
                <strong>Projects</strong>
              </div>
              <div className="text-muted">Overview of projects</div>
            </div>
            <div className="card-body">
              <div className="kit__utils__table">
                <ProjectTableWide />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardAlpha
