import React from 'react'
import { Helmet } from 'react-helmet'
import { Button } from 'antd'
import DataSets from '../../apps/implementations/dataset-management'

const DashboardAlpha = () => {
  function refreshPage() {
    window.location.reload(false)
  }
  return (
    <div>
      <Helmet title="Projects" />
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <div className="cui__utils__heading mb-0">
                <strong>Projects</strong>
                <Button onClick={refreshPage}>Click to reload!</Button>
              </div>
              <div className="text-muted">Overview of projects</div>
            </div>
            <div className="card-body">
              <div className="kit__utils__table">
                <DataSets />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardAlpha
